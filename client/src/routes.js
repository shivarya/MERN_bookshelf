import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import Layout from './hoc/layout';
import BookView from './components/Books';
import Login from './containers/Admin/login';

import Auth from './hoc/auth'
import User from './components/Admin';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home,null)} />
                <Route path="/books/:id" exact component={Auth(BookView)} />
                <Route path="/login" exact component={Auth(Login,false)} />
                <Route path="/user" exact component={Auth(User,true)} />
            </Switch>
        </Layout>
    );
}

export default Routes;
