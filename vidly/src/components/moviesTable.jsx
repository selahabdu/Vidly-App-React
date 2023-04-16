import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
class MoviesTable extends Component {
  //it shouldn't be inside the state because it is not changed throughout its lifecycle
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.isLiked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { items, onDelete, onLike, onSort, sortColumn } = this.props;
    return (
      <>
        <table className="table table-dark">
          <TableHeader
            columns={this.columns}
            onSort={onSort}
            sortColumn={sortColumn}
          />
          <TableBody
            data={items}
            columns={this.columns}
            onLike={onLike}
            onDelete={onDelete}
          />
        </table>
      </>
    );
  }
}
export default MoviesTable;
