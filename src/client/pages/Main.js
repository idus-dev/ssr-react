import React from 'react';
import { Helmet } from 'react-helmet';
import Counter from '../components/Counter';

const Main = () =>
    <div>
        <Helmet>
            <title>My App | Main</title>
            <meta name="description" content="Helmet application" />
        </Helmet>

        <Counter />
    </div>;

export default Main;