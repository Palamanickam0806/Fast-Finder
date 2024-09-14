import React, { useState, useEffect } from 'react';
import countriesData from '../data.json'; // Adjust the path based on your file structure
import './search-box.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const results = countriesData.filter(country =>
        country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(results);
    } else {
      setFilteredCountries([]);
    }
  }, [searchTerm]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by country name or capital"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCountries.length > 0 && (
        <ul className="search-results">
          {filteredCountries.map((country) => (
            <li key={country.country}>
              <strong>{country.country}</strong>
              <div>
                Capital: {country.capital} <br />
                Population: {country.population.toLocaleString()} <br />
                Official Language(s): {Array.isArray(country.official_language) ? country.official_language.join(', ') : country.official_language} <br />
                Currency: {country.currency}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
