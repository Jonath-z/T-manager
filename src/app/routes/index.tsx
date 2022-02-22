import Login from '../initials/Login';
import { useRoutes } from 'react-router-dom';
import Home from '../initials/Home';

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/home',
      element: <Home />,
    },
  ]);

  return routes;
};

export default AppRoutes;
