import { FC } from 'react';
import { Character, Comic } from '../../types/dataTypes';
import classes from './Card.module.scss';

interface CardProps {
  item: Character | Comic;
  isFavorite: boolean;
  onClick: (item: Character | Comic) => void;
  onToggleFavorite: (item: Character | Comic) => void;
}

const Card: FC<CardProps> = ({ item, isFavorite, onClick, onToggleFavorite }) => {
  const imageUrl = `${item.thumbnail.path}.${item.thumbnail.extension}`;

  return (
    <div onClick={() => onClick(item)} className={classes.card}>
      <div
        className={`${classes.heart} ${isFavorite ? classes.isFavorite : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(item);
        }}
      ></div>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}
      />
      <div className={classes.content}>
        <h3 className={classes.title}>{'name' in item ? item.name : item.title}</h3>
        <p className={classes.description}>
          {item.description ? item.description : 'No description provided'}
        </p>
      </div>
    </div>
  );
};

export default Card;
