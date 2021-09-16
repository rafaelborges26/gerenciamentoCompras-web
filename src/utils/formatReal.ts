import React from 'react';

const formatReal = (value: number) => {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

    
export default formatReal; 
    