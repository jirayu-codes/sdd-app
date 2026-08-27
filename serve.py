"""Papoi sales-and-development app: a tiny web backend.

This server has two jobs:
  1. Serve the static frontend files (HTML, CSS, JS) from the frontend folder.
  2. Expose a /health endpoint that a browser can fetch to prove the
     frontend and backend are talking to each other.

Run it from the project root:
    python3 serve.py

Then open the printed URL in a browser.
"""

import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse

PORT = 3000
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frontend")


class PapoiHandler(BaseHTTPRequestHandler):
    def _send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _serve_file(self, path):
        if path == "/":
            path = "/index.html"
        filename = os.path.normpath(os.path.join(FRONTEND_DIR, path.lstrip("/")))
        if not filename.startswith(FRONTEND_DIR) or not os.path.isfile(filename):
            self.send_error(404, "Not Found")
            return
        content_types = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
        }
        extension = os.path.splitext(filename)[1]
        with open(filename, "rb") as f:
            body = f.read()
        self.send_response(200)
        self.send_header("Content-Type", content_types.get(extension, "application/octet-stream"))
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/health":
            self._send_json(200, {"status": "ok", "message": "Hello from the Papoi backend"})
        else:
            self._serve_file(path)

    def log_message(self, format, *args):
        # Keep the console tidy, but still show requests.
        print("%s - %s" % (self.address_string(), format % args))


def main():
    if os.environ.get("CODIO_HOSTNAME"):
        url = f"https://{os.environ['CODIO_HOSTNAME']}-{PORT}.codio.io/"
    else:
        url = f"http://localhost:{PORT}/"
    server = HTTPServer(("0.0.0.0", PORT), PapoiHandler)
    print(f"Papoi is running. Open {url} in your browser.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("Shutting down.")
        server.server_close()


if __name__ == "__main__":
    main()
