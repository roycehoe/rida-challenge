import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";

const PORT = 3000;

const app = express();

async function getMovieData() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, "./data/movie.json"),
      "utf-8",
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      }
    );
  });
}

app.use(
  cors({
    origin: ["*"],
  })
);

app.get("/test", async (req, res) => {
  const movieData = await getMovieData();
  console.log(movieData);
});

app.get("/", async (req, res) => {
  const movieData = await getMovieData();
  res.json(movieData);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
