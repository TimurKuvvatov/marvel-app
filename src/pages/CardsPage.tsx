import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import PostsStore from '../stores/PostsStore';

import PageTitle from '../components/PageTitle/PageTitle';
import Divider from '../components/Divider/Divider';
import Search from '../components/Search/Search';
import InfinityCardSection from '../components/InfinityCardSection/InfinityCardSection';

interface CardsPageProps {
  type: 'character' | 'comic';
}

const CardsPage: FC<CardsPageProps> = observer(({ type }) => {
  const { comics, characters } = PostsStore;
  useEffect(() => {
    PostsStore.resetSearch();
    if (type === 'character') {
      PostsStore.getTotalCharacters();
    } else if (type === 'comic') {
      PostsStore.getTotalComics();
    }
  }, [type]);

  return (
    <div className="container">
      <PageTitle
        title={type === 'character' ? 'Characters' : 'Comics'}
        subtitle={`${type === 'character' ? PostsStore.totalCharacters : PostsStore.totalComics}`}
      />
      <Search type={type} placeholder={type} />
      <Divider />
      <InfinityCardSection items={type === 'character' ? characters : comics} pageName={type} />
      <Divider />
    </div>
  );
});

export default CardsPage;
