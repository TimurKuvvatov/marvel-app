import { FC } from 'react';
import { Character, Comic } from '../../types/dataTypes';
import classes from './CardSection.module.scss';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

interface CardSectionProps {
  items: Character[] | Comic[];
  pageName: string;
}

const CardSection: FC<CardSectionProps> = ({ items, pageName }) => {
  const navigate = useNavigate();

  const [favCharacters, setFavCharacters] = useLocalStorage<Character[]>(
    `favorites-characters`,
    [],
  );
  const [favComics, setFavComics] = useLocalStorage<Comic[]>(`favorites-comics`, []);

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
