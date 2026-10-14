"use client";

import { LockKeyhole } from "lucide-react";
import { FormAlert, SubmitButton, TextField, useServerForm } from "@/components/forms";
import { login } from "./actions";

export function LoginForm() {
  const { state, pending, onSubmit } = useServerForm(login);
  return (
    <form onSubmit={onSubmit} className="panel mx-auto max-w-md space-y-5 p-8">
      <span className="grid size-12 place-items-center rounded-2xl bg-fire">
        <LockKeyhole className="size-6 text-white" />
      </span>
      <div>
        <h1 className="font-display text-3xl font-bold">Admin sign in</h1>
        <p className="mt-1 text-sm text-cream/55">View website enquiries, job applications and subscribers.</p>
      </div>
      <TextField name="password" label="Password" type="password" required autoComplete="current-password" />
      <FormAlert state={state} />
      <SubmitButton pending={pending}>{pending ? "Signing in…" : "Sign in"}</SubmitButton>
    </form>
  );
}
