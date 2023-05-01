import React, { Component } from "react";

// use ...rest operator to get other properties from props object
const Input = ({ name, label, error, ...rest }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input id={name} name={name} {...rest} className="form-control" />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
};

export default Input;
