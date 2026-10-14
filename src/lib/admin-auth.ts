import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "yaadhum_admin";
const MAX_AGE = 60 * 60 * 8;

const password = () => process.env.ADMIN_PASSWORD ?? "";

export const adminEnabled = () => password().length >= 8;

/** The session token is derived from the password, so rotating ADMIN_PASSWORD signs everyone out. */
function token() {
  return createHmac("sha256", password()).update("yaadhum-admin-session").digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(candidate: string) {
  if (!adminEnabled()) return false;
  const digest = (s: string) => createHmac("sha256", "yaadhum-admin-login").update(s).digest("hex");
  return safeEqual(digest(candidate), digest(password()));
}

export async function isAdmin() {
  if (!adminEnabled()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return !!value && safeEqual(value, token());
}

export async function startAdminSession() {
  (await cookies()).set(ADMIN_COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: MAX_AGE,
  });
}

export async function endAdminSession() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
}
