import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchFieldKQS = ({ onChange, value, placeholder, width, height }) => {
  return (
    <div className={`relative ${width ? `w-[${width}]` : "w-full"}`}>
      <div className="absolute w-full z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <AiOutlineSearch size={20} className="text-gray-400 font-semibold" />
      </div>
      <input
        id="searchQueryInput"
        type="text"
        name="searchQueryInput"
        placeholder={placeholder}
        className={`w-full dark:text-white h-[${height}] dark:bg-dark-bg outline-third-color  border-[1px] border-gray-300 rounded-lg px-9 text-base`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchFieldKQS;
