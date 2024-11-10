import { FC, useMemo } from 'react';
import classes from './CardPage.module.scss';
import { useParams } from 'react-router';
import { Character, Comic } from '../types/dataTypes';
import { Link } from 'react-router-dom';
import { Item } from '../types/dataTypes';

interface CardPageProps {
  items: (Character | Comic)[];
  type: 'character' | 'comic';
}

const CardPage: FC<CardPageProps> = ({ items, type }) => {
  const params = useParams<{ id: string }>();

  const item = useMemo(() => {
    if (params.id) {
      const id = parseInt(params.id);
      return items.find((i) => i.id === id) || null;
    }
    return null;
  }, [params.id, items]);

  if (!item) {
    return <h2>{type === 'character' ? 'Character not found' : 'Comic not found'}</h2>;
  }

  const relatedItems: Item[] =
    type === 'character' ? (item as Character).comics.items : (item as Comic).characters.items;

  return (
    <div className={classes.item}>
      <div
        className={classes.image}
        style={{ background: `url(${item.thumbnail.path}.${item.thumbnail.extension})` }}
      ></div>
      <div className={classes.content}>
        <div className={classes.info}>
          <h2 className={classes.title}>
            {type === 'character' ? (item as Character).name : (item as Comic).title}
          </h2>
          <p className={classes.description}>{item.description}</p>
        </div>
        <div className={classes.comics}>
          <h2 className={classes.title}>{type === 'character' ? 'Comics' : 'Characters'}</h2>
          <ul>
            {relatedItems.map((relatedItem) => {
              const relatedId = relatedItem.resourceURI.split('/');
              const Id = relatedId[relatedId.length - 1];
              return (
                <li key={`${relatedItem.name}`}>
                  <Link to={`/${type === 'character' ? 'comics' : 'characters'}/${Id}`}>{relatedItem.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
