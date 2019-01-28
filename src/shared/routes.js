import Home from './Home';
import Grid from './Grid';
import fetchPopularReops from './api';

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
        fetchInitialData: (path = '') => fetchPopularReops(path.split('/').pop())
    }
];

export default routes;