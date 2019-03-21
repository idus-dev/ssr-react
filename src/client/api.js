import axios from 'axios';

export default {
    notification: () => axios.get('/api/notification').then(res => res.data),
    posts: () => axios.get('https://api.github.com/repos/7ylee/mdfiles/contents/posts').then(res => res.data)
};