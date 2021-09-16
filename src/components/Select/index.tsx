import  React, { SelectHTMLAttributes } from 'react';
import { Container } from './styles';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    name: string;
    multiselect: boolean;
}

const Input = React.forwardRef<HTMLSelectElement, SelectProps>(props => {
    
    return (
        <Container multiselect={props.multiselect} >
            <label>{props.name}</label>
            <select 
                {...props}
            />
        </Container>
    )
})


export default Input