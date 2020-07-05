// test용 로컬 API
const endpoint = process.env.API_ENDPOINT
    ? `${process.env.API_ENDPOINT}`
    : 'http://localhost:3000';

export default {
    todos: `${endpoint}/api/todos`,
    todo: id => `${endpoint}/api/todos/${id}`
};
