const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Use port 3001 instead of 3000
const PORT = 3001;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    
    // Handle image requests for saree and bags from external directories
    if (parsedUrl.pathname.startsWith('/external-images/saree/')) {
      const imageName = path.basename(parsedUrl.pathname);
      const filePath = path.join('D:/websit for cloth/saree', imageName);
      
      if (fs.existsSync(filePath)) {
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      } else {
        res.statusCode = 404;
        res.end('Image not found');
      }
      return;
    }
    
    if (parsedUrl.pathname.startsWith('/external-images/bag/')) {
      const imageName = path.basename(parsedUrl.pathname);
      const filePath = path.join('D:/websit for cloth/bag', imageName);
      
      if (fs.existsSync(filePath)) {
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
      } else {
        res.statusCode = 404;
        res.end('Image not found');
      }
      return;
    }
    
    handle(req, res, parsedUrl);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
}); 