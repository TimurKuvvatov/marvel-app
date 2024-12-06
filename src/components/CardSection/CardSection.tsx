import { FC } from 'react';
import classes from './CardSection.module.scss';
import { Character, Comic } from '../../types/dataTypes';
import { useNavigate } from 'react-router-dom';
import useFavorites from '../../hooks/useFavorites';

import Card from '../Card/Card';

interface CardSectionProps {
  items: Character[] | Comic[];
  pageName: string;
}

const CardSection: FC<CardSectionProps> = ({ items, pageName }) => {
  const navigate = useNavigate();
  const { favCharacters, favComics, toggleFavorite } = useFavorites();

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
