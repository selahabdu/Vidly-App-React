import _ from "lodash";
export function paginate(items, pageNumber, pageSize) {
  const indexNumber = (pageNumber - 1) * pageSize;

  //   _.slice(items, indexNumber); // it will slice the items/array starting from the given index
  //   _.take(pageSize); // then take pagesize amount of elements from the array
  // _.value  // convert it into an array
  // to use the above two methods and chain them  we have to convert the array into lodash wrapper method   to call them as chain
  // _(items).slice().take().
  return _(items).slice(indexNumber).take(pageSize).value();
}
