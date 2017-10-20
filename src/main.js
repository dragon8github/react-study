// react
import React from 'react'
import ReactDOM from 'react-dom'

// redux
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

// router + history
import {Route, Link } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

// redux-middleware
import thunk from 'redux-thunk'
import createSaga from 'redux-saga'
import { Review_saga_load, Review_saga_post } from './redux/ReviewSaga'

// 第三方插件
import axios from 'axios'

// reducers
import { NewsReduce, ReviewReduce } from './redux/reducers'

// 我的组件
import NewsReview from './components/NewsReview'
import NewsList   from './components/NewsList'

const history = createHistory()
const router_middleware = routerMiddleware(history)
let saga = createSaga();
const store = createStore(
    combineReducers({
        NewsReduce   : NewsReduce,
        ReviewReduce : ReviewReduce,
        router       : routerReducer
    }),
    applyMiddleware(router_middleware, thunk, saga)
)
saga.run(Review_saga_load)
saga.run(Review_saga_post)

ReactDOM.render(
    <Provider store = { store }>
        <ConnectedRouter history = { history }>
            <div>
                <ul>
                    <li><Link to = '/'>       头条新闻 </Link></li>
                    <li><Link to = '/news'>   新闻列表 </Link></li>
                    <li><Link to = '/review'> 新闻评论 </Link></li>
                </ul>
                <Route exact path = '/'       component = { NewsList }/>
                <Route       path = '/news'   component = { NewsList }/>
                <Route       path = '/review' component = { NewsReview }/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)