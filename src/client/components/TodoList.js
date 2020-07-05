import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';
import * as action from '../store/action/todos';
import useForm from '../hooks/useForm';
import useInitialFetchSSR from '../hooks/useInitialFetchSSR';

const TodoList = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const { handleSubmit, handleChange, values, errors } = useForm(() =>
        dispatch(action.postTodos(values.userInput))
    );

    useInitialFetchSSR(action.fetchTodos());

    return (
        <>
            <ul>
                {todos.map(({ id, text }) => (
                    <li key={id}>
                        <NavLink to={`/todos/${id}`}>{text}</NavLink>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    autoComplete="off"
                    type="text"
                    name="userInput"
                    onChange={handleChange}
                    value={values.userInput}
                />
                <button type="submit">Submit</button>
            </form>
            {errors.userInput && <mark>{errors.userInput}</mark>}
        </>
    );
};

export default TodoList;
