import { FC } from 'react';
import { Character, Comic } from '../../types/dataTypes';
import classes from './Card.module.scss';
interface CardProps {
  item: Character | Comic;
  onClick: (item: Character | Comic) => void;
}

const Card: FC<CardProps> = ({ item, onClick }) => {
  return (
    <div onClick={() => onClick(item)} className={classes.card}>
      <div className={classes.image} style={{background: `url(${item.image})`}}></div>
      <div className={classes.content}>
        <h3 className={classes.title}>{item.name}</h3>
        <p className={classes.description}>{item.description}</p>
      </div>
    </div>
  );
};

export default Card;
