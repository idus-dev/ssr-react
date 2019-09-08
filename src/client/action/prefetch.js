import { matchPath } from 'react-router-dom';
import { FETCH_DATA } from './types';
import routes from '../routes';

export const prefetch = data => ({
    type: FETCH_DATA,
    data
});

export const prefetchUrl = pathname => dispatch => {
    const activeRoute = routes.find(route => matchPath(pathname, route)) || {};

    activeRoute
        .preFetch()
        .then(res => dispatch(prefetch(res)))
        .catch(err => {
            if (!err.status) {
                dispatch(
                    prefetch({
                        message:
                            'OFFLINE: Please check your internet connections'
                    })
                );
            }
        });
};
