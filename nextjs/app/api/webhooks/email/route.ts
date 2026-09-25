import { verifyWebhook, type WebhookPayload } from "sendpository";

/**
 * Delivery events. Add this URL under Dashboard → Webhooks and put the signing
 * secret in SENDPOSITORY_WEBHOOK_SECRET. To try it locally, expose your dev
 * server with a tunnel (ngrok, cloudflared) and register that URL.
 */
export async function POST(req: Request) {
  let event: WebhookPayload;
  try {
    event = verifyWebhook({
      // The raw body: parsing and re-serialising would change the bytes.
      body: await req.text(),
      signature: req.headers.get("sendpository-signature") ?? "",
      secret: process.env.SENDPOSITORY_WEBHOOK_SECRET ?? "",
    });
  } catch {
    return new Response("invalid signature", { status: 401 });
  }

  // Replace with your own handling - e.g. mark the address undeliverable.
  console.log("webhook", event.type, JSON.stringify(event.data));
  return new Response("ok");
}
