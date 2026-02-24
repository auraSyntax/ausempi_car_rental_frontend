export const config = {
    api: {
        bodyParser: true, // lets Vercel parse JSON body for you
    },
};

export default async function handler(req, res) {
    try {
        const backendBase = process.env.VITE_API_BASE_URL; // e.g. https://...railway.app
        if (!backendBase) {
            return res.status(500).json({ message: "VITE_API_BASE_URL is not set" });
        }

        const path = (req.query.path || []).join("/");
        // remove trailing slash if any, then append /api/
        const baseUrl = backendBase.replace(/\/$/, "");
        const url = `${baseUrl}/api/${path}`;

        // Copy headers, but remove hop-by-hop headers
        const headers = { ...req.headers };
        delete headers.host;
        delete headers.connection;
        delete headers["content-length"];

        // Remove origin to prevent backend CORS completely (matching local dev behavior)
        delete headers.origin;

        const body =
            req.method === "GET" || req.method === "HEAD"
                ? undefined
                : req.body
                    ? typeof req.body === 'string'
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

        // forward status + content-type
        res.status(upstream.status);
        res.setHeader("content-type", upstream.headers.get("content-type") || "application/json");

        // forward set-cookie headers if available
        const setCookie = upstream.headers.get("set-cookie");
        if (setCookie) {
            res.setHeader("set-cookie", setCookie);
        }

        return res.send(text);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Proxy error", error: String(err) });
    }
}
