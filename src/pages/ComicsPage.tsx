import React, { FC } from 'react';
import PageTitle from '../components/PageTitle/PageTitle';
import { Comic } from '../types/dataTypes';
import Search from '../components/Search/Search';
import Divider from '../components/Divider/Divider';
import CardSection from '../components/CardSection/CardSection';

interface ComicsPageProps {
  comics: Comic[];
}

const ComicsPage: FC<ComicsPageProps> = ({ comics }) => {
  return (
    <div className="container">
      <PageTitle title="Comics" subtitle={`${comics.length}`} />
      <Search placeholder="Comics" type="comic" />
      <Divider />
      <CardSection pageName="comics" items={comics} />
    </div>
  );
};

export default ComicsPage;
