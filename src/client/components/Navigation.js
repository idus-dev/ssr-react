import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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
        color: red
    }
`;

const Navigation = () => {
    const languages = [{
        name: 'Main',
        param: ''
    }, {
        name: 'Prefetch',
        param: 'prefetch'
    }, {
        name: 'Message',
        param: 'message'
    },];

    return (
        <NavStyle>
            {languages.map(({ name, param }) => (
                <LinkStyle key={param} to={`/${param}`}>{name}</LinkStyle>
            ))}
        </NavStyle>
    );
};

export default Navigation;