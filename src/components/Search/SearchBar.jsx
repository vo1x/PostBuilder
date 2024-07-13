import { useEffect, useState } from 'react';
import Input from '../UI/Input';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import Results from './Results';

function SearchBar({ setFormData }) {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue] = useDebounce(searchValue, 1000);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    const url = `/search?query=${query}`;
    const { data } = await axios.get(url);
    setSearchResults(data);
  };

  useEffect(() => {
    if (debouncedValue !== '') {
      handleSearch(searchValue);
    }
  }, [debouncedValue]);

  return (
    <div>
      <input
        value={searchValue}
        name={'searchbar'}
        onChange={handleInputChange}
        placeholder={'Search movie or show...'}
        type={'text'}
        className={`text-md w-80 rounded-lg bg-[#1C1C1E] p-2 outline-none transition-all duration-300 placeholder:text-[#9A9A9C] `}
      ></input>

      {searchResults && searchResults.length > 0 ? (
        <Results
          setFormData={setFormData}
          searchResults={searchResults}
          searchValue={searchValue}
        ></Results>
      ) : null}
    </div>
  );
}

export default SearchBar;
