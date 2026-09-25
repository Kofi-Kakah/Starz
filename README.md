<div align="center">

![Node.js](https://img.shields.io/badge/NODE.JS-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/EXPRESS%205-000000?style=for-the-badge&logo=express&logoColor=white)
![Websockets](https://img.shields.io/badge/WEBSOCKETS-000000?style=for-the-badge&logo=socketdotio&logoColor=white)
![Zod](https://img.shields.io/badge/ZOD-3C67FF?style=for-the-badge&logo=zod&logoColor=white)

![PostgreSQL](https://img.shields.io/badge/POSTGRESQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle](https://img.shields.io/badge/DRIZZLE-C5F74F?style=for-the-badge&logo=drizzle&logoColor=000000)
![Arcjet](https://img.shields.io/badge/ARCJET-8B5CF6?style=for-the-badge&logo=shield&logoColor=white)
![Neon](https://img.shields.io/badge/NEON-00E599?style=for-the-badge&logo=neon&logoColor=white)
![Site24x7](https://img.shields.io/badge/SITE24X7-2A7DE1?style=for-the-badge&logo=site24x7&logoColor=white)

</div>

<div align="center">

# ⚽ Sportz — Live Sports Events API & Websockets

A real-time sports backend for scores, match lifecycle and ball-by-ball commentary — built step by step with **JavaScript Mastery**. Join the JSM family! 💛

</div>

---

## 📋 Table of Contents

1. [⚡ Introduction](#-introduction)
2. [⚙️ Tech Stack](#️-tech-stack)
3. [🔋 Features](#-features)
4. [🚀 Quick Start](#-quick-start)
5. [🔑 Environment Variables](#-environment-variables)
6. [📚 API Reference](#-api-reference)
7. [🔌 Websockets](#-websockets)
8. [🗂️ Project Structure](#️-project-structure)
9. [🛠️ Scripts](#️-scripts)
10. [🚨 Known Issues](#-known-issues)
11. [🚀 More](#-more)

---

## ⚡ Introduction

**Sportz** is a real-time backend for live sports events. It exposes a REST API for creating matches, updating scores and posting minute-by-minute commentary, and pushes updates instantly to connected clients over **Websockets**. Matches automatically transition between `scheduled`, `live` and `finished` based on their start and end times, and every request and socket upgrade is protected by **Arcjet** (shield, bot detection and rate limiting).

---

## ⚙️ Tech Stack

- **[Node.js](https://nodejs.org/)** — JavaScript runtime
- **[Express 5](https://expressjs.com/)** — REST API framework
- **[Websockets (ws)](https://github.com/websockets/ws)** — real-time score & commentary broadcast
- **[PostgreSQL](https://www.postgresql.org/)** — relational database
- **[Neon](https://neon.tech)** — serverless Postgres (with `@neondatabase/serverless`)
- **[Drizzle ORM](https://orm.drizzle.team/)** — type-safe ORM, schema + migrations
- **[Zod](https://zod.dev/)** — schema validation for routes & payloads
- **[Arcjet](https://arcjet.com)** — rate limiting, bot detection and shield
- **[Site24x7 APM Insight](https://www.site24x7.com/apm-insight.html)** — application performance monitoring
- **[dotenv](https://github.com/motdotla/dotenv)** — environment configuration

---

## 🔋 Features

- 🏟️ **Match management** — create and list matches with sport, teams, start/end times and scores
- 🔄 **Automatic status transitions** — matches move between `scheduled → live → finished` based on time
- ⚽ **Score updates** — update scores only for live matches (`409` when not live)
- 💬 **Commentary feed** — minute, sequence, period, event type, actor, team, message, metadata and tags
- 🔌 **Real-time Websockets** — subscribe per match, receive `match_created` and `commentary` events instantly
- 🛡️ **Arcjet security** — HTTP rate limiting (50 req/10s), WS handshake protection (5 req/2s), bot detection, shield
- ✅ **Zod validation** — strict validation on query params, path params and JSON bodies
- 🐘 **Drizzle migrations** — generated and versioned under `/drizzle`
- 📡 **Heartbeats** — 30s ping/pong liveness checks that terminate dead sockets

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v20+
- **Git**
- A **[Neon](https://neon.tech)** Postgres connection string
- An **[Arcjet](https://app.arcjet.com)** key (optional — the app runs without it)

### Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/Kofi-Kakah/Starz.git
    cd Starz
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment variables** — copy the example file and fill in your values

    ```bash
    cp .env.example .env
    ```

4. **Run migrations**

    ```bash
    npm run db:generate
    npm run db:migrate
    ```

5. **Start the server**

    ```bash
    # development (auto-restarts on file changes)
    npm run dev

    # production
    npm start
    ```

6. You should see:

    ```
    Server is running on http://localhost:5050
    WebSocket Server is running on ws://localhost:5050/ws
    ```

---

## 🔑 Environment Variables

| Variable | Description | Required | Default |
| --- | --- | --- | --- |
| `DATABASE_URL` | Neon Postgres connection string (Neon Console → Dashboard → Connect) | ✅ | — |
| `PORT` | HTTP server port | ❌ | `5050` |
| `HOST` | Server host binding | ❌ | `0.0.0.0` |
| `NODE_ENV` | `development` or `production` | ❌ | `development` |
| `ARCJET` | Arcjet project key (`aj_prj_key_...`) | ❌ | — |
| `ARCJET_ENV` | `development`, `production` or `DRY_RUN` | ❌ | `development` |
| `APMINSIGHT_LICENSE_KEY` | Site24x7 APM Insight license key | ❌ | — |
| `APMINSIGHT_APP_NAME` | Monitor name shown in Site24x7 | ❌ | `sportz-api` |
| `WS_PATH` | Websocket endpoint path | ❌ | `/ws` |

> 🔒 `.env` is git-ignored — never commit real keys. Use `.env.example` as the shared template.

---

## 📚 API Reference

Base URL: `http://localhost:5050`

### Matches

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/matches?limit=50` | List matches (newest first, max 100) |
| `POST` | `/matches` | Create a match and broadcast `match_created` |
| `PATCH` | `/matches/:id/score` | Update scores (live matches only) |

**Create a match**

```http
POST /matches
Content-Type: application/json
```

```json
{
  "sport": "football",
  "homeTeam": "Arsenal",
  "awayTeam": "Chelsea",
  "startTime": "2026-09-25T15:00:00.000Z",
  "endTime": "2026-09-25T16:45:00.000Z"
}
```

**Update the score**

```http
PATCH /matches/1/score
Content-Type: application/json
```

```json
{ "homeScore": 2, "awayScore": 1 }
```

### Commentary

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/matches/:id/commentary?limit=10` | Latest commentary for a match (max 100) |
| `POST` | `/matches/:id/commentary` | Create commentary and broadcast it live |

**Create commentary**

```http
POST /matches/1/commentary
Content-Type: application/json
```

```json
{
  "minute": 67,
  "period": "2H",
  "eventType": "goal",
  "actor": "Bukayo Saka",
  "team": "Arsenal",
  "message": "GOAL! Saka curls one into the top corner from the edge of the box!",
  "metadata": { "assist": "Martin Ødegaard", "xG": 0.34 },
  "tags": ["goal", "arsenal"]
}
```

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

---

## 🛠️ Scripts

| Script | Command | Description |
| --- | --- | --- |
| `start` | `node src/index.js` | Start the production server |
| `dev` | `node --watch src/index.js` | Start with auto-reload |
| `db:generate` | `drizzle-kit generate` | Generate migrations from the schema |
| `db:migrate` | `drizzle-kit migrate` | Apply migrations to the database |

---

## 🚨 Known Issues

- `src/index.js` imports `./ws/server.js` and `./routes/commentary.js`, but the actual files live at `src/websocket/server.js` and `src/routes/commentary.routes.js` — the paths need to be aligned before the server can boot.
- `apminsight` is imported in `src/index.js` but is not listed in `package.json` — add it with `npm install apminsight` (or wrap the import) before starting.
- `matches.routes.js` references `matchIdParamSchema`, `updateScoreSchema`, `formatZodError`, `syncMatchStatus` and `MATCH_STATUS` without importing them.
- The Arcjet middleware is commented out in `src/index.js`; only WS upgrades are currently protected.

---

## 🚀 More

Built as part of the **JavaScript Mastery** real-time Websockets course. If you found this useful, ⭐ star the repo and check out the full tutorial on YouTube!

<div align="center">

**[JavaScript Mastery](https://www.youtube.com/@JavaScriptMastery)** — Join the JSM family! 💛

</div>