#!/usr/bin/env python3
import http.server
import socketserver
import os

# Change to the directory containing index.html
os.chdir('.')

# Create a simple HTTP server
PORT = 5000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Serving HTML website at http://0.0.0.0:{PORT}")
    print("Press Ctrl+C to stop the server")
    httpd.serve_forever()