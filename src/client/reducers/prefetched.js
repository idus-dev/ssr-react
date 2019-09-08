import { FETCH_DATA } from '../action/types';

export default function prefetched(state = [], action = {}) {
    switch (action.type) {
        case FETCH_DATA:
            return action.data;

        default:
            return state;
    }
}
