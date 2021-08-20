import  React, { ReactNode, ButtonHTMLAttributes, FormEvent, useState } from 'react';
import { Container, TableCllient } from './styles'

import { database } from '../../services/firebase';
import Input from '../Input';
import ButtonForm from '../ButtonForm';


interface formData {
    name: string;
    description: string;
    price: string;
    created_date?: number;
}

const ModalProducts: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [products, setProducts] = useState<formData[]>([])
    const [listProducts, setListProducts] = useState(false)
    const [createProducts, setCreateProducts] = useState(true)



    const handleCreateUser = async (event: FormEvent) => {

        event.preventDefault()
   
        //validations

        if(name.trim() === '' || description.trim() === '' || price.trim() === ''){
            return;
        }

        //Enviar dados
   
        const clientRef = database.ref('products')

        const firebaseProduct = await clientRef.push({
            name: name,
            description: description,
            price: price,
            created_date: new Date().getTime()
        })

        alert("Cadastro criado com sucesso")

        setName('');
        setDescription('');
        setPrice('');

        
       }

       const handleShowProducts = async () => {
        
        setListProducts(true)
        setCreateProducts(false)

           //faz um select no banco buscando por esse key
           const ProductsRef = await database.ref('products').get(); 
   
           const ProductsAll: formData = ProductsRef.val()

           const parsedProducts = Object.entries(ProductsAll).map(([key, value]) => {
            return {
                id: key,
                name: value.name,
                description: value.description,
                price: value.price,
                created_date: value.created_date
            }
    })

    setProducts(parsedProducts)
   
       }

       const handleShowCreateProducts = () => {
        setListProducts(false)
        setCreateProducts(true)

       }

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
                    {products.map(product => (
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

            { createProducts && (
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
                            type="text"
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