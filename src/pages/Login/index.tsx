import React from 'react'
import { auth, firebase } from '../../services/firebase'
import { useHistory } from 'react-router-dom'

//Icons & Images
import Logo from '../../assets/logo.jpeg';
import { useAuth } from '../../hooks/useAuth';

import { Container, Header, Content, Modal } from './styles';

const Login: React.FC = () => { 

    const history = useHistory();

    const { SignInWithGoogle, user } = useAuth();

    const handleSignIn = async () => {
        if(!user) {
            await SignInWithGoogle();
        }

        console.log("logou")
        history.push('/dashboard')
    }

    return (
        <Container>
            <Header>
                    <img src={Logo} alt="Logo"/>
                <div className="Login">
                    <button onClick={handleSignIn} >Register</button>
                </div>
                
            </Header>
            
            <Content>
                <h5>Content</h5>
                <Modal>
                    <span>Bem vindo</span>
                    <button>Login com o Google</button>
                </Modal>
            </Content>
        </Container>
    )
}

export default Login;