import { FC } from 'react';
import useFavorites from '../hooks/useFavorites';

import PageTitle from '../components/PageTitle/PageTitle';
import FavoritesSection from '../components/FavoritesSection/FavoritesSection';

const FavoritesPage: FC = () => {
  const { favCharacters, favComics } = useFavorites();
  return (
    <div className="container">
      <PageTitle title="Favorites" subtitle={`${favComics.length + favCharacters.length}`} />
      <FavoritesSection title="Characters" items={favCharacters} pageName="characters" />
      <FavoritesSection title="Comics" items={favComics} pageName="comics" />
    </div>
  );
};

export default FavoritesPage;
