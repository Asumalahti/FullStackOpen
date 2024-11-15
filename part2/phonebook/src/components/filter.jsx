import React from 'react';

const Filter = ({ newSearch, handleSearchChange, toggleShowFiltered, showFiltered }) => {
  return (
    <div>
      filter shown with <input onChange={handleSearchChange} value={newSearch} />
      <button onClick={toggleShowFiltered}>
        show {showFiltered ? 'filtered' : 'all'}
      </button>
    </div>
  );
};

export default Filter;