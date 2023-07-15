import json
import db
from socket import gethostname, gethostbyname
from http.server import HTTPServer, SimpleHTTPRequestHandler

db.getDB(db.cur)

HOST = gethostbyname(gethostname())
PORT = 8080 # Use any available port or local host

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

print("RUNNING ON " + HOST + ":" + str(PORT))
server.serve_forever()
server.server_close()
print("We are closed")
db.conn.close()
