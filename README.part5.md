

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