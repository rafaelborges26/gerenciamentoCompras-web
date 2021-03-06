//Libs - Hooks
import  React, { FormEvent, useState, useEffect } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { useClient } from '../../hooks/useClient';
import { useOrder } from '../../hooks/useOrder';

//UI - Components - Utils
import Input from '../Input';
import Select from '../Select';
import ButtonForm from '../ButtonForm';
import ViewOrderDetailed from '../ViewOrderDetailed'
import formatReal from '../../utils/formatReal';

//Icons
import { FiPlusCircle, FiMinusCircle, FiTrash2, FiExternalLink } from 'react-icons/fi';

//Styles
import { Container, ButtonsOrders, EmptyList, TableContainer, TableCllient, ListProductsSelected, ValueTotal ,EditProducts, QuantityProducts, ContentView } from './styles'

interface formData {
    price_total: number;
    quantity_parcels: number;
    type_payment: string;
    id_client: string;
    id_products: string;
    created_date?: string;
}


interface IProductsList {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    created_date?: string;
    quantity?: number;
}

interface IProductSelected {
    id?: string;
    name?: string;
}

const ModalOrders: React.FC = () => {

    const { products } = useProduct()
    const { clients, getClients } = useClient()
    const { createOrders, orders, getOrders, getParcels, deleteOrder } = useOrder()

    const [price_total, setPrice_total] = useState<number>(0);
    const [type_payment, setType_payment] = useState<string>('');
    const [quantity_parcels, setQuantity_parcels] = useState<number>(1);
    const [clientList, setclientList] = useState<string>('');
    const [productsList, setProductsList] = useState<IProductsList[]>([]);
    const [productSelected, setProductSelected] = useState<IProductSelected>();

    const [parcelDue1, setParcelDue1] = useState('');
    const [parcelDue2, setParcelDue2] = useState('');
    const [parcelDue3, setParcelDue3] = useState('');
    const [parcelDue4, setParcelDue4] = useState('');

    const [isListOrders, setIsListOrders] = useState(false)
    const [isCreateOrders, setIsCreateOrders] = useState(true)
    const [viewOrderDetailed, setViewOrderDetailed] = useState(false)
    const [orderIdSelected, setOrderIdSelected] = useState('')

    const setInitialValues = () => {
        clients && clients[0].id && setclientList(clients[0].id) 
        products && setProductSelected(products[0])
        setType_payment('credit')
        setQuantity_parcels(1)
    }


    const priceTotal = () => {
        let sumPrime = 0

        const allPrice = productsList.map((product => product.price && product.quantity && product.price * product.quantity ))
        
        allPrice.forEach(function (value) {
            if(value){
            sumPrime += value
            }
          })

          setPrice_total(sumPrime)
    }

    const handleCreateOrder = async (event: FormEvent) => {

        event.preventDefault()
        
        //validations
        
        //ver pre??o
        if(price_total === 0 || type_payment.trim() === '' || clientList.trim() === '' || productsList.length === 0) {
            alert("?? necess??rio preencher os campos")
            return;
        }

        //Enviar dados
        
        await createOrders(price_total, type_payment, quantity_parcels, productsList, clientList, parcelDue1, parcelDue2, parcelDue3, parcelDue4 )
        
        //back values default
        setPrice_total(0);
        setType_payment('credit');
        setQuantity_parcels(1);   
        setProductsList([])      

        setParcelDue1('')
        setParcelDue2('')
        setParcelDue3('')
        setParcelDue4('')

        //redirect listagem de pedidos
       }

    const handleAddProduct = () => {

        if(productSelected) {
            const productFound = products?.find(product => product.id === productSelected.id)

        const productAdd = {
            ...productFound,
            quantity: 1
        }

            if(productAdd){   
                setProductsList([...productsList, productAdd])                
            }
        }
        
    }

    const handleIncrementProduct = (id: string) => {
        const ProductFound = productsList.find((product) => product.id === id);
    
        const allProducts = productsList.filter((item) => item.id !== id);
    
        if (ProductFound?.quantity) {

            
            ProductFound.quantity += 1;
        }
    
        if (allProducts && ProductFound) {
            allProducts.push(ProductFound);
        }
    
        setProductsList(allProducts);
      };

      const handleDecrementProduct = (id: string) => {
        const ProductFound = productsList.find((product) => product.id === id);
    
        const allProducts = productsList.filter((item) => item.id !== id);
    
        // se for pra zero
    if (ProductFound?.quantity === 1) {
        setProductsList(allProducts);
        return;
      }

        if (ProductFound?.quantity) {

            ProductFound.quantity -= 1;
        }
    
        if (allProducts && ProductFound) {
            allProducts.push(ProductFound);
        }
    
        setProductsList(allProducts);
      }

      const handleShowListOrCreated = () => {
        
        if(!isListOrders){
            getOrders();
            getParcels()
        }

        setIsListOrders(!isListOrders)
        setIsCreateOrders(!isCreateOrders)
        setViewOrderDetailed(false)
       }

       const handleSelectOrderId = (idOrder: string) => {
            setViewOrderDetailed(true)
             setOrderIdSelected(idOrder)
       }

       const handleDeleteOrder = async (orderId: string) => {
           // eslint-disable-next-line no-restricted-globals
           if(confirm("Tem certeza que deseja excluir esse pedido?")){
            await deleteOrder(orderId)

            getOrders()
           };
       }

       const clientName = (id: string) => {
        const client = clients?.find(client => client.id === id)
        return client?.name || '';
       }

       const typePaymentFormat = (typePayment: string) => {
        
        switch (typePayment) {
            case 'credit':
                return 'Cr??dito';
            case 'debit':
                return 'D??bito'
            case 'pix':
                    return 'Pix'
            case 'money':
                    return 'Dinheiro'
            default:
                return 'N??o definido'
        }
       }

      useEffect(() => {
        setInitialValues()
      },[])

      useEffect(() => {
        priceTotal()
      },[productsList])


    return (
        <Container>
            <h3>Pedidos</h3>

            { isCreateOrders && (
                <form onSubmit={handleCreateOrder}>
                        
                        <Select 
                            name="Produtos" 
                            id="products" 
                            placeholder="Selecione os produtos" 
                            multiselect={false}
                            onChange={event => setProductSelected({id: event.target.value, name: event.target.value})}
                        >
                            { products?.map(product => (
                                <option key={product.id} value={product.id}>{product.name} </option>
                            ))
                                
                            }
                        </Select>
                            <ButtonForm type="button" name="Adicionar" onClick={() => handleAddProduct()} colorBackground="green"/>

                        <ListProductsSelected>

                            { productsList && productsList.map(products =>
                                <EditProducts>
                                    <h4>{products.name}</h4>
                                    <QuantityProducts>
                                    <FiMinusCircle
                                        onClick={() => products.id && handleDecrementProduct(products.id)}
                                    />
                                <span>{products.quantity}</span>
                                    <FiPlusCircle onClick={() => products.id && handleIncrementProduct(products.id)} />
                                    </QuantityProducts>
                                </EditProducts>
                             )}
                        </ListProductsSelected>
                        
                        


                        <Select 
                            name="Cliente" 
                            id="clients" 
                            multiselect={false}
                            onChange={event => setclientList(event.target.value)}

                        >
                            { clients?.map(client => (
                                <option key={client.id} value={client.id}>{client.name} </option>
                            ) ) }
                        </Select>

                        <Select 
                            name="Forma de pagamento" 
                            id="paymentType" 
                            multiselect={false} 
                            onChange={event => setType_payment(event.target.value)} 
                            value={type_payment}
                        >
                            <option value="credit">Cart??o de cr??dito</option>
                            <option value="debit">Cart??o de d??bito</option>
                            <option value="money">Dinheiro</option>
                            <option value="pix">Pix</option>
                        </Select>


                        <Select 
                            name="Parcelas"
                            id="parcels" multiselect={false}
                            onChange={event => setQuantity_parcels(Number(event.target.value))}
                            value={quantity_parcels}
                        >
                            <option value={1}>1x</option>
                            <option value={2}>2x</option>
                            <option value={3}>3x</option>
                            <option value={4}>4x</option>
                        </Select>
                        
                        <Input 
                            name="Data de vencimento da 1?? Parcela" 
                            type="data" placeholder="01/01/2021" 
                            hide={false} 
                            sizeWidth="B"
                            onChange={event => setParcelDue1(event.target.value)} 
                            value={parcelDue1} 
                        />

                        <Input 
                            name="Data de vencimento da 2?? Parcela" 
                            type="data" 
                            placeholder="01/01/2021" 
                            hide={ quantity_parcels < 2 } 
                            sizeWidth="B"
                            onChange={event => setParcelDue2(event.target.value)} 
                            value={parcelDue2} 
                        />

                        <Input  
                            name="Data de vencimento da 3?? Parcela" 
                            type="data" 
                            placeholder="01/01/2021" 
                            hide={ quantity_parcels < 3} 
                            sizeWidth="B"
                            onChange={event => setParcelDue3(event.target.value)} 
                            value={parcelDue3} 
                        />
                        
                        <Input 
                            name="Data de vencimento da 4?? Parcela" 
                            type="data" 
                            placeholder="01/01/2021" 
                            hide={ quantity_parcels !== 4 } 
                            sizeWidth="B"
                            onChange={event => setParcelDue4(event.target.value)} 
                            value={parcelDue4}
                        />

                        <ValueTotal>
                            <span>Valor total:</span>
                            <h5>{formatReal(price_total)}</h5>
                        </ValueTotal>


                        <ButtonsOrders>

                        <ButtonForm type="submit" name="Fazer pedido" colorBackground="green"/>
                        <ButtonForm type="button" name="Listar Pedidos" onClick={handleShowListOrCreated} colorBackground="green"/>

                        </ButtonsOrders>
                    </form>
            )
                                 
            }

            { isListOrders && (
                <>
                <div className="headerTable">
                    <ButtonForm type="button" name="Fazer Pedido" onClick={handleShowListOrCreated} colorBackground="green" />
                </div>
                {orders ? (
                            
                <TableContainer>
                <TableCllient>    
                        <thead>
                        <tr key={"header"}>
                            <th><span>Cliente</span></th>
                            <th><span>Pre??o total</span></th>
                            <th><span>Parcelas</span></th>
                            <th><span>Tipo de pagamento</span></th>
                            <th><span>Data da compra</span></th>
                        </tr>
                        </thead>
                <tbody>
                    {orders && orders.map(order => (
                        <tr key={order.id} >
                        <>
                            <td><p>{clientName(order.client)}</p></td>
                            <td><p>{formatReal(order.price_total)}</p></td>
                            <td><p>{order.quantity_parcels}</p></td>
                            <td><p>{typePaymentFormat(order.type_payment)}</p></td>
                            <td><p>{order.created_date}</p></td>
                            <td>
                                <FiExternalLink size={20} color={'#29292e'} onClick={() => handleSelectOrderId(order.id)}/>
                                <FiTrash2 size={20} color={'#f94144'} onClick={() => {handleDeleteOrder(order.id)}} />
                                
                            </td>
                        </>
                        </tr>
                    ) )}
                    </tbody>
                </TableCllient>
                </TableContainer>
   
                ) : (
                <EmptyList>Listagem de pedidos vazia</EmptyList>
                )}
                </>
            
            ) }
        <ContentView>
        <ViewOrderDetailed orderId={orderIdSelected} isOpen={viewOrderDetailed} onClose={() => setViewOrderDetailed(false)} />
        </ContentView>
        
        </Container>
    )
}

export default ModalOrders