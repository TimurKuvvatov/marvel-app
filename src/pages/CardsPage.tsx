import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import PageTitle from '../components/PageTitle/PageTitle';
import Search from '../components/Search/Search';
import Divider from '../components/Divider/Divider';
import CardSection from '../components/CardSection/CardSection';
import Loading from '../components/Loading/Loading';
import postsStore from '../stores/PostsStore';
import { Character, Comic } from '../types/dataTypes';

interface CardsPageProps {
  type: 'character' | 'comic';
}

const CardsPage: FC<CardsPageProps> = observer(({ type }) => {
  const { loading } = postsStore;
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [filteredComics, setFilteredComics] = useState<Comic[]>([]);

  useEffect(() => {
    if (type === 'character') {
      setFilteredCharacters(postsStore.characters);
    } else {
      setFilteredComics(postsStore.comics);
    }
  }, [type]);

  const handleSearch = (results: (Character | Comic)[]) => {
    if (type === 'character') {
      setFilteredCharacters(results as Character[]);
    } else {
      setFilteredComics(results as Comic[]);
    }
  };

  return (
    <div className="container">
      <PageTitle
        title={type === 'character' ? 'Characters' : 'Comics'}
        subtitle={`${type === 'character' ? filteredCharacters.length : filteredComics.length}`}
      />
      <Search
        placeholder={type === 'character' ? 'Search for Characters' : 'Search for Comics'}
        type={type}
        onSearch={handleSearch}
      />
      <Divider />

      {loading ? (
        <Loading />
      ) : (
        <CardSection
          pageName={type === 'character' ? 'characters' : 'comics'}
          items={type === 'character' ? filteredCharacters : filteredComics}
        />
      )}
    </div>
  );
});

export default CardsPage;
