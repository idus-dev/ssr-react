import { FETCH_NOTIFICATION } from './types';
import api from '../api';

export const notify = data => ({
    type: FETCH_NOTIFICATION,
    data
});

export const fetchNotification = () => dispatch => {
    api.message().then((res) => {
        dispatch(notify(res));
    });
};
