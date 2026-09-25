import "server-only";
import { Sendpository } from "sendpository";

// "server-only" makes the build fail if a client component imports this file,
// so the API key can never end up in the browser.

// Created on first use rather than at import, so `next build` works without
// the key set - it is only needed when an email is actually sent.
let client: Sendpository | undefined;
const sendpository = () =>
  (client ??= new Sendpository(process.env.SENDPOSITORY_API_KEY, {
    baseUrl: process.env.SENDPOSITORY_BASE_URL || undefined,
  }));

export async function sendWelcome(to: string) {
  return sendpository().emails.send({
    from: process.env.SENDPOSITORY_FROM!,
    to: [to],
    subject: "Hello from Sendpository",
    html: "<p>It works. This email was sent from a Next.js Server Action.</p>",
    text: "It works. This email was sent from a Next.js Server Action.",
    tags: { example: "nextjs" },
  });
}
