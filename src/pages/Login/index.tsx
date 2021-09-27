import React from 'react'
import { auth, firebase } from '../../services/firebase'
import { useHistory } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi";


//Icons & Images
import Logo from '../../assets/logo.jpeg';
import { useAuth } from '../../hooks/useAuth';
import GoogleIcon from '../../assets/icons/google-icon.svg';

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
                    <button onClick={handleSignIn}>
                        Entre
                        <FiLogIn />
                    </button>
                </div>
                
            </Header>
            
            <Content>
                <Modal>
                    <strong>Bem vindo (a),</strong>
                    
                    <div className="LoginGoogle">
                    <p>Entre com o Google para iniciar a sessão</p>
                        <button onClick={handleSignIn}>
                            <img src={GoogleIcon} alt="icone do Google" />
                            Login com o Google
                        </button>

                    </div>
                </Modal>
            </Content>
        </Container>
    )
}

export default Login;