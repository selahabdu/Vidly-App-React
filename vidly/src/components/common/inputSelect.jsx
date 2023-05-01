import React from "react";
const InputSelect = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" id={name} name={name} {...rest}>
        <option value="" />
        {options.map((op) => {
          return (
            <option key={op._id} value={op._id}>
              {op.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
export default InputSelect;
