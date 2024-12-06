import { Character, Comic } from '../types/dataTypes';
import useLocalStorage from '../hooks/useLocalStorage';

const useFavorites = () => {
  const [favCharacters, setFavCharacters] = useLocalStorage<Character[]>(
    'favorites-characters',
    [],
  );
  const [favComics, setFavComics] = useLocalStorage<Comic[]>('favorites-comics', []);

  const toggleFavorite = (item: Character | Comic) => {
    if ('name' in item) {
      const isFavorite = favCharacters.some((fav) => fav.id === item.id);
      const newFavorites = isFavorite
        ? favCharacters.filter((fav) => fav.id !== item.id)
        : [...favCharacters, item as Character];

      setFavCharacters(newFavorites);
    } else {
      const isFavorite = favComics.some((fav) => fav.id === item.id);
      const newFavorites = isFavorite
        ? favComics.filter((fav) => fav.id !== item.id)
        : [...favComics, item as Comic];

      setFavComics(newFavorites);
    }
  };

  return {
    favCharacters,
    favComics,
    toggleFavorite,
  };
};

export default useFavorites;
