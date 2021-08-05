import React from 'react'
import Logo from '../../assets/logo.jpeg';

import { Container, Header } from './styles'

import Button from '../../components/Button'

const Dashboard: React.FC = () => {
    return (
        <Container>
            <Header>
                    <img src={Logo} alt="Logo"/>
                <div className="Options">
                    <Button name="Pedido"/>
                    <Button name="Produto"/>
                    <Button name="Cliente"/>
                </div>
            </Header>
        </Container>
    )
}

export default Dashboard;