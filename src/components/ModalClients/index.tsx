import  React, { ReactNode, ButtonHTMLAttributes, FormEvent, useState } from 'react';
import { Container } from './styles'

import { database } from '../../services/firebase';
import Input from '../Input';
import ButtonForm from '../ButtonForm';


interface formData {
    name: string;
    email: string;
    cel_number: string;
    adress: string;
}



const ModalClients: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cel_number, setCel_number] = useState<string>('');
    const [adress, setAdress] = useState<string>('');
    const [clients, setClients] = useState({})
    const [listClients, setListClients] = useState(false)
    const [createClients, setCreateClients] = useState(true)



    const handleCreateUser = async (event: FormEvent) => {

        console.log("entro")
        event.preventDefault()
   
        //Enviar dados
   
        const clientRef = database.ref('clients')
        
        console.log(
            name,
            cel_number
        )

        const firebaseClient = await clientRef.push({
            name: name,
            email: email,
            cel_number: cel_number,
            adress: adress,
            created_date: new Date()
        })
   
        console.log(firebaseClient)
       }
   
       const handleShowClients = async () => {
        
        setListClients(true)
        setCreateClients(false)

           //faz um select no banco buscando por esse key
           const roomRef = await database.ref('clients').get(); 
   
           setClients(roomRef.val())
   
       }

    return (
        <Container>
            <h3>{name}</h3> 

            { listClients && (
                <h6>List clients</h6>
            )}


            { createClients && (
                <form onSubmit={handleCreateUser}>
                        <Input 
                            type="text"
                            placeholder="Nome" 
                            id="name" 
                            name="Nome e sobrenome"
                            onChange={event => setName(event.target.value)}
                            value={name}
                        />
                        <Input 
                            type="text"
                            placeholder="E-mail" 
                            id="email"
                            name="Email"
                            onChange={event => setEmail(event.target.value)}
                            value={email}
                         />

                        <Input 
                            type="text"
                            placeholder="Celular" 
                            id="cel_number"
                            name="Telefone celular"
                            onChange={event => setCel_number(event.target.value)}
                            value={cel_number} 
                        />
                        <Input 
                            type="text"
                            placeholder="Endereço" 
                            id="adress"
                            name="Endereço"
                            onChange={event => setAdress(event.target.value)}
                            value={adress}
                        />

                        <div className="ButtonsClient">

                        <ButtonForm type="submit" name="Criar Cliente" />
                        <ButtonForm type="button" onClick={handleShowClients} name="Listar clientes" />

                        </div>
                    </form>
            ) }

        </Container>
    )
}

export default ModalClients