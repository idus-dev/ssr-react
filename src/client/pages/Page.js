import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../api';

const Page = ({ staticContext }) => {
    const { id } = useParams();
    const [content, setContent] = useState(() => {
        let data = staticContext ? staticContext.todo : {};

        if (process.env.IS_BROWSER === true && __INITIAL_DATA__ !== null) {
            data = __INITIAL_DATA__.todo;
            __INITIAL_DATA__ = null;
        }

        return data.text;
    });

    useEffect(() => {
        api.todos
            .detail(id)
            .then(res => {
                setContent(res.text);
            })
            .catch(err => {
                throw new Error(err);
            });
    }, []);

    return (
        <div>
            <h1>Page</h1>
            <p>{content}</p>
        </div>
    );
};

Page.propTypes = {
    staticContext: PropTypes.shape({
        todo: PropTypes.shape({
            text: PropTypes.string
        })
    })
};

Page.defaultProps = {
    staticContext: {
        todo: {
            text: 'loading...'
        }
    }
};

export default Page;
