import  React, { ReactNode, ButtonHTMLAttributes, FormEvent, useState } from 'react';
import { Container, TableCllient } from './styles'

import { database } from '../../services/firebase';
import Input from '../Input';
import ButtonForm from '../ButtonForm';
import { format } from 'date-fns';


interface formData {
    name: string;
    email: string;
    cel_number: string;
    adress: string;
    created_date?: number;
}

const ModalClients: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cel_number, setCel_number] = useState<string>('');
    const [adress, setAdress] = useState<string>('');
    const [clients, setClients] = useState<formData[]>([])
    const [listClients, setListClients] = useState(false)
    const [createClients, setCreateClients] = useState(true)



    const handleCreateUser = async (event: FormEvent) => {

        event.preventDefault()
   
        //validations

        if(name.trim() === '' || email.trim() === '' || cel_number.trim() === '' || adress.trim() === ''){
            return;
        }

        //Enviar dados

        const formattedDate = format(new Date(), 'dd/mm/yyyy');
   
        const clientRef = database.ref('clients')

        const firebaseClient = await clientRef.push({
            name: name,
            email: email,
            cel_number: cel_number,
            adress: adress,
            created_date: formattedDate,
        })

        alert("Cadastro criado com sucesso")

        setName('');
        setEmail('');
        setCel_number('');
        setAdress('');

        
       }

       const handleShowClients = async () => {
        
        setListClients(true)
        setCreateClients(false)

           //faz um select no banco buscando por esse key
           const clientsRef = await database.ref('clients').get(); 
   
           const clientsAll: formData = clientsRef.val()

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
   
       }

       const handleShowCreateClients = () => {
        setListClients(false)
        setCreateClients(true)

       }

    return (
        <Container>
            <h3>Clientes</h3>

            { listClients && 
            (
            <>
                <div className="headerTable">
                    <ButtonForm type="button" name="Criar Cliente" onClick={handleShowCreateClients} />
                </div>
            
                <TableCllient>
                    
                    <table>
                        <thead>
                        <tr>
                            <th><span>Nome</span></th>
                            <th><span>E-mail</span></th>
                            <th><span>Celular</span></th>
                            <th><span>Endereço</span></th>
                        </tr>
                        </thead>
                <tbody>
                    {clients.map(client => (
                        <tr>
                        <>
                            <td><p>{client.name}</p></td>
                            <td><p>{client.email}</p></td>
                            <td><p>{client.cel_number}</p></td>
                            <td><p>{client.adress}</p></td>
                        </>
                        </tr>
                    ) )}
                    </tbody>
                    </table>
                </TableCllient>
                </>
                
            )
            
            }


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