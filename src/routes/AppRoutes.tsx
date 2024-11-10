import { FC, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import CharactersPage from '../pages/CharactersPage';
import ComicsPage from '../pages/ComicsPage';
import CardPage from '../pages/CardPage';
import postsStore from '../stores/PostsStore';

const AppRoutes: FC = observer(() => {
  useEffect(() => {
    postsStore.getPostsList();
  }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: <CharactersPage characters={postsStore.characters} />,
    },
    {
      path: 'characters/:id',
      element: <CardPage type="character" items={postsStore.characters} />,
    },
    {
      path: 'comics',
      element: <ComicsPage comics={postsStore.comics} />,
    },
    {
      path: 'comics/:id',
      element: <CardPage type="comic" items={postsStore.comics} />,
    },
  ]);

  return routes;
});

export default AppRoutes;
