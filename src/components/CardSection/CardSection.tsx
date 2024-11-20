import { FC } from 'react';
import { Character, Comic } from '../../types/dataTypes';
import classes from './CardSection.module.scss';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

interface CardSectionProps {
  items: Character[] | Comic[];
  pageName: string;
  setFavCharacters?: (favorites: Character[]) => void;
  setFavComics?: (favorites: Comic[]) => void;
}

const CardSection: FC<CardSectionProps> = ({ items, pageName, setFavCharacters, setFavComics }) => {
  const navigate = useNavigate();

  const [favCharacters, setLocalFavCharacters] = useLocalStorage<Character[]>(
    `favorites-characters`,
    [],
  );
  const [favComics, setLocalFavComics] = useLocalStorage<Comic[]>(`favorites-comics`, []);

  const toggleFavorite = (item: Character | Comic) => {
    if ('name' in item) {
      const isFavorite = favCharacters.some((fav) => fav.id === item.id);
      const newFavorites = isFavorite
        ? favCharacters.filter((fav) => fav.id !== item.id)
        : [...favCharacters, item as Character];

      setLocalFavCharacters(newFavorites);
      if (setFavCharacters) {
        setFavCharacters(newFavorites);
      }
    } else {
      const isFavorite = favComics.some((fav) => fav.id === item.id);
      const newFavorites = isFavorite
        ? favComics.filter((fav) => fav.id !== item.id)
        : [...favComics, item as Comic];

      setLocalFavComics(newFavorites);
      if (setFavComics) {
        setFavComics(newFavorites);
      }
    }
  };

  return (
    <div className={classes.cardSection}>
      {items.map((item) => {
        const isFavorite =
          'name' in item
            ? favCharacters.some((fav) => fav.id === item.id)
            : favComics.some((fav) => fav.id === item.id);

        return (
          <Card
            key={`${pageName}-${item.id}`}
            onClick={() => navigate(`/${pageName}/${item.id}`)}
            item={item}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        );
      })}
    </div>
  );
};

export default CardSection;
