export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  // handle preflight quickly (important)
  if (req.method === "OPTIONS") return res.status(204).end();

  const backendBase = process.env.BACKEND_URL; // NO /api here
  if (!backendBase) return res.status(500).json({ message: "BACKEND_URL is not set" });

  const path = (req.query.path || []).join("/"); // auth/login
  const baseUrl = backendBase.replace(/\/$/, "");
  const url = `${baseUrl}/api/v1/${path}`; // keep your versioned API here

  const headers = { ...req.headers };
  delete headers.host;
  delete headers.connection;
  delete headers["content-length"];
  delete headers.origin; // remove origin so backend won't CORS block

  const body =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : req.body
      ? typeof req.body === "string"
        ? req.body
        : JSON.stringify(req.body)
      : undefined;

  const upstream = await fetch(url, {
    method: req.method,
    headers: {
      ...headers,
      "content-type": "application/json",
    },
    body,
  });

  const text = await upstream.text();
  res.status(upstream.status);

  const ct = upstream.headers.get("content-type");
  if (ct) res.setHeader("content-type", ct);

  // Forward set-cookie (if backend uses it)
  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) res.setHeader("set-cookie", setCookie);

  return res.send(text);
}
