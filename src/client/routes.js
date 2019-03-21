import Main from './pages/Main';
import Message from './pages/Message';
import Prefetch from './pages/Prefetch';
import api from './api';

const routes = [
    {
        path: '/',
        exact: true,
        component: Main,
    },
    {
        path: '/message',
        exact: true,
        component: Message
    },
    {
        path: '/prefetch',
        exact: true,
        component: Prefetch,
        preFetch: api.posts
    },

];

export default routes;