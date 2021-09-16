import  React, { ReactNode, ButtonHTMLAttributes, FormEvent, useState, useCallback } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { format } from 'date-fns'

import { database } from '../../services/firebase';
import Input from '../Input';
import ButtonForm from '../ButtonForm';
import { Container, TableCllient } from './styles'
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

       const handleShowProducts = async () => {
        
        setListProducts(true)
        setCreatedProducts(false)   
       }

       const handleShowCreateProducts = () => {
        setListProducts(false)
        setCreatedProducts(true)

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
                    <ButtonForm type="button" name="Criar Produto" onClick={handleShowCreateProducts} />
                </div>
            
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
                        </>
                        </tr>
                    ) )}
                    </tbody>
                    </table>
                </TableCllient>
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

                        <ButtonForm type="submit" name="Criar Produto" />
                        <ButtonForm type="button" onClick={handleShowProducts} name="Listar Produtos" />

                        </div>
                    </form>
            ) }

        </Container>
    )
}

export default ModalProducts