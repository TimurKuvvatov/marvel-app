import React from 'react';
import { useRoutes } from 'react-router-dom';

import CharactersPage from '../pages/CharactersPage';
import ComicsPage from '../pages/ComicsPage';
import { mockCharacters, mockComics } from '../data/mockData';

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <CharactersPage characters={mockCharacters} />,
    },
    {
      path: 'comics',
      element: <ComicsPage comics={mockComics} />,
    },
  ]);

  return routes;
};

export default AppRoutes;
