import React from 'react';

const formatDate = (): string => {
    
        var date = new Date(),
            day  = date.getDate().toString().padStart(2, '0'),
            month  = (date.getMonth()+1).toString().padStart(2, '0'),
            year  = date.getFullYear();
         return day+"/"+month+"/"+year;    
}

export default formatDate; 
    