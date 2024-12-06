import React, { FC, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import classes from './Search.module.scss';
import useDebounce from '../../hooks/useDebounce';
import PostsStore from '../../stores/PostsStore';

interface SearchProps {
  placeholder: string;
  type: 'character' | 'comic';
}

const Search: FC<SearchProps> = observer(({ placeholder, type }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 3000);
  const isLoading = PostsStore.loading;

  useEffect(() => {
    if (debouncedSearchTerm) {
      PostsStore.currentPage = 0;
      if (type === 'character') {
        PostsStore.characters = [];
      } else if (type === 'comic') {
        PostsStore.comics = [];
      }
      PostsStore.getPostsList(debouncedSearchTerm, type);
    } else {
      PostsStore.resetSearch();
      PostsStore.getPostsList(undefined, type);
    }
  }, [debouncedSearchTerm, type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    PostsStore.setSearchTerm(e.target.value);
  };

  return (
    <form className={classes.search} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder={`Search for ${placeholder} by Name`}
        className={classes.input}
        value={searchTerm}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <button type="submit" className={classes.button} disabled={isLoading}>
        SEARCH
      </button>
    </form>
  );
});

export default Search;
