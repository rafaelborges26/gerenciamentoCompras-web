import  React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { ContainerButton } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    name: string;
}

const Button: React.FC<ButtonProps> = ({name, ...props}: ButtonProps) => {
    
    return (
        <ContainerButton
         {...props}
         type="button"
        >
        {name}        
        </ContainerButton>
    )
}

export default Button