import * as genresAPI from "./fakeGenreService";
const movies = [
  {
    _id: "12345",
    title: "Terminator",
    genre: { _id: "1", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03",
    isLiked: true,
  },
  {
    _id: "12355",
    title: "Die Hard",
    genre: { _id: "12", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 2.5,
    isLiked: false,
  },
  {
    _id: "12365",
    title: "Die Easy",
    genre: { _id: "123", name: "Adventure" },
    numberInStock: 3,
    dailyRentalRate: 3,
    isLiked: true,
  },
  {
    _id: "12375",
    title: "Angry Birds",
    genre: { _id: "1234", name: "Adventure" },
    numberInStock: 3,
    dailyRentalRate: 4,
    isLiked: false,
  },
];

export function getMovies() {
  return movies;
}
export function getMovie(id) {
  return movies.find((m) => m._id === id);
}
