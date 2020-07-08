import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import useEffectSSR, { getInitalState } from '../hooks/useEffectSSR';
import TodoList from '../components/TodoList';
import api from '../api';
import { Text, Layout } from '../styled';

const Page = ({ staticContext }) => {
    const { id } = useParams();

    const [pageData, setPageData] = useState(
        getInitalState(staticContext, 'todo')
    );

    useEffectSSR(() => {
        api.todos
            .detail(id)
            .then(res => {
                setPageData(res);
            })
            .catch(err => {
                throw new Error(err);
            });
    }, [id]);

    return (
        <>
            <Helmet>
                <title>My App | {pageData.title}</title>
                <meta name="description" content={pageData.content} />
            </Helmet>
            <Layout.Container>
                <Text.SubTitle>{pageData.title}</Text.SubTitle>
                <p>{pageData.content}</p>
                <br />
                <hr />
                <Text.SubTitle as="h4">Other Posts</Text.SubTitle>

                <TodoList hide={id} />

                <br />
                <NavLink to="/todos">
                    <em>↩</em>&nbsp;&nbsp;&nbsp;To List
                </NavLink>
            </Layout.Container>
        </>
    );
};

Page.propTypes = {
    staticContext: PropTypes.shape({
        todo: PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string
        })
    })
};

Page.defaultProps = {
    staticContext: {
        todo: {
            title: '',
            content: 'loading...'
        }
    }
};

export default Page;
