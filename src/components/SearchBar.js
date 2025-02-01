import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      className="form-control w-50"
      placeholder="Search members..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
