# Sendpository + Node.js

Transactional email API for developers.
Send your first application email with one HTTP request.

```ts
import { Sendpository } from "sendpository";

const sendpository = new Sendpository(process.env.SENDPOSITORY_API_KEY);

const { id } = await sendpository.emails.send({
  from: "Acme <hello@mail.yourdomain.com>",
  to: ["you@example.com"],
  subject: "Hello from Sendpository",
  html: "<p>It works.</p>",
});
```

## Run it

1. Create an account at [sendpository.com](https://sendpository.com), add your domain under **Domains** and publish the DNS records it shows.
2. Create a key under **API keys**.
3. Configure and run:

```bash
git clone https://github.com/sendpository/sendpository-examples.git
cd sendpository-examples/node
cp .env.example .env        # paste your key and a From address on your verified domain
npm install
npm run send -- you@example.com
```

You should see:

```
Sent. Message id: d67e39ed-96be-4b35-ab22-853163d92c92
```

The email arrives within seconds. Its delivery timeline is under **Emails** in the dashboard.

## If it fails

| Error | Fix |
|---|---|
| `authentication_error` | The key in `.env` is missing, mistyped or revoked. |
| `domain_not_verified` | `SENDPOSITORY_FROM` must be on a domain that shows **Verified** under Domains. |
| `email_not_verified` | Confirm your account's email address first - check your inbox. |
| `suppressed_recipient` | That address bounced or complained before. Try another one. |
| `validation_error` | The message says which field is wrong. |

Full guide: [sendpository.com/guides/send-email-with-nodejs](https://sendpository.com/guides/send-email-with-nodejs)
