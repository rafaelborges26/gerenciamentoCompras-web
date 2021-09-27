import  React, { ReactNode, ButtonHTMLAttributes, FormEvent, useState, useEffect } from 'react';
import { useClient } from '../../hooks/useClient'
import { format } from 'date-fns';

import Input from '../Input';
import ButtonForm from '../ButtonForm';
import { Container, TableCllient } from './styles'


const ModalClients: React.FC = () => {

    const { clients, getClients, createClients } = useClient();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cel_number, setCel_number] = useState<string>('');
    const [adress, setAdress] = useState<string>('');
    const [listClients, setListClients] = useState(false)
    const [createdClients, setCreatedClients] = useState(true)



    const handleCreateUser = async (event: FormEvent) => {

        event.preventDefault()
   
        //validations

        if(name.trim() === '' || email.trim() === '' || cel_number.trim() === '' || adress.trim() === ''){
            alert("É Necessário preencher os campos")
            return;
        }

        //Enviar dados

        const created_date = format(new Date(), 'dd/mm/yyyy');

        await createClients(name, email, cel_number, adress, created_date)
        
        alert("Cadastro criado com sucesso")

        setName('');
        setEmail('');
        setCel_number('');
        setAdress('');

        
       }

       const handleShowListOrCreated = () => {
        setListClients(!listClients)
        setCreatedClients(!createdClients)
       }

       useEffect(() => {
        getClients()
       // eslint-disable-next-line react-hooks/exhaustive-deps
       },[listClients])

    return (
        <Container>
            <h3>Clientes</h3>

            { listClients && 
            (
            <>
                <div className="headerTable">
                    <ButtonForm type="button" name="Criar Cliente" onClick={handleShowListOrCreated} colorBackground="green" />
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
                    {clients && clients.map(client => (
                        <tr key={client.id} >
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


            { createdClients && (
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

                        <ButtonForm type="submit" name="Criar Cliente" colorBackground="green"/>
                        <ButtonForm type="button" onClick={handleShowListOrCreated} name="Listar clientes" colorBackground="green" />

                        </div>
                    </form>
            ) }

        </Container>
    )
}

export default ModalClients