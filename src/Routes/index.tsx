import { Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from '../contexts/AuthContext';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const Routes = () => {
    return (
        <AuthContextProvider>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
        </AuthContextProvider>
    )
}

export default Routes;