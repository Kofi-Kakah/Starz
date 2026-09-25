

---

## 🔌 Websockets

Connect to the socket endpoint, then subscribe to a match:

```
ws://localhost:5050/ws
```

**Client → Server**

```json
{ "type": "subscribe", "matchId": 1 }
{ "type": "unsubscribe", "matchId": 1 }
```

**Server → Client**

| Type | Description |
| --- | --- |
| `welcome` | Sent on connection |
| `subscribed` / `unsubscribed` | Ack for the subscription change |
| `match_created` | Broadcast to **all** clients when a match is created |
| `commentary` | Broadcast to subscribers of that match when new commentary lands |
| `error` | Malformed JSON or invalid message |

Quick test with `websocat`:

```bash
websocat ws://localhost:5050/ws
{ "type": "subscribe", "matchId": 1 }
```

---

## 🗂️ Project Structure

```
sportz/
├── drizzle/               # Generated migrations + snapshots
├── src/
│   ├── database/
│   │   ├── db.js          # Neon pool + Drizzle client
│   │   └── schema.js      # matches & commentary tables, enums
│   ├── routes/
│   │   ├── matches.routes.js
│   │   └── commentary.routes.js
│   ├── utils/
│   │   └── match-status.js # scheduled / live / finished logic
│   ├── validation/         # Zod schemas
│   │   ├── matches.js
│   │   └── commentary.js
│   ├── websocket/
│   │   └── server.js      # /ws endpoint, subscriptions, broadcasts
│   ├── arcjet.js          # HTTP + WS protection middleware
│   └── index.js           # Express + HTTP server bootstrap
├── drizzle.config.js
├── .env.example
└── package.json
```