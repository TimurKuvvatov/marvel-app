import React, { FC, useEffect, useState } from 'react';
import classes from './CardPage.module.scss';
import { useParams } from 'react-router';
import { Character, Comic } from '../types/dataTypes';
import { mockCharacters, mockComics } from '../data/mockData';
import { Link } from 'react-router-dom';

interface CardPageProps {
  items: (Character | Comic)[];
  type: 'character' | 'comic';
}

const CardPage: FC<CardPageProps> = ({ items, type }) => {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<Character | Comic | null>(null);

  useEffect(() => {
    if (params.id) {
      const id = parseInt(params.id);
      const foundItem = items.find((i) => i.id === id);
      setItem(foundItem || null);
    }
  }, [params.id]);

  if (!item) {
    return <h2>{type === 'character' ? 'Character not found' : 'Comic not found'}</h2>;
  }
  const relatedItems =
    type === 'character' ? (item as Character).comics : (item as Comic).characters;

  if (!relatedItems) {
    return null;
  }
  return (
    <div className={classes.item}>
      <div className={classes.image} style={{ background: `url(${item.image})` }}></div>
      <div className={classes.content}>
        <div className={classes.info}>
          <h2 className={classes.title}>{item.name}</h2>
          <p className={classes.description}>{item.description}</p>
        </div>
        <div className={classes.comics}>
          <h2 className={classes.title}>{type === 'character' ? 'Comics' : 'Characters'}</h2>
          <ul>
            {(type === 'character' ? (item as Character).comics : (item as Comic).characters).map(
              (relatedId) => {
                const relatedItem = (type === 'character' ? mockComics : mockCharacters).find(
                  (c) => c.id === relatedId,
                );
                return (
                  <li key={`${type}-${relatedId}`}>
                    <Link to={`/${type === 'character' ? 'comics' : 'characters'}/${relatedId}`}>
                      {relatedItem ? relatedItem.name : 'Unknown'}
                    </Link>
                  </li>
                );
              },
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
