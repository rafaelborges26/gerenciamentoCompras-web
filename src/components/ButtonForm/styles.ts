import styled from 'styled-components'
import {shade} from 'polished'

export const ContainerButton = styled.button`
    
            font-size: 13px;
            font-family: 'Oxygen', sans-serif;
            color: #1C1C1C;    

            height: 30px;
            width: 105px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;            
            
            border: 0;
            border-radius: 15px;

            background: #7FFF00;
            transition: background-color 0.2s;

            &:hover {
                background-color: ${shade(0.2, '#7FFF00')};
            }        
        > button {
            gap: 10px;
        } 
    
`