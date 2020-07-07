import Todos from '../client/pages/Todos';
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
        // 렌더링 전에 필요한 가져와야할 초기 데이터
        initialData: {
            todo: id => {
                return api.todos.detail(id);
            }
        },
        // 초기 렌더링시 필요한 스토어 데이터
        initialState: {
            // state name => action api
            todos: () => api.todos.list()
        }
    }
];

export default ssrRoutes;
