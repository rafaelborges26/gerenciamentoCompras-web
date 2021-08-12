import  React, { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(props => {
    
    return (
        <Container>
            <label>{props.name}</label>
            <input 
                {...props}
            />
        </Container>
    )
})


export default Input