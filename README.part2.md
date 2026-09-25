

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