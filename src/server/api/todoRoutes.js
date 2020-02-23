import { Router } from 'express';

const todoRoutes = () => {
    const router = new Router();
    const todos = [{ id: 1, text: 'server-fetched todo' }];

    router.get('/api/todos', (_req, res) => {
        setTimeout(() => {
            res.json(todos);
        }, 300);
    });

    router.post('/api/todos', (req, res) => {
        const newTodo = req.body;
        newTodo.id = Date.now();

        todos.push(newTodo);

        setTimeout(() => {
            res.json(newTodo);
        }, 100);
    });

    return router;
};

export default todoRoutes;
