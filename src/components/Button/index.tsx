import  React, { ReactNode } from 'react';

type ButtonProps = {
    children?: ReactNode;
    name: string;
}

const Button: React.FC<ButtonProps> = ({name, ...props}: ButtonProps) => {
    
    return (
        <button 
         {...props}
         type="button"
        >
        {name}
        </button>
    )
}

export default Button