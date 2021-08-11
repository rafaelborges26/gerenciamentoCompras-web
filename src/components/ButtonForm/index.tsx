import  React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { ContainerButton } from './styles'

type ButtonFormProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    name: string;
}

const ButtonForm: React.FC<ButtonFormProps> = ({name, type, value, ...props}: ButtonFormProps) => {
    
    return (
        <ContainerButton
         {...props}
         type={type}
         value={value}
        >
        {name}        
        </ContainerButton>
    )
}

export default ButtonForm