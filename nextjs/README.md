# Sendpository + Next.js

Transactional email API for developers.
Send your first application email with one HTTP request.

```ts
// lib/email.ts
import "server-only";
import { Sendpository } from "sendpository";

const sendpository = new Sendpository(process.env.SENDPOSITORY_API_KEY);

export async function sendWelcome(to: string) {
  return sendpository.emails.send({
    from: process.env.SENDPOSITORY_FROM!,
    to: [to],
    subject: "Hello from Sendpository",
    html: "<p>It works.</p>",
  });
}
```

A Next.js App Router app with a form that sends through a **Server Action**,
and a **Route Handler** that receives signed delivery webhooks.

## Run it

1. Create an account at [sendpository.com](https://sendpository.com), add your domain under **Domains** and publish the DNS records it shows.
2. Create a key under **API keys**.
3. Configure and run:

```bash
git clone https://github.com/sendpository/sendpository-examples.git
cd sendpository-examples/nextjs
cp .env.example .env.local   # paste your key and a From address on your verified domain
npm install
npm run dev
```

Open http://localhost:3000, enter your address and press **Send**. You should see
`Sent. Message id: …`, and the email arrives within seconds.

## What's where

| File | What it does |
|---|---|
| `lib/email.ts` | The client and the email. `server-only` makes the build fail if a client component imports it, so the key can't reach the browser. |
| `app/actions.ts` | The Server Action the form calls. Turns API errors into a message. |
| `app/api/webhooks/email/route.ts` | Verifies `Sendpository-Signature` over the raw body and logs each delivery event. |

## Webhooks (optional)

Add `https://<your-domain>/api/webhooks/email` under **Webhooks** in the dashboard and put
its signing secret in `SENDPOSITORY_WEBHOOK_SECRET`. Locally, expose the dev server with a
tunnel such as `cloudflared tunnel --url http://localhost:3000` and register that URL.
Unsigned or tampered requests get `401`.

## If it fails

| Error | Fix |
|---|---|
| `authentication_error` | The key in `.env.local` is missing, mistyped or revoked. |
| `domain_not_verified` | `SENDPOSITORY_FROM` must be on a domain that shows **Verified** under Domains. |
| `email_not_verified` | Confirm your account's email address first - check your inbox. |
| `suppressed_recipient` | That address bounced or complained before. Try another one. |

Full guide: [sendpository.com/guides/send-email-with-nextjs](https://sendpository.com/guides/send-email-with-nextjs)
