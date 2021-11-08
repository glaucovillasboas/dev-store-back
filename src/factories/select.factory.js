/* eslint import/prefer-default-export: "off" */
const selectFactory = (table, where) => {
  let query = `SELECT * FROM ${table}`;
  if (where) { query += ` WHERE ${where}`; }
  return query;
};

export {
  selectFactory,
};
