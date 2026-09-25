// A stand-in for POST /v1/emails, so CI can run every example without a real
// account. It checks what a real request must carry and answers like the API.
import http from "node:http";
http.createServer((req, res) => {
  let raw = "";
  req.on("data", (c) => (raw += c));
  req.on("end", () => {
    const reply = (status, body) => { res.writeHead(status, { "content-type": "application/json" }); res.end(JSON.stringify(body)); };
    console.log(req.method, req.url, req.headers["user-agent"] ?? "", raw);
    if (req.method !== "POST" || req.url !== "/v1/emails") return reply(404, { error: { type: "not_found", message: "no route" } });
    if (req.headers.authorization !== "Bearer sp_test_key") return reply(401, { error: { type: "authentication_error", message: "The API key is missing, wrong, or revoked." } });
    let b; try { b = JSON.parse(raw); } catch { return reply(422, { error: { type: "validation_error", message: "Body is not JSON." } }); }
    if (!b.from || !Array.isArray(b.to) || !b.subject || !(b.html || b.text)) return reply(422, { error: { type: "validation_error", message: "from, to[], subject and html/text are required." } });
    if (!b.from.includes("@verified.test")) return reply(403, { error: { type: "domain_not_verified", message: `The domain in ${b.from} is not verified.` } });
    reply(200, { id: "d67e39ed-96be-4b35-ab22-853163d92c92" });
  });
}).listen(4010, () => console.log("mock on 4010"));
