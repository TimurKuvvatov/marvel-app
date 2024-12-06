import { FC, forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid } from 'react-virtuoso';
import { Character, Comic } from '../../types/dataTypes';
import Card from '../Card/Card';
import useFavorites from '../../hooks/useFavorites';
import { useNavigate } from 'react-router-dom';
import PostsStore from '../../stores/PostsStore';
import Loading from '../Loading/Loading';
import classes from './InfinityCardSection.module.scss';

interface InfinityCardSectionProps {
  items: Character[] | Comic[];
  pageName: string;
}

const gridComponents = {
  List: forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(({ style, children }, ref) => (
    <div ref={ref} className={classes.gridComponents} style={{ ...style }}>
      {children}
    </div>
  )),
  Footer: observer(() => <>{PostsStore.loading ? <Loading /> : null}</>),
};

const InfinityCardSection: FC<InfinityCardSectionProps> = observer(({ items, pageName }) => {
  const { favCharacters, favComics, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const loadMoreItems = async () => {
    if (!PostsStore.loading) {
      await PostsStore.loadMoreItems(pageName === 'character' ? 'character' : 'comic');
    }
  };

  return (
    <VirtuosoGrid
      style={{ height: 'calc(100vh - 440px)' }}
      totalCount={items.length}
      components={gridComponents}
      itemContent={(index) => {
        const item = items[index];
        const isFavorite =
          'name' in item
            ? favCharacters.some((fav) => fav.id === item.id)
            : favComics.some((fav) => fav.id === item.id);

        return (
          <Card
            key={item.id}
            onClick={() => navigate(`/${pageName}s/${item.id}`)}
            item={item}
            isFavorite={isFavorite}
            onToggleFavorite={() => toggleFavorite(item)}
          />
        );
      }}
      endReached={loadMoreItems}
    />
  );
});

export default InfinityCardSection;
