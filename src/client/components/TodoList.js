import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useForm from '../hooks/useForm';

import * as action from '../store/action/todos';

const TodoList = ({ todos, postTodos, fetchTodos }) => {
    useEffect(() => fetchTodos(), []);

    const { handleSubmit, handleChange, values, errors } = useForm(() =>
        postTodos(values.userInput)
    );

    return (
        <>
            <ul>
                {todos.map(({ id, text }) => (
                    <li key={id}>{text}</li>
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

function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    fetchTodos: PropTypes.func.isRequired,
    postTodos: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
    fetchTodos: action.fetchTodos,
    postTodos: action.postTodos
})(TodoList);
