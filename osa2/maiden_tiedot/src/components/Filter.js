import React from 'react'

const Filter = ({ setSearch, handleSearchChange }) => {
    return (
      <div>Filter countries: <input value={setSearch} onChange={handleSearchChange} /></div>
    )
  }

  export default Filter