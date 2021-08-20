import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Header = styled.header`
    display: flex;
    flex-direction: row;
    gap: 30%;
    width: 100%;
    height: 20%;
    background: green;

    img {
        height: 100px;
        width: 100px;
    }

    .Options {

        button {
            margin-right: 10px;
            margin-top: 10px;
            font-weight: 700;
        }   
    }
`

export const Content = styled.div`

`