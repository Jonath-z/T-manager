import React from 'react';

const SearchBar = () => {
  return (
    <div className="text-center mx-8 py-2">
      <input
        type="search"
        placeholder="&#x1F50E; Search"
        className="w-full py-3 px-5 rounded-lg bg-slate-600 text-white font-Mulish"
      />
    </div>
  );
};

export default SearchBar;
