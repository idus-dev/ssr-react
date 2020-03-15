import { combineReducers } from 'redux';
import todos from './todos';
import ssr from './ssr';

export default combineReducers({
    ssr,
    todos
});
