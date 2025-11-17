const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function safePath(filePath) {
  // Normalize and resolve path
  const resolved = path.resolve(ROOT_DIR, filePath);
  const root = path.resolve(ROOT_DIR);
  
  // Ensure the resolved path is within the root directory (security)
  if (!resolved.startsWith(root)) {
    return null;
  }
  
  return resolved;
}

const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  let requestPath = parsedUrl.pathname;
  
  // Remove leading slash and decode URL
  requestPath = decodeURIComponent(requestPath);
  if (requestPath.startsWith('/')) {
    requestPath = requestPath.substring(1);
  }
  
  // Default to index.html for root
  if (requestPath === '' || requestPath === '/') {
    requestPath = 'index.html';
  }
  
  // Get safe file path
  const filePath = safePath(requestPath);
  
  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>403 - Forbidden</h1>', 'utf-8');
    return;
  }

  // Get content type based on the actual file path
  const contentType = getContentType(filePath);
  
  // Ensure HTML files always have the correct content type
  const finalContentType = path.extname(filePath).toLowerCase() === '.html' 
    ? 'text/html; charset=utf-8' 
    : contentType;

  // Set headers
  const headers = {
    'Content-Type': finalContentType,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    return;
  }

  // Only handle GET requests
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, headers);
    res.end('Method Not Allowed', 'utf-8');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      // File not found - try adding .html extension if it doesn't have one
      if (!path.extname(filePath)) {
        const htmlPath = filePath + '.html';
        const safeHtmlPath = safePath(requestPath + '.html');
        if (safeHtmlPath) {
          fs.stat(safeHtmlPath, (htmlStatErr, htmlStats) => {
            if (!htmlStatErr && htmlStats.isFile()) {
              // Serve the .html file
              fs.readFile(safeHtmlPath, (readErr, content) => {
                if (readErr) {
                  res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                  res.end(`Server Error: ${readErr.code}`, 'utf-8');
                  return;
                }
                res.writeHead(200, {
                  'Content-Type': 'text/html; charset=utf-8',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type'
                });
                res.end(content, 'utf-8');
              });
              return;
            }
            // Still not found
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<h1>404 - File Not Found</h1><p>${requestPath}</p>`, 'utf-8');
          });
          return;
        }
      }
      // File not found
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 - File Not Found</h1><p>${requestPath}</p>`, 'utf-8');
      return;
    }

    // Read and serve file
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, headers);
        res.end(`Server Error: ${readErr.code}`, 'utf-8');
        return;
      }

      res.writeHead(200, headers);
      res.end(content, 'utf-8');
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Serving files from: ${ROOT_DIR}`);
  console.log(`\nAvailable pages:`);
  console.log(`  - http://localhost:${PORT}/`);
  console.log(`  - http://localhost:${PORT}/guild-war-teams.html`);
  console.log(`  - http://localhost:${PORT}/speed-gearing.html`);
  console.log(`  - http://localhost:${PORT}/wish-list.html`);
});

