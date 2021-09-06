import { Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from '../contexts/AuthContext';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { ProductContextProvider } from '../contexts/ProductContext';
import { ClientContextProvider } from '../contexts/ClientContext';



const Routes = () => {
    return (
        <AuthContextProvider>
        <ProductContextProvider>
            <ClientContextProvider>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
            </ClientContextProvider>
        </ProductContextProvider>
        </AuthContextProvider>
    )
}

export default Routes;