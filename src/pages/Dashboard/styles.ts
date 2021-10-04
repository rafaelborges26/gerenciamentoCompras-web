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
    margin-bottom: 20px;
    width: 100%;
    height: 20%;
    background: #228B22;
    justify-content: center;

    img {
        height: 100px;
        width: 100px;
    }

    .Options {
        display: flex;

        button {
            margin-right: 10px;
            margin-top: 10px;
            font-weight: 500;
        }   
    }
`

export const Content = styled.div`

`