import React, {useState, FormEvent, useEffect} from 'react'
import { useAuth } from '../../hooks/useAuth';

import Logo from '../../assets/logo.jpeg';

import { Container, Header, Content } from './styles'

import Button from '../../components/Button'
import ModalClients from '../../components/ModalClients';
import ModalProducts from '../../components/ModalProducts';
import ModalOrders from '../../components/ModalOrder';

const Dashboard: React.FC = () => {

    const [isOrder, setIsOrder] = useState(true);
    const [isProduct, setIsProduct] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const handleClickOrder = () => {
        if(!isOrder){
            setIsOrder(!isOrder)
            setIsProduct(false)
            setIsClient(false)
        }
    }

    const handleClickProduct = () => {
        if(!isProduct) {
            setIsOrder(false)
            setIsProduct(!isProduct)
            setIsClient(false)
        }        
    }

    const handleClickClient = () => {
        if(!isClient) {
            setIsOrder(false)
            setIsProduct(false)
            setIsClient(!isClient)
        }
    }

    return (
        <Container>
            <Header>
                    {/* <img src={Logo} alt="Logo"/> */}
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