import NotFound from '../Components/Error/notFound';
import Login from '../Components/Login';
import Register from '../Components/Login/register';
import Home from '../Components/home';

const routes = [
  {
    path: '/login',
    component: Login,
    isPrivate: false,
  },
  {
    path: '/register',
    component: Register,
    isPrivate: false,
  },
  {
    path: '/',
    component: Home,
    isPrivate: true,
  },
  {
    path: '/*',
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
