

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