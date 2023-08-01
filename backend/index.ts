import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";

const PORT = 3000;

const app = express();

interface Movies {
  id: number;
  title: string;
  year: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}

interface GetAllMoviesResponse {
  movies: Movies[];
}

async function getAllMovies(): Promise<GetAllMoviesResponse> {
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

app.get("/all", async (req, res) => {
  const movieData = await getAllMovies();
  res.json(movieData.movies);
});

app.get("/", async (req: Record<any, any>, res) => {
  let filteredMovies = (await getAllMovies()).movies;

  // Filter by id
  if (req.query.id) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.id === Number(req.query.id)
    );
  }

  // Filter by year
  if (req.query.year) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.year === req.query.year
    );
  }

  // Filter by title
  if (req.query.title) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(req.query.title.toLowerCase())
    );
  }

  // Filter by runtime
  if (req.query.runtime) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.runtime === req.query.runtime
    );
  }

  // Filter by genre
  if (req.query.genre) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genres.includes(req.query.genre)
    );
  }

  // Filter by director
  if (req.query.director) {
    filteredMovies = filteredMovies.filter(
      (movie) =>
        movie.director.toLowerCase() === req.query.director.toLowerCase()
    );
  }

  // Filter by actors
  if (req.query.actor) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.actors.toLowerCase().includes(req.query.actor.toLowerCase())
    );
  }

  res.json(filteredMovies);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
