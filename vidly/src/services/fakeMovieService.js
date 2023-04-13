import * as genresAPI from "./fakeGenreService";
const movies = [
  {
    _id: "12345",
    title: "Terminator",
    genre: { _id: "123", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03",
    isLiked: true,
  },
  {
    _id: "12355",
    title: "Die Hard",
    genre: { _id: "123", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 2.5,
    isLiked: false,
  },
  {
    _id: "12365",
    title: "Die Easy",
    genre: { _id: "1234", name: "Comedy" },
    numberInStock: 3,
    dailyRentalRate: 3,
    isLiked: true,
  },
  {
    _id: "12337",
    title: "Angry Birds",
    genre: { _id: "1234", name: "Comedy" },
    numberInStock: 3,
    dailyRentalRate: 4,
    isLiked: false,
  },
  {
    _id: "12366",
    title: "Diie",
    genre: { _id: "1234", name: "Comedy" },
    numberInStock: 3,
    dailyRentalRate: 3,
    isLiked: true,
  },
  {
    _id: "1237",
    title: "Angry ",
    genre: { _id: "12345", name: "Thriller" },
    numberInStock: 3,
    dailyRentalRate: 4,
    isLiked: false,
  },
  {
    _id: "1236",
    title: "Die",
    genre: { _id: "123", name: "Action" },
    numberInStock: 3,
    dailyRentalRate: 3,
    isLiked: true,
  },
  {
    _id: "12377",
    title: "Angry Birr",
    genre: { _id: "1234", name: "Comedy" },
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
