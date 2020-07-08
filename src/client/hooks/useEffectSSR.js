import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HYDRATED } from '../store/action/types';

// hydrated action
const hydrated = () => ({ type: HYDRATED });

// SSR useEffect Wrapper
// - 컴포넌트 마운트 시 발생하는 데이터 요청 블락 하는 용도
const useEffectSSR = (fn, watch) => {
    // Redux - ssr 이라는 상태정보에, 서버에서 그려지면, true로 변경되어 클라이언트로 내려옴
    const ssr = useSelector(state => state.ssr); // ssr flag
    const dispatch = useDispatch();

    useEffect(() => {
        // 서버에서 이미 정보를 가져왔다면
        // useEffect (마운트시) 데이터 요청 또는 액션 디스패치 하지 않고 막음
        if (ssr) {
            dispatch(hydrated()); // 클라이언트 로 이제 제어가 넘어가서, 하이드레이션 플래그 꺼줌
            return;
        }
        fn();
    }, watch || []);
};

// __INITIAL_DATA__ 를 서버에서 가져올시
export const getInitalData = (staticContext, key) => {
    let data = staticContext[key] || {};

    if (process.env.IS_BROWSER === true && __INITIAL_DATA__ !== null) {
        data = __INITIAL_DATA__[key];
        __INITIAL_DATA__ = null;
    }

    return data;
};

export default useEffectSSR;
