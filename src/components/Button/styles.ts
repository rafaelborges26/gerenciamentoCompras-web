import styled from 'styled-components'
import { shade } from 'polished'

export const ContainerButton = styled.button`
    
    font-size: 20px;
    background: transparent;
    border: transparent;
    cursor: pointer;
    color: #000;

    &:hover {
        color: ${shade(0.2, '#000')}; 
        text-decoration: underline; 
    }
`