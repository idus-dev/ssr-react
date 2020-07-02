import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HYDRATED } from '../store/action/types';

// hydrated action
const hydrated = () => ({ type: HYDRATED });

// 컴포넌트 마운트시, 서버에서 받아온 초기 스테이트가 있으면 컴포넌트 내 디스패치 액션 막는 용도
const useInitialFetchSSR = fetchAction => {
    const ssr = useSelector(state => state.ssr); // ssr flag
    const dispatch = useDispatch();

    useEffect(() => {
        if (ssr) {
            dispatch(hydrated());
            return;
        }
        // 클라이언트에서 마운트시 디스패치
        dispatch(fetchAction);
    }, []);
};

export default useInitialFetchSSR;
