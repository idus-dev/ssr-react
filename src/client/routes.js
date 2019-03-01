import Main from './pages/Main';
import Message from './pages/Message';
// import fetchPopularRepos from './api';

const routes = [
    {
        path: '/',
        exact: true,
        component: Main
    },
    {
        path: '/message',
        exact: true,
        component: Message
    },
    // {
    //     path: '/popular/:id',
    //     exact: true,
    //     component: Grid,
    //     fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
    // }
];

export default routes;