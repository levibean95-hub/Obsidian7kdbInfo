#!/usr/bin/env python3
"""
Simple HTTP server for static files with proper ES6 module support
Optimized for performance
"""
import http.server
import socketserver
import os
from urllib.parse import unquote

PORT = 3000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    # Cache content types
    CONTENT_TYPES = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    }
    
    def translate_path(self, path):
        # Decode URL
        path = unquote(path.split('?')[0])
        
        # Handle root path
        if path == '/' or path == '':
            path = '/index.html'
        
        # If no extension, try adding .html
        if not os.path.splitext(path)[1]:
            html_path = path + '.html'
            file_path = html_path.lstrip('/')
            if os.path.exists(file_path) and os.path.isfile(file_path):
                path = html_path
        
        # Call parent translate_path
        return super().translate_path(path)
    
    def end_headers(self):
        # Add CORS headers for ES6 modules
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Set proper MIME types based on file extension
        ext = os.path.splitext(self.path)[1].lower()
        if ext in self.CONTENT_TYPES:
            self.send_header('Content-Type', self.CONTENT_TYPES[ext])
        
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    # Disable logging to improve performance
    def log_message(self, format, *args):
        pass

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print(f"Serving files from: {os.getcwd()}")
        print(f"\nAvailable pages:")
        print(f"  - http://localhost:{PORT}/")
        print(f"  - http://localhost:{PORT}/guild-war-teams.html")
        print(f"  - http://localhost:{PORT}/speed-gearing.html")
        print(f"  - http://localhost:{PORT}/wish-list.html")
        print("\nPress Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
