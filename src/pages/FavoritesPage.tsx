import { FC } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import useLocalStorage from '../hooks/useLocalStorage';
import { Character, Comic } from '../types/dataTypes';
import FavoritesSection from '../components/FavoritesSection/FavoritesSection';

const FavoritesPage: FC = () => {
  const [favCharacters, setFavCharacters] = useLocalStorage<Character[]>(
    'favorites-characters',
    [],
  );
  const [favComics, setFavComics] = useLocalStorage<Comic[]>('favorites-comics', []);

  return (
    <div className="container">
      <PageTitle title="Favorites" subtitle={`${favComics.length + favCharacters.length}`} />
      <FavoritesSection
        title="Characters"
        items={favCharacters}
        pageName="characters"
        setFavCharacters={setFavCharacters}
      />
      <FavoritesSection
        title="Comics"
        items={favComics}
        pageName="comics"
        setFavComics={setFavComics}
      />
    </div>
  );
};

export default FavoritesPage;
