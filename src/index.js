import express from "express";

const app = express();
const port = 5050;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sportz server is running.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
