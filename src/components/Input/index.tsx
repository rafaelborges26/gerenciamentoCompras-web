import  React, { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { Container } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    hide?: boolean;
    sizeWidth: 'S' | 'B';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(props => {
    
    const { name, hide, sizeWidth } = props
    
    return (
        <Container hide={hide} sizeWidth={sizeWidth}>
            <label>{name}</label>
            <input 
                {...props}
            />
        </Container>
    )
})


export default Input