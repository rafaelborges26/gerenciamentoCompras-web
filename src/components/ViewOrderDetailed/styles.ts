import styled from 'styled-components';

interface viewProps {
    isOpen: boolean;
}


export const Container = styled.div<viewProps>`
    position: fixed;
    top: 35%;
    
    display: ${props => props.isOpen ? 'flex' : 'none' };
    flex-direction: column;
    align-items: end;
    justify-content: flex-start;

    padding: 20px;

    width: 80%;
    height: 50%;
    margin: 0 50px 50px 50px;

    background: #fff;
    border: 3px solid #003049;

    svg {
        cursor: pointer;
    }

`;

export const Table = styled.table`
    
    margin-top: 5px;

    justify-content: center;

    border-top: 8px solid #cedee7;
    border-bottom: 1px solid #ccc;

    background: #fff;

    span {
        font-size: 18px;

        @media (max-width: 660px) {
            font-size: 12px;
        }
    }

    p {
        font-size: 16px;

        @media (max-width: 660px) {
            font-size: 10px;
        }
    }
        width: 100%;
    

    td {
        padding: 15px;
        text-align: left;
        
        gap: 10px;

        svg + svg {
            margin-left: 12px;
        }

        svg {
            cursor: pointer;
        }

        button {
            width: 138px;
        }


        @media (max-width: 660px) {
            padding: 5px;
            
            button {
                width: 80px;
                font-size: 10px;
            }

        }
    }


    th {
        height: 40px;
        padding: 15px;
        text-align: left;
    }


    
    overflow-x: auto;
`;