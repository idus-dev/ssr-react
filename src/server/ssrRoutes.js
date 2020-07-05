import Todos from '../client/pages/Todos';
import PrefetchExample from '../client/pages/PrefetchExample';
import Page from '../client/pages/Page';

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
        path: '/todos/:id',
        exact: true,
        component: Page,
        initialData: {
            todo: id => {
                return api.todos.detail(id);
            }
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
