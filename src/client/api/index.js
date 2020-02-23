import axios from 'axios';
import endpoints from './endpoints';

export default {
    todos: {
        list: () => axios.get(endpoints.todos).then(res => res.data),
        post: text =>
            axios.post(endpoints.todos, { text }).then(res => res.data)
    }
};
