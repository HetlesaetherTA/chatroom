# chatroom

A simple chatroom. 

The backend will listen for http requests (by default on port 8080) and save state in a sqlite instance. 
The frontend will send http requests and manage the UI.

Start server:

1. run 'python chatroom/backend/httpserver.py'
This will print "RUNNING ON [PRIVATE_IP_ADDRESS]:[PORT (default=8080)].
Your IP Address automatically found using the socket library. The database is reachable on IP_ADDRESS:PORT

2. change the variable IP_ADDRESS [line 3] in chatroom/frontend/main.js
to the IP address used by the backend.

3. Open the Index.html file and enjoy
