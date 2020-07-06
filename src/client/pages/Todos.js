import React from 'react';
import { Helmet } from 'react-helmet';

import TodoList from '../components/TodoList';
import { Text, Layout } from '../styled';

const Todos = () => (
    <Layout.Container>
        <Helmet>
            <title>My App | Todo List Page</title>
            <meta name="description" content="Todo List Page" />
        </Helmet>
        <Text.SubTitle>TODO LIST</Text.SubTitle>
        <TodoList />
    </Layout.Container>
);

export default Todos;
