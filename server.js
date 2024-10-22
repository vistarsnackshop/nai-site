const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000; // Adjust as needed for IIS
const hostname = "localhost";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Extract the original URL from the query parameter 'url'
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      const originalPath = query.url || pathname; // Use the 'url' query param if passed, else fallback to pathname

      if (originalPath === "/a") {
        await app.render(req, res, "/a", query);
      } else if (originalPath === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parse(originalPath, true));
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
});
