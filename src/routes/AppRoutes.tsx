import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import CardsPage from '../pages/CardsPage';
import CardPage from '../pages/CardPage';
import FavoritesPage from '../pages/FavoritesPage';

const AppRoutes: FC = observer(() => {
  const routes = useRoutes([
    {
      path: '/',
      element: <CardsPage type="character" />,
    },
    {
      path: '/characters',
      element: <CardsPage type="character" />,
    },
    {
      path: '/comics',
      element: <CardsPage type="comic" />,
    },
    {
      path: '/characters/:id',
      element: <CardPage type="character" />,
    },
    {
      path: '/comics/:id',
      element: <CardPage type="comic" />,
    },
    {
      path: '/favorites',
      element: <FavoritesPage />,
    },
  ]);

  return routes;
});

export default AppRoutes;
