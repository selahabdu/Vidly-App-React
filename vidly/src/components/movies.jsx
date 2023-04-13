import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import Generes from "./common/geners";
import { filter } from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 3,
    currentPage: 1,
    genres: [],
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genres,
    });
  }
  handleDelete = (li_id) => {
    let movies = this.state.movies.filter((mov) => {
      return mov._id !== li_id;
    });
    this.setState({ movies }); // in js if key and value are the same we dont have to write it again as below
    // this.setState((this.state.movies = movies));
  };
  handleLike = (liked) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(liked);
    movies[index] = { ...movies[index] };
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
    console.log(genre);
  };
  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies, selectedGenre } = this.state;

    const filterd =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const movie = paginate(filterd, currentPage, pageSize);
    if (count === 0) return <h2> there is no data in the database</h2>;

    return (
      <>
        <div className="row">
          <div className="col-3 ">
            {/* <div className="col-responsive-md"> */}
            <Generes
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <h4> showing {filterd.length} movies in the database</h4>
            <table className="table table-dark">
              <thead>
                <tr className="">
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movie.map((li) => (
                  <tr key={li._id}>
                    <td>{li.title}</td>
                    <td>{li.genre.name}</td>
                    <td>{li.numberInStock}</td>
                    <td>{li.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={li.isLiked}
                        onClick={() => this.handleLike(li)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(li._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={filterd.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
