import Main from './pages/Main';
import Message from './pages/Message';

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
    }
];

export default routes;