import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import Results from './Results';
import { SearchIcon, LucideLoader } from 'lucide-react';
import Input from '../UI/Input';

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
      <Input
        label={loading ? <LucideLoader className="animate-spin" /> : <SearchIcon></SearchIcon>}
        value={searchValue}
        name={'searchbar'}
        onChange={handleInputChange}
        placeholder={'Search movie or show...'}
        type={'text'}
      ></Input>
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
