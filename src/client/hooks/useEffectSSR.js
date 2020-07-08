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

// 컴포넌트 useState 초기 스테이트 설정 함수
// - staticContext: <StaticRouter> 의 context 프로퍼티 <StaticRouter context={initialData}>
// - key: staticContext 에서 가져올 데이터의 키
export const getInitalState = (staticContext, key) => {
    // 서버에서 렌더링 할땐 - staticContext로 부터 초기 state 데이터를 가져옴.
    let data = staticContext[key] || {};

    // after hydration & before render
    // 클라이언트에서 렌더링 할땐, __INITIAL_DATA__ 에서 필요한 데이터를 가져와 초기 state를 설정함.

    // 브라우져 환경인지 체크 || 서버에선 무시 (window.__INTIAL_DATA__ 접근 못함);
    if (process.env.IS_BROWSER === true && __INITIAL_DATA__ !== null) {
        // window.__INITIAL_DATA__ 서버렌더링 과정에서 받은 데이터를 임시 저장하는객체.
        data = __INITIAL_DATA__[key];
        // null 로 초기화
        __INITIAL_DATA__ = null;
    }

    return data;
};

export default useEffectSSR;
