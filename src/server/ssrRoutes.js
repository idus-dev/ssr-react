import Todos from '../client/pages/Todos';
import api from '../client/api';

const ssrRoutes = [
    {
        path: '/todos',
        name: 'todos list',
        exact: true,
        component: Todos,
        initialState: {
            todos: () => api.todos.list()
        }
    }
];

export default ssrRoutes;
