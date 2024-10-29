import React from 'react';
import { useRoutes } from 'react-router-dom';
import CharactersPage from '../pages/CharactersPage';
import ComicsPage from '../pages/ComicsPage';
import { mockCharacters, mockComics } from '../data/mockData';
import CardPage from '../pages/CardPage';

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <CharactersPage characters={mockCharacters} />,
    },
    {
      path: 'characters/:id',
      element: <CardPage type="character" items={mockCharacters} />,
    },
    {
      path: 'comics',
      element: <ComicsPage comics={mockComics} />,
    },
    {
      path: 'comics/:id',
      element: <CardPage type="comic" items={mockComics} />,
    },
  ]);

  return routes;
};

export default AppRoutes;
