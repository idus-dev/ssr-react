import Todos from '../client/pages/Todos';
import PrefetchExample from '../client/pages/PrefetchExample';

import api from '../client/api';

const ssrRoutes = [
    {
        path: '/todos',
        exact: true,
        component: Todos,
        initialState: {
            todos: () => api.todos.list()
        }
    },
    {
        path: '/prefetch',
        exact: true,
        component: PrefetchExample,
        initialData: {
            todos: () => api.todos.list()
        }
    }
];

export default ssrRoutes;
