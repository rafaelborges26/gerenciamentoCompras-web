import { useEffect } from 'react'
import { useCallback } from 'react'
import { createContext, ReactNode, useState } from 'react'
import { database } from '../services/firebase'

export const ClientContext = createContext({} as ClientContextType )


interface IClients {
    id: string;
    name: string;
    email: string;
    cel_number: string;
    adress: string;
    created_date?: number;
}

type ClientContextType = {
    clients: IClients[] | undefined
    getClients: () => Promise<void>
    createClients: (name: string, email: string, cel_number: string, adress: string, created_date: string) => Promise<void>
}

type ClientContextProps = {
    children: ReactNode
}

export function ClientContextProvider(props: ClientContextProps) {

    const [clients, setClients] = useState<IClients[]>()

    const getClients = async () => {
        
        const clientsRef = await database.ref('clients').get(); 
   
           const clientsAll: IClients = clientsRef.val()

           const parsedClients = Object.entries(clientsAll).map(([key, value]) => {
            return {
                id: key,
                name: value.name,
                email: value.email,
                cel_number: value.cel_number,
                adress: value.adress,
                created_date: value.created_date

            }
    })

    setClients(parsedClients)

        console.log(parsedClients)
    }


    const createClients = useCallback( async(name: string, email: string, cel_number: string, adress: string, created_date: string) => {
    
        const clientRef = database.ref('clients')

        const firebaseClient = await clientRef.push({
            name: name,
            email: email,
            cel_number: cel_number,
            adress: adress,
            created_date: created_date,
        })

        
    },[])

    useEffect(() => {
        getClients();
    },[createClients])

    return (
        <ClientContext.Provider value={{ clients, getClients, createClients }}>
            {props.children}
        </ClientContext.Provider>
    )    
}
