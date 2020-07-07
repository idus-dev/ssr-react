import { Router } from 'express';

const todoRoutes = () => {
    const router = new Router();
    const todos = [
        {
            id: 1593955883477,
            title: 'Lorem 100',
            content:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates reprehenderit eveniet ex delectus ipsum blanditiis veritatis quo, recusandae itaque, id, enim consequuntur eos non. Tempore consequuntur alias vel perspiciatis labore repudiandae optio quisquam deleniti corporis harum, deserunt ipsum molestias eius facere ea soluta aperiam voluptatem, unde nisi? Eligendi nobis rerum sunt eum amet id rem libero, asperiores sequi voluptas eius dolorem error alias quas minima, aperiam dolorum inventore maiores ab, tempore sed. Ut suscipit recusandae ullam blanditiis eum voluptatum tempora cumque cum corrupti illo laborum odit ipsam dicta magni aliquid et vel autem, a natus numquam debitis. Doloremque, eius qui?'
        },
        {
            id: 1593955883478,
            title: 'Lorem 50',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid labore quod sed maxime minima vero sit illo voluptatem similique autem, sunt, saepe quis repellat optio fugiat! Quam quasi assumenda eaque provident necessitatibus fuga accusantium blanditiis dolorum consequatur, similique dolores quidem dignissimos esse, cupiditate ratione nihil? Numquam provident dolorem obcaecati facilis?'
        },
        {
            id: 1593955883479,
            title: 'Lorem 30',
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam suscipit vero consectetur ea sed, qui ex saepe asperiores, porro non tenetur fugiat nostrum est inventore dolor incidunt illum, mollitia labore.'
        }
    ];

    router.get('/api/todos', (req, res) => {
        setTimeout(() => {
            res.json(todos);
        }, 200);
    });

    router.get('/api/todos/:id', (req, res) => {
        setTimeout(() => {
            const { id } = req.params;
            let result = {};

            todos.forEach(element => {
                if (element.id === parseInt(id, 10)) {
                    result = element;
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
