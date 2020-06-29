import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const LinkStyle = styled(NavLink)`
    color: #999;
`;

const NavStyle = styled.nav`
    padding: 0;
    margin: 0;

    > ${LinkStyle} {
        display: inline-block;
        margin: 0 10px;
    }

    .active {
        color: red;
    }
`;

const Navigation = () => (
    <NavStyle>
        <LinkStyle exact to="/">
            Main
        </LinkStyle>
        <LinkStyle exact to="/todos">
            Todos
        </LinkStyle>
    </NavStyle>
);

export default Navigation;
