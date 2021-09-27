import { useContext } from 'react'
import { OrderContext } from '../contexts/OrderContext'

export function useOrder() {
    const value = useContext(OrderContext);
    
    return value;
}