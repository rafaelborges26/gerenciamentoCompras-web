import React, {useState, FormEvent} from 'react'
import Logo from '../../assets/logo.jpeg';
import { database } from '../../services/firebase';

import { Container, Header, Content } from './styles'

import Button from '../../components/Button'

const Dashboard: React.FC = () => {

    interface formData {
        name: string;
        email: string;
        cel_number: string;
        adress: string;
    }

    const [isOrder, setIsOrder] = useState(false);
    const [isProduct, setIsProduct] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [cel_number, setCel_number] = useState<string>('');
    const [adress, setAdress] = useState<string>('');


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

    const handleCreateUser = async (event: FormEvent) => {
     event.preventDefault()

     //Enviar dados
     const clientRef = database.ref('clients')
     const firebaseClient = await clientRef.push({
         name: name,
         email: email,
         cel_number: cel_number,
         adress: adress,
         //created_date: new Date()
     })

     console.log(firebaseClient)
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
                    <>
                    <h5>Cliente</h5> 
                    <form onSubmit={handleCreateUser}>
                        <label>Nome</label>
                        <input 
                            type="text"
                            placeholder="Name" 
                            id="name" 
                            onChange={event => setName(event.target.value)}
                        />
                        <label>E-mail</label>
                        <input 
                            type="text"
                            placeholder="E-mail" 
                            id="email"
                            onChange={event => setEmail(event.target.value)}
                         />

                        <label>Telefone celular</label>
                        <input 
                            type="text"
                            placeholder="Celular" 
                            id="cel_number"
                            onChange={event => setCel_number(event.target.value)} 
                        />

                        <label>Endereço</label>
                        <input 
                            type="text"
                            placeholder="Endereço" 
                            id="adress"
                            onChange={event => setAdress(event.target.value)}
                        />

                        <button type="submit">Criar Cliente</button>
                    </form>

                    </>
                )
                }
                
            </Content>

        </Container>
    )
}

export default Dashboard;