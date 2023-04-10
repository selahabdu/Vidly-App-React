import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (li_id) => {
    let movies = this.state.movies.filter((mov) => {
      return mov._id !== li_id;
    });
    this.setState({ movies }); // in js if key and value are the same we dont have to write it again as below
    // this.setState((this.state.movies = movies));
  };

  render() {
    if (this.state.movies.length === 0)
      return <h2> there is no data in the database</h2>;

    return (
      <>
        <h4> showing {this.state.movies.length} movies in the database</h4>
        <table className="table  table-dark table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((li) => (
              <tr key={li._id}>
                <td>{li.title}</td>
                <td>{li.genre.name}</td>
                <td>{li.numberInStock}</td>
                <td>{li.dailyRentalRate}</td>
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
      </>
    );
  }
}

export default Movies;
