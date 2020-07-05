import { Router } from 'express';

const todoRoutes = () => {
    const router = new Router();
    const todos = [
        { id: 1593955883477, text: 'server-fetched todo 1' },
        { id: 1593955883478, text: 'server-fetched todo 2' },
        { id: 1593955883479, text: 'server-fetched todo 3' }
    ];

    router.get('/api/todos', (req, res) => {
        setTimeout(() => {
            res.json(todos);
        }, 200);
    });

    router.get('/api/todos/:id', (req, res) => {
        setTimeout(() => {
            const { id } = req.params;
            const result = {};

            todos.forEach(element => {
                if (element.id === parseInt(id, 10)) {
                    result.text = element.text;
                }
            });

            res.json(result);
        }, 200);
    });

    router.post('/api/todos', (req, res) => {
        const newTodo = req.body;
        newTodo.id = Date.now();

        todos.push(newTodo);

        setTimeout(() => {
            res.json(newTodo);
        }, 200);
    });

    return router;
};

export default todoRoutes;
