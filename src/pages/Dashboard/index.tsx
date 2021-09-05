import React, {useState, FormEvent, useEffect} from 'react'
import { useAuth } from '../../hooks/useAuth';

import Logo from '../../assets/logo.jpeg';

import { Container, Header, Content } from './styles'

import Button from '../../components/Button'
import ModalClients from '../../components/ModalClients';
import ModalProducts from '../../components/ModalProducts';
import ModalOrders from '../../components/ModalOrder';
import { useProduct } from '../../hooks/useProduct';

const Dashboard: React.FC = () => {

    const { getProducts } = useProduct();

    const [isOrder, setIsOrder] = useState(false);
    const [isProduct, setIsProduct] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const handleClickOrder = () => {
        setIsOrder(!isOrder)
        setIsProduct(false)
        setIsClient(false)
    }

    const handleClickProduct = () => {
        setIsOrder(false)
        setIsProduct(!isProduct)
        setIsClient(false)
    }

    const handleClickClient = () => {
        setIsOrder(false)
        setIsProduct(false)
        setIsClient(!isClient)
    }

    return (
        <Container>
            <Header>
                    <img src={Logo} alt="Logo"/>
                <div className="Options">
                    <Button name="Pedido" id="order" onClick={handleClickOrder} />
                    <Button name="Produto" id="product" onClick={handleClickProduct}/>
                    <Button name="Cliente" id="client" onClick={handleClickClient}/>
                </div>
            </Header>

            <Content>
                { isOrder && (
                    <ModalOrders /> 
                    )
                }
                { isProduct && (
                    <ModalProducts />
                ) }
                { isClient && (
                    <ModalClients />
                )

                }

            </Content>

        </Container>
    )
}

export default Dashboard;