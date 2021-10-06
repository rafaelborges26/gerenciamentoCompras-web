//Libs - Hooks
import { createContext, ReactNode, useState, useEffect, useCallback } from 'react'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'

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
    updateClients: ( data: {id:string, name: string, email: string, adress: string} ) => Promise<void>
    deleteClient: (id: string) => Promise<void>

}

type ClientContextProps = {
    children: ReactNode
}

export function ClientContextProvider(props: ClientContextProps) {

    const { user } = useAuth();

    const [clients, setClients] = useState<IClients[]>()

    const getClients = async () => {
        
        const clientsRef = await database.ref('clients').get(); 
   
        if(clientsRef) {
            const clientsAll: IClients = clientsRef.val()

            if(clientsAll) {
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
                } else {
                    setClients(undefined)
                }  
            }

    }

    useEffect(() => {
        if(user)
        getClients();
    },[user])


    const createClients = useCallback( async(name: string, email: string, cel_number: string, adress: string, created_date: string) => {
    
        try {
        const clientRef = database.ref('clients')

        const firebaseClient = await clientRef.push({
            name: name,
            email: email,
            cel_number: cel_number,
            adress: adress,
            created_date: created_date,
        })

        alert("Cadastro criado com sucesso")

                    
    } catch (error) {
        alert("Ocorreu um erro com a tentativa da criação")
    }
        
    },[])

    const updateClients = useCallback( async (data) => {
        
        try {
            const clientRef = database.ref(`clients/${data.id}`)

        await clientRef.update({
            name: data.name,
            email: data.email,
            adress: data.adress,
        })
    
        } catch (error) {
            alert("Ocorreu um erro com a tentativa de atualização dos dados")            
        }

        
    },[])

    const deleteClient = useCallback( async (id: string) => {
        
        try {
            await database.ref(`/clients/${id}`).remove()        
            
        } catch (error) {
            alert("Ocorreu um erro com a tentativa de exclusão")            
        }

    },[])


    return (
        <ClientContext.Provider value={{ clients, getClients, createClients, updateClients, deleteClient }}>
            {props.children}
        </ClientContext.Provider>
    )    
}
