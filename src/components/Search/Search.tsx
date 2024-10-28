import React, { FC } from 'react'
import classes from './Search.module.scss'

interface SearchProps {
  placeholder: string
}
const Search: FC<SearchProps> = ({placeholder}) => {
  return (
    <div className={classes.search}>
        <input type="text" placeholder={`Search for ${placeholder} by Name`} className={classes.input} />
        <button className={classes.button}>SEARCH</button>
    </div>
  )
}

export default Search