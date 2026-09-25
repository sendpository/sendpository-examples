"use server";

import { SendpositoryError } from "sendpository";
import { sendWelcome } from "@/lib/email";

export type SendState = { id?: string; error?: string };

export async function send(_prev: SendState, formData: FormData): Promise<SendState> {
  const to = String(formData.get("to") ?? "").trim();
  if (!to) return { error: "Enter an email address." };

  try {
    const { id } = await sendWelcome(to);
    return { id };
  } catch (err) {
    if (err instanceof SendpositoryError) return { error: `${err.type}: ${err.message}` };
    throw err;
  }
}
