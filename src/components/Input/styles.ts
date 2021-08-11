import styled from 'styled-components';

export const Container = styled.div`
    width: 80%;
    height: 100px;
    display: flex;
    flex-direction: column;

    label {
        font-size: 14px;
        margin-bottom: 10px;
    }

    input {
        width: 430px;
        
        height: 40px;
        border-radius: 10px;
        padding: 10px 20px;
        border: 1px solid #8FBC8F;

        align-items: center;

        @media (max-width: 660px) {
            width: 300px;
        }

    }
`;