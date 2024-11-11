import { FC, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import CardsPage from '../pages/CardsPage';
import CardPage from '../pages/CardPage';
import postsStore from '../stores/PostsStore';

const AppRoutes: FC = observer(() => {
  useEffect(() => {
    postsStore.getPostsList();
  }, []);

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
      element: <CardPage type="character" items={postsStore.characters} />,
    },
    {
      path: '/comics/:id',
      element: <CardPage type="comic" items={postsStore.comics} />,
    },
  ]);

  return routes;
});

export default AppRoutes;
