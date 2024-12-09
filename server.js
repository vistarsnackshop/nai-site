const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const hostname = "localhost";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    try {
      // Serve only _next/static
      if (pathname.startsWith("/_next/static")) {
        const filePath = path.join(__dirname, ".next", pathname.replace("/_next/static", "static"));
        
        // Debugging log for resolved file path
        console.log("Resolved file path:", filePath);

        if (fs.existsSync(filePath)) {
          res.writeHead(200, { "Content-Type": "application/octet-stream" });
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        res.statusCode = 404;
        res.end("Not Found");
        return;
      }

      // Handle all other requests with Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
