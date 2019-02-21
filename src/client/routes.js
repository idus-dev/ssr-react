import Home from './pages/Home';
import Grid from './pages/Grid';
import fetchPopularRepos from './api';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/popular/:id',
        exact: true,
        component: Grid,
        fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
    }
];

export default routes;