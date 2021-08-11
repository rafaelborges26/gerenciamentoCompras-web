import  React, { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
}

const Input: React.FC<InputProps> = ({name, type, placeholder}: InputProps) => {
    
    return (
        <Container>
            <label>{name}</label>
            <input 
                type={type}
                placeholder={placeholder} 
                id={name}
            />
        </Container>
    )
}

export default Input