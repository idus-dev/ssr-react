import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HYDRATED } from '../store/action/types';

// hydrated action
const hydrated = () => ({ type: HYDRATED });

const useInitialFetchSSR = fetchAction => {
    const ssr = useSelector(state => state.ssr);
    const dispatch = useDispatch();

    useEffect(() => {
        if (ssr) {
            dispatch(hydrated());
            return;
        }
        dispatch(fetchAction);
    }, []);
};

export default useInitialFetchSSR;
