//Libs
import  React, { FormEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useClient } from '../../hooks/useClient'

//UI - Components
import ModalUpdate from '../ModalUpdate';
import ButtonForm from '../ButtonForm';

//Icons
import Input from '../Input';
import { FiTrash2, FiEdit } from 'react-icons/fi';

//Styles
import { Container, TableContainer, TableCllient } from './styles'


const ModalClients: React.FC = () => {

    const { clients, getClients, createClients, deleteClient } = useClient();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cel_number, setCel_number] = useState<string>('');
    const [adress, setAdress] = useState<string>('');
    const [listClients, setListClients] = useState(false)
    const [createdClients, setCreatedClients] = useState(true)

    const [clientIdSelected, setClientIdSelected] = useState('')
    const [modalUpdateClient, setModalUpdateClient] = useState(false)



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
       },[listClients, modalUpdateClient])


       const handleEditClient = (idClient: string) => {
        setModalUpdateClient(true)
        setClientIdSelected(idClient)
       }

       const handleDeleteClient = async (id: string) => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Tem certeza que deseja excluir esse cliente?")){
         
         await deleteClient(id)

         getClients()
        };
    }

    return (
        <Container>
            <h3>Clientes</h3>

            { listClients && 
            (
            <>
                <div className="headerTable">
                    <ButtonForm type="button" name="Criar Cliente" onClick={handleShowListOrCreated} colorBackground="green" />
                </div>
            
                <TableContainer>
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
                            <td>
                                <FiEdit size={20} color={'#29292e'} onClick={() => { client.id && handleEditClient(client.id)}} />
                                <FiTrash2 size={20} color={'#f94144'} onClick={() => { client.id && handleDeleteClient(client.id)}} />
                                
                            </td>
                        </>
                        </tr>
                    ) )}
                    </tbody>
                    </table>
                </TableCllient>
                </TableContainer>
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
                            sizeWidth="B"
                        />
                        <Input 
                            type="text"
                            placeholder="E-mail" 
                            id="email"
                            name="Email"
                            onChange={event => setEmail(event.target.value)}
                            value={email}
                            sizeWidth="B"
                         />

                        <Input 
                            type="text"
                            placeholder="Celular" 
                            id="cel_number"
                            name="Telefone celular"
                            onChange={event => setCel_number(event.target.value)}
                            value={cel_number} 
                            sizeWidth="B"
                        />
                        <Input 
                            type="text"
                            placeholder="Endereço" 
                            id="adress"
                            name="Endereço"
                            onChange={event => setAdress(event.target.value)}
                            value={adress}
                            sizeWidth="B"
                        />

                        <div className="ButtonsClient">

                        <ButtonForm type="submit" name="Criar Cliente" colorBackground="green"/>
                        <ButtonForm type="button" onClick={handleShowListOrCreated} name="Listar clientes" colorBackground="green" />

                        </div>
                    </form>
            ) }

            <ModalUpdate idSelected={clientIdSelected} isOpen={modalUpdateClient} typeModal={'client'}  onClose={() => {setModalUpdateClient(false)}} />


        </Container>
    )
}

export default ModalClients