import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from "react-redux";
import { createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers'
import Routes from './routes';

const createStoreFromMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreFromMiddleware(reducers)}>
        <Router>
            <Routes />
        </Router>
    </Provider>
    ,document.getElementById('root')
)