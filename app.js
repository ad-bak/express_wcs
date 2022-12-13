require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 8000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

//movies
const movieHandlers = require("./movieHandlers");
const { validateMovie } = require("./validators");

app.get("/api/movies", movieHandlers.getMovies);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.get("/api/movies/:id", movieHandlers.getMovieById);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

//users
const userHandlers = require("./userHandlers");
const { validateUser } = require("./validators");

app.get("/api/users", userHandlers.getUsers);
app.post("/api/users", validateUser, userHandlers.postUser);

app.get("/api/users/:id", userHandlers.getUserById);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

//
