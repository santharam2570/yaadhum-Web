"use server";

import { redirect } from "next/navigation";
import { checkPassword, endAdminSession, startAdminSession } from "@/lib/admin-auth";
import type { FormState } from "@/lib/form-state";

export async function login(_prev: FormState, fd: FormData): Promise<FormState> {
  const ok = checkPassword(String(fd.get("password") ?? ""));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800));
    return { status: "error", message: "Incorrect password." };
  }
  await startAdminSession();
  redirect("/admin");
}

export async function logout() {
  await endAdminSession();
  redirect("/admin");
}
