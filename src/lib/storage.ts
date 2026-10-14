import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * File-based persistence for form submissions. Every write goes through this module,
 * so moving to a database, CRM or object storage later means changing only this file.
 * Note: serverless hosts have ephemeral disks — set DATA_DIR to a persistent volume
 * or swap this implementation before deploying there.
 */

export type Collection = "enquiries" | "applications" | "subscribers";

export type StoredFile = { name: string; storedAs: string; size: number; type: string };

export type Submission<T = Record<string, unknown>> = {
  id: string;
  createdAt: string;
  data: T;
  file?: StoredFile;
};

const ROOT = process.env.DATA_DIR ?? path.join(/*turbopackIgnore: true*/ process.cwd(), ".data");

const dirFor = (collection: Collection) => path.join(/*turbopackIgnore: true*/ ROOT, collection);
const filesDirFor = (collection: Collection) => path.join(/*turbopackIgnore: true*/ ROOT, collection, "files");

function safeName(name: string) {
  const ext = path.extname(name).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const base = path
    .basename(name, path.extname(name))
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "file"}${ext}`;
}

export async function saveSubmission<T extends Record<string, unknown>>(
  collection: Collection,
  data: T,
  file?: File,
): Promise<Submission<T>> {
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  await mkdir(dirFor(collection), { recursive: true });

  let stored: StoredFile | undefined;
  if (file) {
    await mkdir(filesDirFor(collection), { recursive: true });
    const storedAs = `${id}-${safeName(file.name)}`;
    await writeFile(path.join(filesDirFor(collection), storedAs), Buffer.from(await file.arrayBuffer()));
    stored = { name: file.name, storedAs, size: file.size, type: file.type };
  }

  const record: Submission<T> = { id, createdAt, data, file: stored };
  const stamp = createdAt.replace(/[:.]/g, "-");
  await writeFile(path.join(dirFor(collection), `${stamp}_${id}.json`), JSON.stringify(record, null, 2));
  await notify(collection, record);
  return record;
}

export async function listSubmissions(collection: Collection): Promise<Submission[]> {
  let names: string[];
  try {
    names = await readdir(dirFor(collection));
  } catch {
    return [];
  }
  const records = await Promise.all(
    names
      .filter((n) => n.endsWith(".json"))
      .map(async (n) => JSON.parse(await readFile(path.join(dirFor(collection), n), "utf8")) as Submission),
  );
  return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function readStoredFile(collection: Collection, storedAs: string) {
  if (storedAs !== path.basename(storedAs)) throw new Error("Invalid file name");
  return readFile(path.join(filesDirFor(collection), storedAs));
}

export async function hasSubscriber(email: string) {
  const subs = await listSubmissions("subscribers");
  return subs.some((s) => String(s.data.email).toLowerCase() === email.toLowerCase());
}

/** Optional real-time alert to Slack, Microsoft Teams, Zapier, etc. via NOTIFY_WEBHOOK_URL. */
async function notify(collection: Collection, record: Submission) {
  const url = process.env.NOTIFY_WEBHOOK_URL;
  if (!url) return;
  const d = record.data as Record<string, unknown>;
  const who = [d.name, d.email].filter(Boolean).join(" · ");
  const what =
    collection === "applications" ? `New job application: ${d.jobTitle ?? "General application"}` : collection === "enquiries" ? "New website enquiry" : "New newsletter subscriber";
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `${what} — ${who}`, collection, record }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error("[notify] webhook failed", err);
  }
}
