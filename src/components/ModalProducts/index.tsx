//Libs - Hooks
import  React, { FormEvent, useState, useEffect } from 'react';
import { useProduct } from '../../hooks/useProduct';

//UI - Components - Utils
import ModalUpdate from '../ModalUpdate';
import Input from '../Input';
import ButtonForm from '../ButtonForm';
import formatReal from '../../utils/formatReal';
import getFormatedDate from '../../utils/formatDate';

//Icons
import { FiTrash2, FiEdit } from 'react-icons/fi';

//Styles
import { Container, TableContainer, TableCllient, EmptyList } from './styles'

const ModalProducts: React.FC = () => {

    const { products, createProducts, getProducts, deleteProduct } = useProduct();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [productIdSelected, setProductIdSelected] = useState('')


    const [listProducts, setListProducts] = useState(false)
    const [createdProducts, setCreatedProducts] = useState(true)
    const [modalUpdateProduct, setModalUpdateProduct] = useState(false)


    const handleCreateUser = async (event: FormEvent) => {

        event.preventDefault()
   
        //validations

        if(name.trim() === '' || description.trim() === '' || price.trim() === ''){
            alert("É Necessário preencher os campos")
            return;
        }

        //Enviar dados
        
        const created_date = getFormatedDate();

        await createProducts(name, description, Number(price), created_date)

        setName('');
        setDescription('');
        setPrice('');

        
       }

       const handleShowListOrCreated = () => {
        setListProducts(!listProducts)
        setCreatedProducts(!createdProducts)
       }

       const handleEditProduct = (idProduct: string) => {
        setModalUpdateProduct(true)
        setProductIdSelected(idProduct)
       }
       
       const handleDeleteProduct = async (id: string) => {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Tem certeza que deseja excluir esse produto?")){
         
         await deleteProduct(id)

         getProducts()
        };
    }


    useEffect(() => {
        getProducts()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[listProducts, modalUpdateProduct])


    return (
        <Container>
            <h3>Produtos</h3>


            { listProducts && 
            (
            <>
                <div className="headerTable">
                    <ButtonForm type="button" name="Criar Produto" onClick={handleShowListOrCreated} colorBackground="green"/>
                </div>
                
                { products ? (
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
                                <td><p>{formatReal(product.price)}</p></td>
                                <td><p>{product.created_date}</p></td>
                                <td>
                                    <FiEdit size={20} color={'#29292e'} onClick={() => { product.id && handleEditProduct(product.id)}} />
                                    <FiTrash2 size={20} color={'#f94144'} onClick={() => { product.id && handleDeleteProduct(product.id)}}/>
                                    
                                </td>
                            </>
                            </tr>
                        ) )}
                        </tbody>
                        </table>
                    </TableCllient>
                    </TableContainer>
                ) : (
                    <EmptyList>Listagem de produtos vazia</EmptyList>
                )
                }
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
                            sizeWidth="B"
                            onChange={event => setName(event.target.value)}
                            value={name}
                        />
                        <Input 
                            type="text"
                            placeholder="Camisa de time do Santos modelo 2020" 
                            id="description"
                            name="Descrição"
                            sizeWidth="B"
                            onChange={event => setDescription(event.target.value)}
                            value={description}
                         />

                        <Input 
                            type="number"
                            placeholder="20,00" 
                            id="price"
                            name="Preço"
                            sizeWidth="B"
                            onChange={event => setPrice(event.target.value)}
                            value={price}
                        />

                        <div className="ButtonsProducts">

                        <ButtonForm type="submit" name="Criar Produto" colorBackground="green"/>
                        <ButtonForm type="button" onClick={handleShowListOrCreated} name="Listar Produtos" colorBackground="green"/>

                        </div>
                    </form>
            ) }

        <ModalUpdate idSelected={productIdSelected} isOpen={modalUpdateProduct} typeModal={'product'}  onClose={() => {setModalUpdateProduct(false)}} />

        </Container>
    )
}

export default ModalProducts