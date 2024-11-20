import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import PageTitle from '../components/PageTitle/PageTitle';
import Search from '../components/Search/Search';
import Divider from '../components/Divider/Divider';
import CardSection from '../components/CardSection/CardSection';
import Loading from '../components/Loading/Loading';
import Pagination from '../components/Pagination/Pagination';
import PostsStore from '../stores/PostsStore';

interface CardsPageProps {
  type: 'character' | 'comic';
}

const CardsPage: FC<CardsPageProps> = observer(({ type }) => {
  const { loading } = PostsStore;

  useEffect(() => {
    PostsStore.resetSearch();
    if (type === 'character') {
      PostsStore.getTotalCharacters();
    } else if (type === 'comic') {
      PostsStore.getTotalComics();
    }
    PostsStore.getPostsList('', type);
  }, [type]);

  const totalPages = Math.ceil(
    (type === 'character' ? PostsStore.totalCharacters : PostsStore.totalComics) /
      PostsStore.pageSize,
  );

  return (
    <div className="container">
      <PageTitle
        title={type === 'character' ? 'Characters' : 'Comics'}
        subtitle={`${type === 'character' ? PostsStore.totalCharacters : PostsStore.totalComics}`}
      />

      <Search
        placeholder={type === 'character' ? 'Search for Characters' : 'Search for Comics'}
        type={type}
      />

      <Divider />

      {loading || (PostsStore.characters.length === 0 && PostsStore.comics.length === 0) ? (
        <Loading />
      ) : (
        <>
          <CardSection
            pageName={type === 'character' ? 'characters' : 'comics'}
            items={type === 'character' ? PostsStore.characters : PostsStore.comics}
          />
          <Divider />
          <Pagination
            currentPage={PostsStore.currentPage}
            totalPages={totalPages}
            onNext={() => PostsStore.loadNextPage(type)}
            onPrevious={() => PostsStore.loadPreviousPage(type)}
            onLastPage={() => PostsStore.loadToLastPage(type)}
            onFirstPage={() => PostsStore.loadToFirstPage(type)}
            onPageChange={(page) => {
              PostsStore.currentPage = page;
              PostsStore.getPostsList(PostsStore.searchTerm, type);
            }}
          />
        </>
      )}
    </div>
  );
});

export default CardsPage;
