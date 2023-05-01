import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import Generes from "./common/geners";
import _, { filter } from "lodash";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
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
  // handleAdd = () => {
  //   let movies = this.state.movies;
  //   const a = {
  //     _id: "123450",
  //     title: "aaaa",
  //     genre: { _id: "12300", name: "Action" },
  //     numberInStock: 6,
  //     dailyRentalRate: 2.5,
  //     publishDate: "2018-01-03",
  //     isLiked: true,
  //   };
  //   movies.push(a);
  //   this.setState({ movies });
  // };
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    //filter the moviesList
    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? movies.filter((m) => m.genre._id === selectedGenre._id)
    //     : movies;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    // sort

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movie = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movie };
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, searchQuery } = this.state;
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
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
            <h4> showing {totalCount} movies in the database</h4>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
