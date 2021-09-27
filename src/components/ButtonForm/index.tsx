import  React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { ContainerButton } from './styles'

type ButtonFormProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    name: string;
    colorBackground: 'red' | 'green'
}

const ButtonForm: React.FC<ButtonFormProps> = ({name, type, value, colorBackground, ...props}: ButtonFormProps) => {
    
    return (
        <ContainerButton
         {...props}
         type={type}
         value={value}
         colorBackground={colorBackground}
        >
        {name}        
        </ContainerButton>
    )
}

export default ButtonForm