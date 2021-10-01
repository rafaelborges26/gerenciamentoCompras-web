export const formatValueCents = (totalValue: string) => {
    const splitValue = totalValue.toString().split('.');
  
    const centsString = `,${
      splitValue[1]
        ? splitValue[1].length > 1
          ? splitValue[1]
          : `${splitValue[1]}0`
        : '00'
    }`;
  
    return centsString;
  };
  
  export const formatFirstValue = (totalValue: string) => {
    const price = String(totalValue);
    let firstPrice = price;
    const commaFound = price.indexOf(',');
    const dotFound = price.indexOf('.');
  
    if (commaFound > 0) {
      return (firstPrice = price.substring(0, commaFound));
    }
    if (dotFound > 0) {
      return (firstPrice = price.substring(0, dotFound));
    }
    return firstPrice;
  };
  
  export const formatAllValue = (totalValue: string) => {
    const firstValue = String(formatFirstValue(totalValue));
  
    const centsValue = String(formatValueCents(totalValue));
  
    const allValue = firstValue.concat(centsValue);
  
    return allValue;
  };