import  React, { ReactNode, ButtonHTMLAttributes, FormEvent, useState, useCallback } from 'react';
import { format } from 'date-fns'
import { FiPlusCircle, FiMinusCircle, FiTrash2 } from 'react-icons/fi';

import { database } from '../../services/firebase';
import Input from '../Input';
import Select from '../Select';
import ButtonForm from '../ButtonForm';
import { Container, TableCllient, ListProductsSelected, EditProducts, QuantityProducts } from './styles'
import { useProduct } from '../../hooks/useProduct';
import { useClient } from '../../hooks/useClient';
import { useEffect } from 'react';

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
    name: string;
    description: string;
    price: string;
    created_date: string;
}

interface IProducts {
    id: string;
    name: string;
}

const ModalOrders: React.FC = () => {

    const { products } = useProduct()
    const { clients } = useClient()

    const [price_total, setPrice_total] = useState<number>(0);
    const [type_payment, setType_payment] = useState<string>('');
    const [quantity_parcels, setQuantity_parcels] = useState<string>('');
    const [clientsList, setClientsList] = useState<string>('');
    const [productsList, setProductsList] = useState<IProductsList[]>([]);
    const [productSelected, setProductSelected] = useState<IProducts>();


    const [Orders, setOrders] = useState<formData[]>([])
    const [listOrders, setListOrders] = useState(false)
    const [createOrders, setCreateOrders] = useState(true)

    console.log(productsList)

    const handleCreateOrder = async (event: FormEvent) => {

        event.preventDefault()
   
        //validations

        if(price_total === 0 || type_payment.trim() === '' || quantity_parcels.trim() === '' || clientsList.trim() === ''){
            return;
        }

        //Enviar dados
        
        const formattedDate = format(new Date(), 'dd/mm/yyyy');

        const orderRef = database.ref('orders')

        const firebaseOrder = await orderRef.push({
            price_total,
            type_payment,
            quantity_parcels,
            productsList,
            clientsList,
            created_date: formattedDate
        })

        alert("Pedido realizado com sucesso");

        setPrice_total(0);
        setType_payment('');
        setQuantity_parcels('');        
       }

    const handleAddProduct = () => {

        if(productSelected) {
            const productFound = products?.find(product => product.id === productSelected.id)

            if(productFound){   
                setProductsList([...productsList, productFound])                
            }
        }
        
    }

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
                            multiSelect={true}
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
                                        onClick={() => console.log("mais")}
                                    />
                                1
                                    <FiPlusCircle onClick={() => console.log("menos")} />
                                    </QuantityProducts>
                                </EditProducts>
                             )}
                        </ListProductsSelected>
                        
                        


                        <Select 
                            name="Cliente" 
                            id="clients" 
                            multiSelect={false}
                            onChange={event => setClientsList(event.target.value)}

                        >
                            { clients?.map(client => (
                                <option key={client.id} value={client.id}>{client.name} </option>
                            ) ) }
                        </Select>

                        <Select 
                            name="Forma de pagamento" 
                            id="paymentType" 
                            multiSelect={false} 
                            onChange={event => setType_payment(event.target.value)} 
                        >
                            <option value="credit">Cartão de crédito</option>
                            <option value="debit">Cartão de débito</option>
                            <option value="money">Dinheiro</option>
                            <option value="pix">Pix</option>
                        </Select>


                        <Select 
                            name="Parcelas"
                            id="parcels" multiSelect={false}
                            onChange={event => setQuantity_parcels(event.target.value)}
                        >
                            <option value="1">1x</option>
                            <option value="2">2x</option>
                            <option value="3">3x</option>
                            <option value="4">4x</option>
                        </Select>

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