import { FC } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import { Character } from '../types/dataTypes';
import CardSection from '../components/CardSection/CardSection';
import Search from '../components/Search/Search';
import Divider from '../components/Divider/Divider';

interface CharactersPageProps {
  characters: Character[];
}
const CharactersPage: FC<CharactersPageProps> = ({ characters }) => {
  return (
    <div className="container">
      <PageTitle title="Characters" subtitle={`${characters.length}`} />
      <Search placeholder="Characters" />
      <Divider />
      <CardSection pageName="characters" items={characters} />
    </div>
  );
};

export default CharactersPage;
