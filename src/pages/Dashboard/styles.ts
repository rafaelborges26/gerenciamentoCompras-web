import styled from 'styled-components';

export const Container = styled.div`
    background: green;
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

    img {
        height: 100px;
        width: 100px;
    }

    .Options {
        gap: 100px;
        
        button {
            background: blue;;
        }
    }


`