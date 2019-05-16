import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import Layout from './hoc/layout';
import BookView from './components/Books';
import Login from './containers/Admin/login';

import Auth from './hoc/auth'
import User from './components/Admin';
import AddBook from './containers/Admin/add';
import userPosts from './containers/Admin/userPosts';
import editPosts from './containers/Admin/editPosts';
import Register from './containers/Admin/register';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home,null)} />
                <Route path="/books/:id" exact component={Auth(BookView)} />
                <Route path="/login" exact component={Auth(Login,false)} />
                <Route path="/user" exact component={Auth(User,true)} />
                <Route path="/user/add" exact component={Auth(AddBook,true)} />
                <Route path="/user/user-reviews" exact component={Auth(userPosts, true)} />
                <Route path="/user/edit-post/:bookId" exact component={Auth(editPosts, true)} />
                <Route path="/register" exact component={Auth(Register, true)} />
            </Switch>
        </Layout>
    );
}

export default Routes;
