import { combineReducers } from 'redux';
import counter from './counter';
import notification from './notification';

export default combineReducers({
    counter,
    notification
});