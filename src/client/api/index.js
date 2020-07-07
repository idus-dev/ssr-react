import axios from 'axios';
import endpoints from './endpoints';

export default {
    todos: {
        list: () => axios.get(endpoints.todos).then(res => res.data),
        detail: id => axios.get(endpoints.todo(id)).then(res => res.data),
        post: payload =>
            axios.post(endpoints.todos, payload).then(res => res.data)
    }
};
