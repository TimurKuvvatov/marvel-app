import { FC } from 'react';
import { Character, Comic } from '../../types/dataTypes';
import classes from './CardSection.module.scss';
import Card from '../Card/Card';
import { useNavigate } from 'react-router-dom';
interface CardSectionProps {
  items: Character[] | Comic[];
  pageName: string;
}
const CardSection: FC<CardSectionProps> = ({ items, pageName }) => {
  const navigate = useNavigate();
  return (
    <section className={classes.cardSection}>
      {items.map((item) => (
        <Card key={`${pageName}-${item.id}`} onClick={() => navigate(`/${pageName}/${item.id}`)} item={item} />
      ))}
    </section>
  );
};

export default CardSection;
