import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import api from '../api';

const PrefetchExample = ({ staticContext }) => {
    const [list, setList] = useState(() => {
        let data = staticContext ? staticContext.todos : [];

        if (
            process.env.IS_BROWSER === true &&
            Object.keys(__INITIAL_DATA__).length !== 0
        ) {
            data = __INITIAL_DATA__.todos;
            __INITIAL_DATA__ = {};
        }

        return data;
    });

    useEffect(() => {
        if (Object.keys(list).length === 0) {
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
