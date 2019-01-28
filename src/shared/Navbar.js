import React from 'react';
import { NavLink } from 'react-router-dom';

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
        <ul>
            {languages.map(({ name, param }) => (
                <li key={param}>
                    <NavLink to={`/popular/${param}`}>{name}</NavLink>
                </li>
            ))}
        </ul>
    );
};

export default Navbar;