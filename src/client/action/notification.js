import { FETCH_NOTIFICATION } from './types';
import api from '../api';

export const notify = data => ({
    type: FETCH_NOTIFICATION,
    data
});

export const fetchNotification = () => dispatch => {
    api.notification()
        .then(res => {
            dispatch(notify(res));
        })
        .catch(err => {
            if (!err.status) {
                dispatch(notify({ message: 'OFFLINE: Please check your internet connections' }));
            }
        });
};
