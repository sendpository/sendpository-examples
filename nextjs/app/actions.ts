"use server";

import { SendpositoryError } from "sendpository";
import { sendWelcome } from "@/lib/email";
import { createHash, timingSafeEqual } from "node:crypto";

// This demo has no user database. Require a separate private access token and
// restrict delivery to the operator's configured mailbox. In a real app,
// replace this with your session authorization and shared rate limiter.
let windowStart = 0;
let sendsInWindow = 0;

export type SendState = { id?: string; error?: string };

export async function send(_prev: SendState, formData: FormData): Promise<SendState> {
  const expected = process.env.DEMO_ACCESS_TOKEN;
  const recipient = process.env.DEMO_RECIPIENT?.trim().toLowerCase();
  if (!expected || expected.length < 32 || !recipient) {
    return { error: "Configure DEMO_ACCESS_TOKEN (at least 32 characters) and DEMO_RECIPIENT on the server first." };
  }
  const supplied = String(formData.get("accessToken") ?? "");
  const digest = (value: string) => createHash("sha256").update(value).digest();
  if (!timingSafeEqual(digest(supplied), digest(expected))) return { error: "Demo access denied." };
  const to = String(formData.get("to") ?? "").trim().toLowerCase();
  if (to !== recipient) return { error: "This demo can send only to its configured test recipient." };
  if (Date.now() - windowStart >= 60_000) { windowStart = Date.now(); sendsInWindow = 0; }
  if (sendsInWindow >= 5) return { error: "Demo send limit reached. Try again in a minute." };
  sendsInWindow++;

  try {
    const { id } = await sendWelcome(to);
    return { id };
  } catch (err) {
    if (err instanceof SendpositoryError) return { error: `${err.type}: ${err.message}` };
    throw err;
  }
}
