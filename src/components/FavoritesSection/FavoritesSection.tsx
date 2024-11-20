import { FC } from 'react';
import { Character, Comic } from '../../types/dataTypes';

import CardSection from '../CardSection/CardSection';
import Divider from '../Divider/Divider';

interface FavoritesSectionProps {
  title: string;
  items: Character[] | Comic[];
  pageName: string;
  setFavCharacters?: (items: Character[]) => void;
  setFavComics?: (items: Comic[]) => void;
}

const FavoritesSection: FC<FavoritesSectionProps> = ({
  title,
  items,
  pageName,
  setFavCharacters,
  setFavComics,
}) => {
  return (
    <section>
      <h2>{title}</h2>
      {items.length !== 0 ? (
        <CardSection
          items={items}
          pageName={pageName}
          setFavCharacters={setFavCharacters}
          setFavComics={setFavComics}
        />
      ) : (
        <div>You don't have favorite {title.toLowerCase()}</div>
      )}
      <Divider />
    </section>
  );
};

export default FavoritesSection;
