import React from 'react'
import Logo from '../../assets/logo.jpeg';

import { Container, Header } from './styles'

const Dashboard: React.FC = () => {
    return (
        <Container>
            <Header>
                    <img src={Logo} alt="Logo"/>
                <div className="Options">
                    <button>Produto</button>
                    <button>Cliente</button>
                    <button>Pedido</button>
                </div>
            </Header>
        </Container>
    )
}

export default Dashboard;