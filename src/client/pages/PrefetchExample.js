import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import api from '../api';

const PrefetchExample = ({ staticContext }) => {
    const [list, setList] = useState(() => {
        let data = staticContext ? staticContext.todos : [];

        // 컨디션 공통으로 뺼지 ?
        // - __INITIAL_DATA__ = null : 초기 값
        // - process.env.IS_BROWSER 서버 & 브라우져 구분 값 (서버에선 window.__INITIAL_DATA__ 접근 못함 )
        if (process.env.IS_BROWSER === true && __INITIAL_DATA__ !== null) {
            data = __INITIAL_DATA__.todos;
        }

        return data;
    });

    useEffect(() => {
        // __INITIAL_DATA__ === null
        // 서버에서 내려준 값 없을때 (클라이언트에서 마운트 됬을떄)
        if (__INITIAL_DATA__ === null) {
            api.todos
                .list()
                .then(res => {
                    setList(res);
                })
                .catch(err => {
                    throw new Error(err);
                });
        }
    }, []);

    return (
        <div>
            <Helmet>
                <title>My App | PrefetchExample</title>
                <meta name="description" content="PrefetchExample Page" />
            </Helmet>
            <h1>PrefetchExample</h1>
            <ul>
                {list.map(({ id, text }) => (
                    <li key={id}>{text}</li>
                ))}
            </ul>
        </div>
    );
};

PrefetchExample.propTypes = {
    staticContext: PropTypes.shape({
        todos: PropTypes.array
    })
};

PrefetchExample.defaultProps = {
    staticContext: {
        todos: []
    }
};

export default PrefetchExample;
