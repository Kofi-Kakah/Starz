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