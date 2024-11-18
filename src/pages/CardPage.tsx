import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import classes from './CardPage.module.scss';
import { Character, Comic, Item } from '../types/dataTypes';
import Loading from '../components/Loading/Loading';
import PostsStore from '../stores/PostsStore';

interface CardPageProps {
  type: 'character' | 'comic';
}

const CardPage: FC<CardPageProps> = observer(({ type }) => {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<null | (Character | Comic)>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        try {
          const id = parseInt(params.id);
          const fetchedItem = await PostsStore.getDetails(id, type);
          setItem(fetchedItem);
        } catch (error) {
          console.error('Failed to fetch item details:', error);
          setItem(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [params.id, type]);

  if (loading || !item) {
    return <Loading />;
  }

  const relatedItems: Item[] =
    type === 'character' && 'comics' in item
      ? (item as Character).comics.items
      : type === 'comic' && 'characters' in item
      ? (item as Comic).characters.items
      : [];

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
          <p className={classes.description}>{item.description || 'No description provided'}</p>
        </div>
        <div className={classes.comics}>
          <h2 className={classes.title}>{type === 'character' ? 'Comics' : 'Characters'}</h2>
          <ul>
            {relatedItems.length
              ? relatedItems.map((relatedItem) => {
                  const relatedId = relatedItem.resourceURI.split('/');
                  const Id = relatedId[relatedId.length - 1];
                  return (
                    <li key={`${relatedItem.name}`}>
                      <Link to={`/${type === 'character' ? 'comics' : 'characters'}/${Id}`}>
                        {relatedItem.name}
                      </Link>
                    </li>
                  );
                })
              : 'Will appear later'}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default CardPage;
