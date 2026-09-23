import express from "express";
import { matchRouter } from "./routes/matches.routes.js";
import http from "http"
import { attachWebSocketServer } from "./websocket/server.js";

const app = express();
const server = http.createServer(app)

const PORT = process.env.PORT || 5050;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sportz server is running.");
});

app.use('/matches', matchRouter)

const { broadcastMatchCreated } = attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;



server.listen(PORT, HOST, () => {
  const baseUrl = HOST === '0.0.0.0' ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
  console.log(`Server is running on ${baseUrl}`);
  console.log(`WebSocket Server is running on ${baseUrl.replace('http', 'ws')}/ws`);
});
