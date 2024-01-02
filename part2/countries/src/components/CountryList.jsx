import Country from "./Country";
import { useState } from "react";

function CountryList({ countries, searchCountry }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const handleShowClick = (country) => {
    setSelectedCountry(country);
  };

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleShowClick(country)}>Show</button>
          </div>
        ))}
        {selectedCountry && <Country country={selectedCountry} />}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else {
    return <p>No matches found</p>;
  }
}

export default CountryList;
