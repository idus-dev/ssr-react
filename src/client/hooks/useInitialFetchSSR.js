import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../store/action/todos';

const useInitialFetchSSR = fetchAction => {
    const ssr = useSelector(state => state.ssr);
    const dispatch = useDispatch();

    useEffect(() => {
        if (ssr) {
            dispatch(action.hydrated());
            return;
        }
        dispatch(fetchAction);
    }, []);
};

export default useInitialFetchSSR;
