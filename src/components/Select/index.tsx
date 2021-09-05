import  React, { SelectHTMLAttributes } from 'react';
import { Container } from './styles';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    name: string;
    multiSelect: boolean;
}

const Input = React.forwardRef<HTMLSelectElement, SelectProps>(props => {
    
    return (
        <Container multiselect={props.multiSelect} >
            <label>{props.name}</label>
            <select 
                {...props}
            />
        </Container>
    )
})


export default Input