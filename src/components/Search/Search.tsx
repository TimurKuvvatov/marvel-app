import React, { FC, useState, useEffect } from 'react';
import classes from './Search.module.scss';
import useDebounce from '../../hooks/useDebounce';
import PostsStore from '../../stores/PostsStore';
import { Character, Comic } from '../../types/dataTypes';

interface SearchProps {
  placeholder: string;
  type: 'character' | 'comic';
  onSearch: (results: (Character | Comic)[]) => void; 
}

const Search: FC<SearchProps> = ({ placeholder, type, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const itemsToFilter = type === 'character' ? PostsStore.characters : PostsStore.comics;
  const filteredResults = PostsStore.filterPosts(itemsToFilter, debouncedSearchTerm);
  useEffect(() => {
    onSearch(filteredResults);
  }, [filteredResults]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(filteredResults);
  };

  return (
    <form className={classes.search} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder={`Search for ${placeholder} by Name`}
        className={classes.input}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className={classes.button}>
        SEARCH
      </button>
    </form>
  );
};

export default Search;
