#!/usr/bin/env python3
import sqlite3
import os

def initializeDB(db):
    # MESSAGES TABLE
    try:
        db.execute('''CREATE TABLE MESSAGES
               (ID INTEGER  PRIMARY KEY,
                USR TEXT NOT NULL,
                MSG TEXT NOT NULL)''')

        db.commit()
        return 0
    except:
        return 1

# def delete(db, msg_id):
#     conn.execute()

def add(db, usr, msg):
    cur.execute("SELECT * FROM MESSAGES")
    uid = cur.fetchall()
    uid = len(uid) + 1

    db.execute("""
        INSERT INTO MESSAGES(ID, USR, MSG) VALUES
            (?, ?, ?)
    """, (uid, usr, msg))
    conn.commit()

def delete(db, uid):
    db.execute("DELETE FROM MESSAGES WHERE ID = ?", 
               (uid,))

def deleteAll(db):
    db.execute("SELECT * FROM MESSAGES")
    for row in cur.fetchall():
        try:
            delete(db, row[0])
        except:
            pass

def getDB(db):
    cur.execute("SELECT * FROM MESSAGES")
    parsed = []
    unparsed = cur.fetchall()
    for i in unparsed:
        parsed.append({"id": i[1], "msg": i[2]})
    return str(parsed).replace("'", '"')
#main

path = "./server.db"
conn = sqlite3.connect(path)
cur = conn.cursor()
initializeDB(conn)    



conn.commit()
