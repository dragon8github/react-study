import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { Provider } from 'react-redux'
import createSaga from 'redux-saga'
import createHistory from 'history/createHashHistory'
import MenuReduce from '@Reduces/MenuReduce'
import AuthReduce from '@Reduces/AuthReduce'
import MenuSaga from '@Sagas/MenuSaga'
import AuthSaga from '@Sagas/AuthSaga'
import Layout_TSN from '@Components/layout/top_sider_nav'

const history = createHistory()
const router_middleware = routerMiddleware(history)

let saga  = createSaga()
let store = createStore(combineReducers({
    MenuReduce: MenuReduce,
    AuthReduce: AuthReduce,
    router: routerReducer
}), applyMiddleware(router_middleware, saga))
saga.run(MenuSaga)
saga.run(AuthSaga)

ReactDOM.render(
    <Provider store = { store }>
        <ConnectedRouter history = { history }>
            <Layout_TSN />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)