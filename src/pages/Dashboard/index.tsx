import React, {useState, FormEvent} from 'react'
import Logo from '../../assets/logo.jpeg';

import { Container, Header, Content } from './styles'

import Button from '../../components/Button'
import ModalClients from '../../components/ModalClients';

const Dashboard: React.FC = () => {

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
                    <h5>Pedido</h5> 
                    )
                }
                { isProduct && <h5>Product</h5> }
                { isClient && (
                    <ModalClients />
                )

                }

            </Content>

        </Container>
    )
}

export default Dashboard;