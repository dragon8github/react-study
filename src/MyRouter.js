import React from 'react'
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import ProductListToplist from './components/ProductTopList'
import NewsTopList from './components/NewsTopList'
import InfoDetail from './components/InfoDetail'
import UserLogin from './components/UserLogin'
import Passport from './core/Passport';

let passport = new Passport()

export default class MyRouter extends React.Component {
    render () {
        return  <Router>
            <div>
                <ul>
                    <li><Link to = '/'        >首页      </Link></li>
                    <li><Link to = '/products'>商品排行榜</Link></li>
                    <li><Link to = '/news'    >新闻排行榜</Link></li>
                    <li><Link to = '/login'   >登录      </Link></li>
                </ul>

                <Route exact     path = '/'             component = { ProductListToplist }/>
                <Route           path = '/products'     component = { ProductListToplist }/>
                <Route           path = '/news/:newsid' component = { InfoDetail }/>  
                <Route exact     path = '/news'         render    = { props => passport.islogin ? <NewsTopList { ...props }/> : <Redirect to = '/login'/>}/> 
                <Route           path = '/login'        render    = { props => <UserLogin passport = { passport } { ...props } />}/>
            </div>
        </Router>
    }
}