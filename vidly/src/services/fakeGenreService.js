export const genres = [
  { _id: "123", name: "Action" },
  { _id: "1234", name: "Comedy" },
  { _id: "12345", name: "Thriller" },
];

export function getGenres() {
  return genres.filter((g) => g);
}
