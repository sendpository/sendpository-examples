"use client";

import { useActionState } from "react";
import { send, type SendState } from "./actions";

export default function Home() {
  const [state, action, pending] = useActionState<SendState, FormData>(send, {});

  return (
    <main style={{ maxWidth: 480, margin: "80px auto", fontFamily: "system-ui, sans-serif" }}>
      <h1>Send a test email</h1>
      <form action={action} style={{ display: "flex", gap: 8 }}>
        <input name="to" type="email" required placeholder="you@example.com" style={{ flex: 1, padding: 8 }} />
        <button type="submit" disabled={pending} style={{ padding: "8px 16px" }}>
          {pending ? "Sending…" : "Send"}
        </button>
      </form>
      {state.id ? <p>Sent. Message id: <code>{state.id}</code></p> : null}
      {state.error ? <p style={{ color: "crimson" }}>{state.error}</p> : null}
    </main>
  );
}
