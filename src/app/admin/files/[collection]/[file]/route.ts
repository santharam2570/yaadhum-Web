import path from "node:path";
import { isAdmin } from "@/lib/admin-auth";
import { readStoredFile, type Collection } from "@/lib/storage";

const contentTypes: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(_req: Request, { params }: RouteContext<"/admin/files/[collection]/[file]">) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });

  const { collection, file } = await params;
  if (collection !== "applications") return new Response("Not found", { status: 404 });

  const name = decodeURIComponent(file);
  try {
    const body = await readStoredFile(collection as Collection, name);
    const downloadName = name.replace(/^[0-9a-f-]{36}-/, "");
    return new Response(new Uint8Array(body), {
      headers: {
        "Content-Type": contentTypes[path.extname(name).toLowerCase()] ?? "application/octet-stream",
        "Content-Disposition": `attachment; filename="${downloadName.replace(/"/g, "")}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
