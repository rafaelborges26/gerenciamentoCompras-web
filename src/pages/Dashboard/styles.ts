import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Header = styled.header`
    display: flex;
    flex-direction: row;
    gap: 40%;
    width: 100%;
    height: 20%;

    background: green;

    img {
        height: 100px;
        width: 100px;
    }

    .Options {
        gap: 100px;        
    }
`

export const Content = styled.div`

`