import { FC } from 'react';
import { Character, Comic } from '../../types/dataTypes';
import classes from './Card.module.scss';

interface CardProps {
  item: Character | Comic;
  onClick: (item: Character | Comic) => void;
}

const Card: FC<CardProps> = ({ item, onClick }) => {
  const imageUrl = `${item.thumbnail.path}.${item.thumbnail.extension}`;

  return (
    <div onClick={() => onClick(item)} className={classes.card}>
      <div className={classes.image} style={{ background: `url(${imageUrl})` }}></div>
      <div className={classes.content}>
        <h3 className={classes.title}>{'name' in item ? item.name : item.title}</h3>
        <p className={classes.description}>{item.description ? item.description : "No description provided"}</p>
      </div>
    </div>
  );
};

export default Card;
