import React from 'react';

const SearchForm = ({ onSubmit, onChange,handleSearchChange, newSearch }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Search: </label>
        <input type="text" value={newSearch} onChange={handleSearchChange} />
      </div>

    </form>
  );
};

export default SearchForm;
