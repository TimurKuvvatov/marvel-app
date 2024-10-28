import React, { FC } from 'react';
import { Character, Comic } from '../../types/dataTypes';
import classes from './CardSection.module.scss';
import Card from '../Card/Card';
interface CardSectionProps {
  items: Character[] | Comic[];
}
const CardSection: FC<CardSectionProps> = ({ items }) => {
  return (
    <section className={classes.cardSection}>
      {items.map((item) => (
        <Card item={item} />
      ))}
    </section>
  );
};

export default CardSection;
