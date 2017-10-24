import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { withRouter } from 'react-router'
import { connect }    from 'react-redux'
import { BaseError }  from "@Components/Error"
import { MessageHoc } from "@Components/Hoc"
import actions  from '@Actions/CommonAction'
import AddUser  from "@Components/user/addUser"
import ListUser from "@Components/user/listUser"

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const userIsAuthenticated = connectedRouterRedirect({
    redirectPath: '/error',
    authenticatedSelector: state => {
        console.log(state)
        let isAuth = false
        var url = state.router.location.pathname
        var permissions = state.AuthReduce.data.permissions
        for (let [index, ele] of permissions.entries()) {
            if (url === ele.url) {
                return isAuth = true
            }
        }
        return isAuth
    }
})

class Top_Sider_Nav extends React.Component {
    componentWillMount () {
       const { loadMenu, loadAuth } = this.props
       loadMenu()
       loadAuth()
    }
    render () {
        const { menuList, authList } = this.props

        return  <Layout>
                    <Header className  = 'header'>
                        <div className = 'logo' />
                        <Menu
                            theme = 'dark'
                            mode  = 'horizontal'
                            defaultSelectedKeys = {['2']}
                            style = {{ lineHeight: '64px' }}
                        >
                            <Menu.Item key = '1'> nav 1 </Menu.Item>
                            <Menu.Item key = '2'> nav 2 </Menu.Item>
                            <Menu.Item key = '3'> nav 3 </Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width = { 200 } style = {{ background: '#fff' }}>
                            <Menu
                                mode = 'inline'
                                defaultSelectedKeys = {['1']}
                                defaultOpenKeys = {['100', '101']}
                                style = {{ height: '100%', borderRight: 0 }}
                            >
                                {
                                    menuList.map(item => {
                                        return <SubMenu key = { item.id } title = { <span><Icon type = { item.icon } />{ item.name }</span> }>
                                            {
                                                item.subMenu.map(sub => {
                                                    return <Menu.Item key = { sub.id }><Link to = { sub.link }>{ sub.name }</Link></Menu.Item>
                                                })
                                            }
                                        </SubMenu>
                                    })
                                }
                            </Menu>
                        </Sider>
                        <Layout style = {{ padding: '0 24px 24px' }}>
                            <Breadcrumb style = {{ margin: '12px 0' }}>
                                <Breadcrumb.Item> Home </Breadcrumb.Item>
                                <Breadcrumb.Item> List </Breadcrumb.Item>
                                <Breadcrumb.Item> App  </Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style = {{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                <Route exact path = '/' component = {() => {
                                    return <div>
                                        <h2>测试组件首页</h2>
                                    </div>
                                }}/>
                                <Route path = '/user/add'  component = { userIsAuthenticated(AddUser)         }/>
                                <Route path = '/user/list' component = { userIsAuthenticated(ListUser)        }/>
                                <Route path = '/error'     component = { MessageHoc('您没有权限')(BaseError)  }/>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
    }
}

function mapStateToProps (state) {
    return {
        // @Reduces/MenuReduce.js
        menuList: state.MenuReduce.data,
        authList: state.AuthReduce.data
    }
}

function mapDispatchToProps (dispatch) {
    return {
        loadMenu: () => {
            // @Sagas/MenuSaga.js
            // 【INIT_LOAD_MENU】
            dispatch(actions.LoadMenu())
        },
        loadAuth: () => {
            // @Sagas/AuthSaga.js
            // 【GET_USER_AUTH】
            dispatch(actions.GetUserAuth())
        }
    }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Top_Sider_Nav)

export default withRouter(App)