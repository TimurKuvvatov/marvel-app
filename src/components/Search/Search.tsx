import React, { FC, useState, useEffect } from 'react';
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

  useEffect(() => {
    if (debouncedSearchTerm) {
      PostsStore.getPostsList(debouncedSearchTerm, type);
    } else {
      PostsStore.resetSearch();
      setSearchTerm('');
      PostsStore.getPostsList(undefined, type);
    }
  }, [debouncedSearchTerm, type]);
  
  useEffect(() => {
    setSearchTerm('');
    PostsStore.resetSearch();
  }, [type]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    PostsStore.setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    PostsStore.setSearchTerm(searchTerm);
    PostsStore.getPostsList(searchTerm, type);
  };

  return (
    <form className={classes.search} onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder={`Search for ${placeholder} by Name`}
        className={classes.input}
        value={searchTerm}
        onChange={handleInputChange}
      />

      <button type="submit" className={classes.button}>
        {' '}
        SEARCH{' '}
      </button>
    </form>
  );
};

export default Search;
