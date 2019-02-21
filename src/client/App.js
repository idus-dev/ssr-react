import { Route, Switch } from 'react-router-dom';
import React from 'react';

import Navigation from './components/Navigation';
import NoMatch from './pages/NoMatch';
import routes from './routes';
import { NormalizeStyle, FontStyle, BgImage } from './components/GlobalStyles';

import icon from '../assets/icon.png';

const App = () => (
    <div>
        <NormalizeStyle />
        <FontStyle />

        <Navigation />

        <img src={icon} alt="" />
        <BgImage />

        <Switch>
            {routes.map(({ path, exact, component: C, ...rest }) => (
                <Route key={path}
                    path={path}
                    exact={exact}
                    render={props => <C {...props} {...rest} />}
                />
            ))}
            <Route render={props => <NoMatch {...props} />} />
        </Switch>
    </div>
);

export default App;