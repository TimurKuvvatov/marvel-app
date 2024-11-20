import React, { FC } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import Divider from '../components/Divider/Divider';
import CardSection from '../components/CardSection/CardSection';
import useLocalStorage from '../hooks/useLocalStorage';
import { Character, Comic } from '../types/dataTypes';

const FavoritesPage: FC = () => {
  const [favCharacters] = useLocalStorage<Character[]>('favorites-characters', []);
  const [favComics] = useLocalStorage<Comic[]>('favorites-comics', []);
  return (
    <div className="container">
      <PageTitle title="Favorites" subtitle={`${favComics.length + favCharacters.length}`} />
      <Divider />
      <section>
        <h2>Characters</h2>
        {favCharacters.length !== 0 ? (
          <CardSection items={favCharacters} pageName="comics" />
        ) : (
          <div>You don't have favorites characters</div>
        )}
      </section>
      <Divider />
      <section>
        <h2>Comics</h2>
        {favComics.length !== 0 ? (
          <CardSection items={favComics} pageName="comics" />
        ) : (
          <div>You don't have favorites comics</div>
        )}
      </section>
      <Divider />
    </div>
  );
};

export default FavoritesPage;
