import Main from './pages/Main';
import Todos from './pages/Todos';
import api from './api';

const routes = [
    { path: '/', name: 'main', exact: true, component: Main },
    {
        path: '/todos',
        name: 'todos list',
        exact: true,
        component: Todos,
        preloadState: {
            todos: () => api.todos.list()
        }
    }
];

export default routes;
