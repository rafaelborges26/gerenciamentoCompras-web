import { useContext } from 'react';
import { ClientContext } from '../contexts/ClientContext'

export function useClient() {
    const value = useContext(ClientContext);

    return value;
}