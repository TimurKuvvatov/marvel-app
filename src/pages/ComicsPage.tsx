import React, { FC } from 'react'
import PageTitle from '../components/PageTitle/PageTitle'
import { Comic } from '../types/dataTypes'
import Search from '../components/Search/Search';
import Divider from '../components/Divider/Divider';
import CardSection from '../components/CardSection/CardSection';

interface ComicsPageProps {
    comics: Comic[];
}

const ComicsPage: FC<ComicsPageProps>= ({comics}) => {
  return (
    <>
      <PageTitle title="Comics" subtitle={`${comics.length}`} />
      <Search placeholder='Comics'/>
      <Divider />
      <CardSection items={comics} />
    </>
  )
}

export default ComicsPage