import styled from 'styled-components';

interface PropsSelect {
    multiselect: boolean
}

export const Container = styled.div<PropsSelect>`
    width: 80%;
    height: ${props => props.multiselect ? '130px' : '80px' };
    display: flex;
    flex-direction: column;

    label {
        font-size: 14px;
        margin-bottom: 10px;
    }

    select {
        width: 430px;
        
        height: ${props => props.multiselect ? '80px' : '40px'} ;
        border-radius: 6px;
        padding: 10px 20px;
        border: 1px solid #8FBC8F;
        
        background: #fff;

        align-items: center;

        @media (max-width: 660px) {
            width: 300px;
        }


    }
`;