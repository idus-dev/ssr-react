import axios from 'axios';

export default {
    notification: () => axios.get('/api/notification').then(res => res.data),
};