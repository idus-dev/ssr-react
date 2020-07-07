import React from 'react';
import { Helmet } from 'react-helmet';
import { Text, Layout } from '../styled';

const Main = () => (
    <>
        <Helmet>
            <title>My App | Main</title>
            <meta name="description" content="Main Page" />
        </Helmet>
        <Layout.Container>
            <Text.SubTitle>MAIN</Text.SubTitle>
            <p>SSR-REACT BOILERPLATE</p>
        </Layout.Container>
    </>
);

export default Main;
