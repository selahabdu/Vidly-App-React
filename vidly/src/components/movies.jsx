import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import Generes from "./common/geners";
import _, { filter } from "lodash";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 3,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { currentPage, pageSize, movies, selectedGenre, sortColumn } =
      this.state;

    //filter the moviesList
    const filterd =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    // sort
    const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);
    const movie = paginate(sorted, currentPage, pageSize);

    return { totalCount: filterd.length, data: movie };
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize } = this.state;
    const { totalCount, data: movie } = this.getPagedData();
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
            <h4> showing {totalCount} movies in the database</h4>
            <MoviesTable
              items={movie}
              sortColumn={this.state.sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
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
