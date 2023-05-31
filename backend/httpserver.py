import json
import db
from http.server import HTTPServer, SimpleHTTPRequestHandler, BaseHTTPRequestHandler

db.getDB(db.cur)

HOST = "192.168.10.102"
PORT = 9999

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', '*')
        SimpleHTTPRequestHandler.end_headers(self)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.end_headers()

        self.wfile.write(bytes('{"messages": ' + str(db.getDB(db.cur)) + '}' , "utf-8"))

    def do_POST(self):
        self.send_response(200)
        self.end_headers()
        file_length = int(self.headers['Content-Length'])
        content_str = (self.rfile.read(file_length)).decode('utf8').replace("'", '"')
        content_json = json.loads(content_str)
        if content_json['msg'] == "clear":
            db.deleteAll(db.cur)
        else: 
            db.add(db.cur, msg=content_json['msg'], usr=content_json['usr'])

server = HTTPServer((HOST, PORT), CORSRequestHandler)

print("RUNNING ON " + HOST)
server.serve_forever()
server.server_close()
print("We are closed")
db.conn.close()
