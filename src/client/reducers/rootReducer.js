import { combineReducers } from 'redux';
import counter from './counter';
import notification from './notification';
import prefetched from './prefetched';

export default combineReducers({
    counter,
    prefetched,
    notification
});