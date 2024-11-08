import React, { FC, useState } from 'react';
import classes from './Search.module.scss';
import useDebounce from '../../hooks/useDebounce';
import PostsStore from '../../stores/PostsStore';

interface SearchProps {
  placeholder: string;
  type: 'character' | 'comic';
}

const Search: FC<SearchProps> = ({ placeholder, type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearch = () => {
    if (type === 'character') {
      PostsStore.fetchCharacters(0, debouncedSearchTerm);
    } else {
      PostsStore.fetchComics(0, debouncedSearchTerm);
    }
  };

  return (
    <div className={classes.search}>
      <input 
        type="text" 
        placeholder={`Search for ${placeholder} by Name`} 
        className={classes.input} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button className={classes.button} onClick={handleSearch}>SEARCH</button>
    </div>
  );
};

export default Search;