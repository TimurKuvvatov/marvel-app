import React, { FC } from 'react';
import { Character, Comic } from '../../types/dataTypes';
import classes from './Card.module.scss';
interface CardProps {
  item: Character | Comic;
}

const Card: FC<CardProps> = ({ item: { image, name, description } }) => {
  return (
    <div className={classes.card}>
      <div className={classes.image} style={{background: `url(${image})`}}></div>
      <div className={classes.content}>
        <h3 className={classes.title}>{name}</h3>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
