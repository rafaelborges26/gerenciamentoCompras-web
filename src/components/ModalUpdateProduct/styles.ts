import styled from 'styled-components';

interface viewProps {
    isOpen: boolean;
}


export const Container = styled.div<viewProps>`
    position: fixed;
    top: 35%;
    
    display: ${props => props.isOpen ? 'flex' : 'none' };
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    padding: 20px;

    width: 70%;
    margin: 0 50px 50px 50px;

    background: #fff;
    border: 3px solid #003049;

    svg {
        cursor: pointer;
    }

`;

export const Header = styled.header`
    display: flex;
    width: 100%;
    justify-content: right;
    margin-bottom: 10px;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;

    form {
        padding: 0;
    }

    .ButtonsUpdate {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }
`