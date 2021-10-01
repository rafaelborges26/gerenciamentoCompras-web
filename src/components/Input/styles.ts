import styled from 'styled-components';

interface Iinput {
    hide?: boolean;
    sizeWidth: string;
}


export const Container = styled.div<Iinput>`
    width: 60%;
    height: 100px;
    display: flex;
    flex-direction: column;

    display: ${props => props.hide && 'none'};

    label {
        font-size: 14px;
        margin-bottom: 10px;
    }

    input {
        width: ${props => props.sizeWidth === 'B' ? '430px' : '230px' };
        
        height: 40px;
        border-radius: 10px;
        padding: 10px 20px;
        border: 1px solid #8FBC8F;

        align-items: center;

        @media (max-width: 660px) {
            width: ${props => props.sizeWidth === 'B' ? '300px' : '200px' };
        }

    }
`;