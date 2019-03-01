import { FETCH_NOTIFICATION } from '../action/types';

export default function notification(state = {}, action = {}) {
    switch (action.type) {
        case FETCH_NOTIFICATION:
            return action.data;

        default: return state;
    }
}