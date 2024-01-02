function Filter({ handleSearchChange }) {
  return (
    <div>
      <label>Search: </label>
      <input type="text" onChange={(e) => handleSearchChange(e.target.value)} />
    </div>
  );
}

export default Filter;
