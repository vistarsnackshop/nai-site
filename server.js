const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

console.log(`Starting server...`);
console.log(`Port: ${port}`);
console.log(`Environment: ${dev ? 'development' : 'production'}`);

const app = next({ dev });
const handle = app.getRequestHandler();

console.log('Initializing Next.js application...');

app.prepare().then(() => {
  console.log('Next.js application prepared.');

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    console.log(`Incoming request: ${req.method} ${req.url}`);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) {
      console.error('Error starting server:', err);
    } else {
      console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
    }
  });
}).catch((err) => {
  console.error('Error during Next.js app preparation:', err);
});
