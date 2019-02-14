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

const Navbar = () => {
    const languages = [{
        name: 'All',
        param: 'all'
    }, {
        name: 'Javascript',
        param: 'javascript'
    }, {
        name: 'Python',
        param: 'python'
    }];

    return (
        <NavStyle>
            {languages.map(({ name, param }) => (
                <LinkStyle key={param} to={`/popular/${param}`}>{name}</LinkStyle>
            ))}
        </NavStyle>
    );
};

export default Navbar;