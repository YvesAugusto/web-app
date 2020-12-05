import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React from 'react';

import Login from './pages/Login';
import SignIn from './pages/Sign in';
import Perfil from './pages/Conta';
import NovoUsuario from './pages/NovoUsuario';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/cadastro" exact component={SignIn} />
                <Route path="/perfil" exact component={Perfil} />
                <Route path="/usuarios/new" exact component={NovoUsuario} />
            </Switch>
        </BrowserRouter>
    );
}