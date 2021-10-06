import React from 'react';

const getFormatedDate = (value: number) => {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}

    
export default getFormatedDate; 
    