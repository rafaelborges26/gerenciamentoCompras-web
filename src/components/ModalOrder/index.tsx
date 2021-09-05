import  React, { ReactNode, ButtonHTMLAttributes, FormEvent, useState, useCallback } from 'react';
import { format } from 'date-fns'

import { database } from '../../services/firebase';
import Input from '../Input';
import Select from '../Select';
import ButtonForm from '../ButtonForm';
import { Container, TableCllient } from './styles'
import { useProduct } from '../../hooks/useProduct';
import { useEffect } from 'react';

interface formData {
    price_total: number;
    quantity_parcels: number;
    type_payment: string;
    id_client: string;
    id_products: string;
    created_date?: string;
}

const ModalOrders: React.FC = () => {

    const { products } = useProduct()

    console.log("list" ,products)

    const [price_total, setPrice_total] = useState<number>(0);
    const [type_payment, setType_payment] = useState<string>('');
    const [quantity_parcels, setQuantity_parcels] = useState<string>('');
    const [client, setClient] = useState<string>('');
    const [productsList, setProductsList] = useState<string>('');

    const [Orders, setOrders] = useState<formData[]>([])
    const [listOrders, setListOrders] = useState(false)
    const [createOrders, setCreateOrders] = useState(true)

    const handleCreateOrder = async (event: FormEvent) => {

        event.preventDefault()
   
        //validations

        if(price_total === 0 || type_payment.trim() === '' || quantity_parcels.trim() === '' || client.trim() === '' || productsList.trim() === '' ){
            return;
        }

        //Enviar dados
        
        const formattedDate = format(new Date(), 'dd/mm/yyyy');

        const orderRef = database.ref('orders')

        const firebaseOrder = await orderRef.push({
            price_total,
            type_payment,
            quantity_parcels,
            client,
            productsList,
            created_date: formattedDate
        })

        alert("Pedido realizado com sucesso")

        setPrice_total(0);
        setType_payment('');
        setQuantity_parcels('');
        setClient('');
        
       }


    const searchProduct = (productName: string) => {
        console.log("entrou")
        if(products) {
            const searchedProduct = products.find( product => product.name.match(productName))

            console.log(searchedProduct)
            
        }
        
    } 

    return (
        <Container>
            <h3>Pedidos</h3>

            { createOrders && (
                <form onSubmit={handleCreateOrder}>
                        
                        <Select name="Produtos" id="products" placeholder="Selecione os produtos" multiple multiSelect >
                            { products?.map(product => (
                                <option value={product.id}>{product.name}</option>
                            ))
                                
                            }
                        </Select>

                        <Input 
                            type="text"
                            placeholder="20,00" 
                            id="client"
                            name="Cliente"
                            onChange={event => setClient(event.target.value)}
                            value={client}
                        />

                        <Input 
                            type="text"
                            placeholder="20,00" 
                            id="parcels"
                            name="Quantidade de parcelas"
                            onChange={event => setQuantity_parcels(event.target.value)}
                            value={client}
                        />

                        <Select name="cars" id="cars" multiSelect={false}>
                            <option value="1">1x</option>
                            <option value="2">2x</option>
                            <option value="3">3x</option>
                            <option value="4">4x</option>
                        </Select>


                        <Input 
                            type="text"
                            placeholder="20,00" 
                            id="payment"
                            name="Forma de pagamento"
                            onChange={event => setType_payment(event.target.value)}
                            value={type_payment}
                        />
                        <div className="ButtonsOrders">

                        <ButtonForm type="submit" name="Fazer pedido" />
                        <ButtonForm type="button" onClick={() => {}} name="Listar Produtos" />

                        </div>
                    </form>
            ) }

        </Container>
    )
}

export default ModalOrders