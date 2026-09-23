import express from "express";
import { matchRouter } from "./routes/matches.routes.js"
const app = express();
const port = 5050;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sportz server is running.");
});

app.use('/matches', matchRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
