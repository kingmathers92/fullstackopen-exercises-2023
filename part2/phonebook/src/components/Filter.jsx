export const Filter = (props) => {
  const { searchName, setSearchName } = props;

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };
  return (
    <div>
      <input value={searchName} onChange={handleSearchChange} />
    </div>
  );
};
