import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () =>
    <div>
        <Helmet>
            <title>My App | Home</title>
            <meta name="description" content="Helmet application" />
        </Helmet>
        Select a language
    </div>;

export default Home;