import { Sendpository, SendpositoryError } from "sendpository";

const to = process.argv[2];
if (!to) {
  console.error("Usage: npm run send -- you@example.com");
  process.exit(1);
}

const sendpository = new Sendpository(process.env.SENDPOSITORY_API_KEY, {
  // Only set when pointing at a non-default API, e.g. a self-hosted install.
  baseUrl: process.env.SENDPOSITORY_BASE_URL || undefined,
});

try {
  const { id } = await sendpository.emails.send({
    from: process.env.SENDPOSITORY_FROM,
    to: [to],
    subject: "Hello from Sendpository",
    html: "<p>It works. This email was sent with <strong>one API call</strong>.</p>",
    text: "It works. This email was sent with one API call.",
  });
  console.log(`Sent. Message id: ${id}`);
} catch (err) {
  if (!(err instanceof SendpositoryError)) throw err;
  console.error(`${err.type}: ${err.message}`);
  process.exit(1);
}
