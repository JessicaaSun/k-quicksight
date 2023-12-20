import React from "react";

const SearchField = (onChange, value, text) => {
  return (
    <input
      id="searchQueryInput"
      type="text"
      name="searchQueryInput"
      placeholder={text}
      className="w-full h-11 bg-gray-200 outline-none border-none rounded-full px-6 text-base"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchField;
