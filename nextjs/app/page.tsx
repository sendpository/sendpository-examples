"use client";

import { useActionState } from "react";
import { send, type SendState } from "./actions";

export default function Home() {
  const [state, action, pending] = useActionState<SendState, FormData>(send, {});

  return (
    <main style={{ maxWidth: 480, margin: "80px auto", fontFamily: "system-ui, sans-serif" }}>
      <h1>Send a test email</h1>
      <form action={action} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label htmlFor="demo-token">Demo access token (not your API key)</label>
        <input id="demo-token" name="accessToken" type="password" required autoComplete="off" style={{ minWidth: 0, padding: 8 }} />
        <label htmlFor="demo-recipient">Configured test recipient</label>
        <input id="demo-recipient" name="to" type="email" required placeholder="you@example.com" style={{ minWidth: 0, padding: 8 }} />
        <button type="submit" disabled={pending} style={{ padding: "8px 16px" }}>
          {pending ? "Sending…" : "Send"}
        </button>
      </form>
      {state.id ? <p role="status">Sent. Message id: <code>{state.id}</code></p> : null}
      {state.error ? <p role="alert" style={{ color: "crimson" }}>{state.error}</p> : null}
    </main>
  );
}
