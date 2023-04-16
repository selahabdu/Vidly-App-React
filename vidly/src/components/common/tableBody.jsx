import React, { Component } from "react";
import Like from "./like";
import _ from "lodash"; // to use _.get()
class TableBody extends Component {
  renderCell = (item, column) => {
    // if it have a content
    if (column.content) return column.content(item);
    //else
    return _.get(item, column.path);
  };
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              {columns.map((column) => {
                return (
                  <td key={this.createKey(item, column)}>
                    {this.renderCell(item, column)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
    // return <></>;
  }
}

export default TableBody;
