import { Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from '../contexts/AuthContext';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { ProductContextProvider } from '../contexts/ProductContext';

const Routes = () => {
    return (
        <AuthContextProvider>
        <ProductContextProvider>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
        </ProductContextProvider>
        </AuthContextProvider>
    )
}

export default Routes;