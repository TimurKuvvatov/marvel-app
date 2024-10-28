import React, { FC } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import { Character } from '../types/dataTypes';
import CardSection from '../components/CardSection/CardSection';

interface CharactersPageProps {
  characters: Character[];
}
const CharactersPage: FC<CharactersPageProps> = ({ characters }) => {
  return (
    <>
      <PageTitle title="Characters" subtitle={`${characters.length}`} />
      <CardSection items={characters} />
    </>
  );
};

export default CharactersPage;
