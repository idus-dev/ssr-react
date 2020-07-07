import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import useForm from '../hooks/useForm';
import * as action from '../store/action/todos';
import TodoList from '../components/TodoList';
import { Text, Layout, Ui } from '../styled';

const Todos = () => {
    const dispatch = useDispatch();

    const { handleSubmit, handleChange, values, errors } = useForm(() =>
        dispatch(
            action.postTodos({
                title: values.textTitle,
                content: values.textContent
            })
        )
    );

    return (
        <>
            <Helmet>
                <title>My App | Todo List Page</title>
                <meta name="description" content="Todo List Page" />
            </Helmet>
            <Layout.Container>
                <Text.SubTitle>TODO LIST</Text.SubTitle>
                {/* 목록 컴포넌트 */}
                <TodoList />
                {/* 입력폼 */}
                <Ui.Form onSubmit={handleSubmit}>
                    <input
                        autoComplete="off"
                        type="text"
                        name="textTitle"
                        placeholder="title"
                        onChange={handleChange}
                        value={values.textTitle}
                    />
                    {errors.textTitle && <mark>{errors.textTitle}</mark>}
                    <textarea
                        name="textContent"
                        placeholder="content"
                        onChange={handleChange}
                        value={values.textContent}
                    />
                    {errors.textContent && <mark>{errors.textContent}</mark>}
                    <Ui.Btn type="submit">Submit</Ui.Btn>
                </Ui.Form>
            </Layout.Container>
        </>
    );
};

export default Todos;
