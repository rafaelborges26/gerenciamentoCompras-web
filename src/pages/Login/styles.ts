import styled from 'styled-components';
import { shade } from 'polished'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
`;

export const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 100%;
    height: 100px;
    background: #228B22;

    img {
        height: 100px;
        width: 120px;
    }

    button {
        display: flex;
        align-items: center;
        
        gap: 4px;
        color: #F0FFFF;

        margin: 10px 15px 0 0;
        border: 0;
        background: transparent;
        font-family: 'Poppins', sans-serif;
        transition: color 0.2s;
        cursor: pointer;


        &:hover {
            color: ${shade(0.2, '#F0FFFF')}; 
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: 80%;
    max-height: 100%;

    margin-top: 80px;
`;

export const Modal = styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 400px;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 3px 2px 5px 4px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    background: #fff;

    strong {
        font-size: 32px;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;

        padding-right: 40px;

        color: #1C1C1C;
    }

    .LoginGoogle {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #737380;

            margin-bottom: 12px;
        }

        button {
            font-size: 14px;
            font-family: 'Poppins', sans-serif;
            color: #1C1C1C;    

            height: 32px;
            width: 224px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;            
            
            border: 0;
            border-radius: 8px;

            background: #7FFF00;
            transition: background-color 0.2s;

            &:hover {
                background-color: ${shade(0.2, '#7FFF00')};
            }



            img {
                margin-right: 8px; 
            }
        }
    }

        
`;