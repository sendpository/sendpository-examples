# AGENTS.md

<!-- sendpository:start -->
## Sendpository (email)

This project sends email with Sendpository. Before writing or changing email
code, read `.claude/skills/sendpository/SKILL.md` and the reference it points to.

- `SENDPOSITORY_API_KEY` stays on the server. Never in client code, a
  `NEXT_PUBLIC_`/`VITE_` variable, or a committed file.
- `from` must be on a domain verified in the Sendpository dashboard.
- Branch on `error.type`, never on the message.
- Pass an idempotency key derived from the event on anything that can retry.
- Verify webhook signatures on the raw request body.
<!-- sendpository:end -->
