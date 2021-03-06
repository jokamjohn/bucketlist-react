import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import './css/index.css'
import 'bootstrap/dist/js/bootstrap.min'
import './containers/Application'
import Application from './containers/Application'
import rootReducer from "./reducers/rootReducer";
import '../node_modules/toastr/build/toastr.min.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
    <Provider store={store}>
      <Application/>
    </Provider>,
    document.getElementById('root')
);


