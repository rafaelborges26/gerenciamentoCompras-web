import  React, { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    hide?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(props => {
    
    return (
        <Container hide={props.hide}>
            <label>{props.name}</label>
            <input 
                {...props}
            />
        </Container>
    )
})


export default Input