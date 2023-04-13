import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Page = (props) => {
  const { itemsCount, onPageChange, pageSize, currentPage } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null; // hide the pagination if the list does't need another page
  const page = _.range(1, pageCount + 1);
  console.log(currentPage);

  return (
    <>
      <nav>
        <ul className="pagination">
          {page.map((li) => {
            return (
              <li
                key={li}
                className={
                  currentPage === li ? "page-item active" : "page-item"
                }
              >
                <a className="page-link" onClick={() => onPageChange(li)}>
                  {li}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

Page.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Page;
