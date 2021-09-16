import  React, { ReactNode, ButtonHTMLAttributes, FormEvent, useState, useCallback } from 'react';
import { format } from 'date-fns'
import { FiPlusCircle, FiMinusCircle, FiTrash2 } from 'react-icons/fi';

import { database } from '../../services/firebase';
import Input from '../Input';
import Select from '../Select';
import ButtonForm from '../ButtonForm';
import { Container, TableCllient, ListProductsSelected, ValueTotal ,EditProducts, QuantityProducts } from './styles'
import { useProduct } from '../../hooks/useProduct';
import { useClient } from '../../hooks/useClient';
import { useEffect } from 'react';
import { useMemo } from 'react';
import formatReal from '../../utils/formatReal';

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
    id: string;
    name: string;
}

const ModalOrders: React.FC = () => {

    const { products } = useProduct()
    const { clients } = useClient()

    const [price_total, setPrice_total] = useState<number>(0);
    const [type_payment, setType_payment] = useState<string>('');
    const [quantity_parcels, setQuantity_parcels] = useState<number>(1);
    const [clientList, setclientList] = useState<string>('');
    const [productsList, setProductsList] = useState<IProductsList[]>([]);
    const [productSelected, setProductSelected] = useState<IProductSelected>();


    const [Orders, setOrders] = useState<formData[]>([])
    const [listOrders, setListOrders] = useState(false)
    const [createOrders, setCreateOrders] = useState(true)

    const setInitialValues = () => {
        clients && clients[0].id && setclientList(clients[0].id) 
    
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
   
        console.log(type_payment)
        console.log(clientList)
        console.log(quantity_parcels)
        
        //validations
        
        //ver preço
        if(price_total === 0 || type_payment.trim() === '' || clientList.trim() === '' || productsList.length === 0) {
            alert("É necessário preencher os campos")
            return;
        }

        //Enviar dados
        
        const formattedDate = format(new Date(), 'dd/mm/yyyy');

        const orderRef = database.ref('orders')

        const firebaseOrder = await orderRef.push({
            price_total,
            type_payment,
            quantity_parcels,
            products: productsList,
            client: clientList,
            created_date: formattedDate
        })

        alert("Pedido realizado com sucesso");

        //back values default
        setPrice_total(0);
        setType_payment('credit');
        setQuantity_parcels(1);   
        setProductsList([])      

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

      useEffect(() => {
        setInitialValues()
      },[])

      useEffect(() => {
        priceTotal()
      },[productsList])


    return (
        <Container>
            <h3>Pedidos</h3>

            { createOrders && (
                <form onSubmit={handleCreateOrder}>
                        
                        <Select 
                            name="Produtos" 
                            id="products" 
                            placeholder="Selecione os produtos" 
                            multiple 
                            multiselect
                            onChange={event =>  setProductSelected({id: event.target.value, name: event.target.value})}
                        >
                            { products?.map(product => (
                                <option key={product.id} value={product.id}>{product.name} </option>
                            ))
                                
                            }
                        </Select>
                            <ButtonForm type="button" name="Adicionar" onClick={() => handleAddProduct()} />

                        <ListProductsSelected>

                            { productsList && productsList.map(products =>
                                <EditProducts>
                                    <h4>{products.name}</h4>
                                    <QuantityProducts>
                                    <FiMinusCircle
                                        onClick={() => products.id && handleDecrementProduct(products.id)}
                                    />
                                {products.quantity}
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
                            <option value="credit">Cartão de crédito</option>
                            <option value="debit">Cartão de débito</option>
                            <option value="money">Dinheiro</option>
                            <option value="pix">Pix</option>
                        </Select>


                        <Select 
                            name="Parcelas"
                            id="parcels" multiselect={false}
                            onChange={event => setQuantity_parcels(Number(event.target.value))}
                        >
                            <option value="1">1x</option>
                            <option value="2">2x</option>
                            <option value="3">3x</option>
                            <option value="4">4x</option>
                        </Select>
                        
                        <ValueTotal>
                            <span>Valor total:</span>
                            <h5>{formatReal(price_total)}</h5>
                            
                        </ValueTotal>


                        <div className="ButtonsOrders">

                        <ButtonForm type="submit" name="Fazer pedido" />
                        <ButtonForm type="button" onClick={() => {}} name="Listar Pedidos" />

                        </div>
                    </form>
            ) }

        </Container>
    )
}

export default ModalOrders