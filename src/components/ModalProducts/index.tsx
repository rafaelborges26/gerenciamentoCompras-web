import  React, { ReactNode, ButtonHTMLAttributes, FormEvent, useState, useCallback } from 'react';
import { FiTrash2, FiEdit, FiExternalLink } from 'react-icons/fi';

import { useProduct } from '../../hooks/useProduct';
import { format } from 'date-fns'

import { database } from '../../services/firebase';
import Input from '../Input';
import ButtonForm from '../ButtonForm';
import { Container, TableContainer, TableCllient } from './styles'
import { useEffect } from 'react';

const ModalProducts: React.FC = () => {

    const { products, createProducts, getProducts } = useProduct();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [listProducts, setListProducts] = useState(false)
    const [createdProducts, setCreatedProducts] = useState(true)

    const handleCreateUser = async (event: FormEvent) => {

        event.preventDefault()
   
        //validations

        if(name.trim() === '' || description.trim() === '' || price.trim() === ''){
            alert("É Necessário preencher os campos")
            return;
        }

        //Enviar dados
        
        const created_date = format(new Date(), 'dd/mm/yyyy');

        await createProducts(name, description, Number(price), created_date)

        alert("Cadastro criado com sucesso")

        setName('');
        setDescription('');
        //setPrice(0);

        
       }

       const handleShowListOrCreated = () => {
        setListProducts(!listProducts)
        setCreatedProducts(!createdProducts)
       }



    useEffect(() => {
        getProducts()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[listProducts])


    return (
        <Container>
            <h3>Produtos</h3>


            { listProducts && 
            (
            <>
                <div className="headerTable">
                    <ButtonForm type="button" name="Criar Produto" onClick={handleShowListOrCreated} colorBackground="green"/>
                </div>
                
                <TableContainer>
                <TableCllient>
                    
                    <table>
                        <thead>
                        <tr>
                            <th><span>Nome</span></th>
                            <th><span>Descrição</span></th>
                            <th><span>Preço</span></th>
                            <th><span>Data de criação</span></th>
                        </tr>
                        </thead>
                <tbody>
                    {products && products.map(product => (
                        <tr>
                        <>
                            <td><p>{product.name}</p></td>
                            <td><p>{product.description}</p></td>
                            <td><p>{product.price}</p></td>
                            <td><p>{product.created_date}</p></td>
                            <td>
                                <FiExternalLink size={20} color={'#29292e'}/>
                                <FiEdit size={20} color={'#29292e'}/>
                                <FiTrash2 size={20} color={'#f94144'}/>
                                
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

            { createdProducts && (
                <form onSubmit={handleCreateUser}>
                        <Input 
                            type="text"
                            placeholder="Camisa do Santos" 
                            id="name" 
                            name="Nome"
                            onChange={event => setName(event.target.value)}
                            value={name}
                        />
                        <Input 
                            type="text"
                            placeholder="Camisa de time do Santos modelo 2020" 
                            id="description"
                            name="Descrição"
                            onChange={event => setDescription(event.target.value)}
                            value={description}
                         />

                        <Input 
                            type="number"
                            placeholder="20,00" 
                            id="price"
                            name="Preço"
                            onChange={event => setPrice(event.target.value)}
                            value={price}
                        />

                        <div className="ButtonsProducts">

                        <ButtonForm type="submit" name="Criar Produto" colorBackground="green"/>
                        <ButtonForm type="button" onClick={handleShowListOrCreated} name="Listar Produtos" colorBackground="green"/>

                        </div>
                    </form>
            ) }

        </Container>
    )
}

export default ModalProducts