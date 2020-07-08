import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Ui } from '../styled';
import * as action from '../store/action/todos';
import useEffectSSR from '../hooks/useEffectSSR';

const TodoList = ({ hide }) => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    useEffectSSR(() => {
        dispatch(action.fetchTodos());
    }, []);

    return (
        <>
            <Ui.List>
                {todos.map(({ id, title }) => {
                    if (parseInt(hide, 10) === id) return false;
                    return (
                        <li key={id}>
                            <NavLink to={`/todos/${id}`}>{title}</NavLink>
                        </li>
                    );
                })}
            </Ui.List>
        </>
    );
};

TodoList.propTypes = {
    // 목록에서 숨길 아이디
    hide: PropTypes.string
};

TodoList.defaultProps = {
    hide: undefined
};

export default TodoList;
