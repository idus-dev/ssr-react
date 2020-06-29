import { Route, Switch } from 'react-router-dom';
import React from 'react';

import ResetCSS from './components/ResetCSS';
import Navigation from './components/Navigation';
import NoMatch from './pages/NoMatch';
import ssrRoutes from '../server/ssrRoutes';
import Main from './pages/Main';

const App = () => (
    <main>
        <ResetCSS />
        <Navigation />
        {/* eslint-disable react/jsx-props-no-spreading */}
        <Switch>
            <Route path="/" exact component={Main} />
            {/* routes that requires serverside rendering */}
            {ssrRoutes.map(({ path, exact, component: C, ...rest }) => (
                <Route
                    key={path}
                    path={path}
                    exact={exact}
                    render={props => <C {...props} {...rest} />}
                />
            ))}
            <Route render={props => <NoMatch {...props} />} />
        </Switch>
        {/* eslint-ensable react/jsx-props-no-spreading */}
    </main>
);

export default App;
