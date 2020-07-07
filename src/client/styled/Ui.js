import styled from 'styled-components';

export const List = styled.ul`
    list-style: disc;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 20px;
    a {
        &:hover {
            color: blue;
            text-decoration: underline;
        }
    }
`;

export const Btn = styled.button`
    padding: 5px 8px;
    border: 1px solid #ccc;
    font-size: 12px;
`;

export const Form = styled.form`
    > * {
        display: block;
    }
`;
