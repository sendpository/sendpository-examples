# Sendpository

Transactional email API for developers.
Send your first application email with one HTTP request.

```bash
curl -X POST https://api.sendpository.com/v1/emails \
  -H "Authorization: Bearer $SENDPOSITORY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Acme <hello@mail.yourdomain.com>",
    "to": ["you@example.com"],
    "subject": "Hello from Sendpository",
    "html": "<p>It works.</p>"
  }'
```

```json
{ "id": "d67e39ed-96be-4b35-ab22-853163d92c92" }
```

## Examples

Each folder is a complete, runnable example: clone, add your API key, send.

| Example | Stack | Run |
|---|---|---|
| [nextjs](./nextjs) | Next.js App Router - Server Action + webhook Route Handler | `npm run dev` |
| [node](./node) | Node.js 20+ with the [`sendpository`](https://www.npmjs.com/package/sendpository) SDK | `npm run send -- you@example.com` |
| [python](./python) | Python 3, standard library only | `python3 send.py you@example.com` |
| [php](./php) | PHP 8.1+ with ext-curl | `php send.php you@example.com` |
| [go](./go) | Go 1.22+, standard library only | `go run . you@example.com` |

## Using an AI coding agent?

This repo already has the Sendpository skill installed
(`.claude/skills/sendpository/` and `AGENTS.md`), so Claude Code, Codex,
Cursor and Copilot know how to work with it. Open any example with your agent
and ask it to extend it - "add a password reset email", "handle bounces".

In your own project, one command does the same:

```bash
npx sendpository@latest agents
```

Moving from Resend, SendGrid, Postmark, Mailgun or SES? Ask your agent to
"switch this project's email to Sendpository" after running it. See
[sendpository.com/agents](https://sendpository.com/agents).

## Before your first send

1. Create an account at [sendpository.com](https://sendpository.com).
2. Add your domain under **Domains** and publish the DNS records it shows.
3. Create a key under **API keys** and put it in the example's `.env`.

## Links

- Docs: [sendpository.com/docs](https://sendpository.com/docs)
- API reference: [sendpository.com/docs/api-reference/emails](https://sendpository.com/docs/api-reference/emails)
- Node.js SDK: [sendpository/sendpository-node](https://github.com/sendpository/sendpository-node)

Found a problem with an example? [Open an issue](https://github.com/sendpository/sendpository-examples/issues).

MIT licensed.
