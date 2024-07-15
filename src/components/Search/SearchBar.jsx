import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import Results from './Results';
import { SearchIcon, LucideLoader } from 'lucide-react';

function SearchBar({ setFormData }) {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue] = useDebounce(searchValue, 1000);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    setLoading(true);
    const url = `/search?query=${query}`;
    const { data } = await axios.get(url);
    setLoading(false);
    setSearchResults(data);
  };

  useEffect(() => {
    if (debouncedValue !== '') {
      handleSearch(searchValue);
    }
  }, [debouncedValue]);

  return (
    <div>
      <div className="flex items-center ">
        <div className="rounded-l-lg bg-[#1C1C1E] p-2 text-neutral-400">
          {loading ? <LucideLoader className="animate-spin" /> : <SearchIcon></SearchIcon>}
        </div>
        <input
          value={searchValue}
          name={'searchbar'}
          onChange={handleInputChange}
          placeholder={'Search movie or show...'}
          type={'text'}
          className={`text-md w-72 rounded-r-lg bg-[#1C1C1E] p-2 outline-none transition-all duration-300 placeholder:text-[#9A9A9C] `}
        ></input>
      </div>

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
