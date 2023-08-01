import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";

const PORT = 3000;

const app = express();

app.use(
  cors({
    origin: ["*"],
  })
);

app.get("/", (req, res) => {
  fs.readFile(
    path.resolve(__dirname, "./data/movie.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        // Send error response
        res.status(500).send("An error occurred while reading the JSON file.");
      } else {
        // Parse JSON data and send it as response
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
