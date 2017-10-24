import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Spin  } from 'antd'
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom'
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
        // 获取当前url
        var url = state.router.location.pathname
        // 获取当前权限所支持url列表
        var permissions = state.AuthReduce.data.permissions || []
        // 遍历该列表是否包含当前url
        for (let [index, ele] of permissions.entries()) {
            if (url === ele.url) 
                return true
        }
        return false
    }
})

class Top_Sider_Nav extends React.Component {
    componentWillMount () {
       // 获取所有的handle
       const { loadMenu, loadAuth } = this.props
       // 加载菜单
       loadMenu()
       // 加载权限
       loadAuth()
    }    
    render () {
        // 获取所有的state
        const { menuList, authList } = this.props
        // 获取权限列表
        let permissions = authList.permissions || []
        // 当前url
        let currUrl = this.props.location.pathname
        // 默认显示加载图
        let myroute = currUrl === '/' ? <div></div> : <Spin />
        // 我目前的做法是，左侧列表依然存在，但需要等待权限读取完毕才可以渲染右侧界面
        // 如果state更新，会重新调用render，这是react-redux的自动化特性。所以我们一直判断是否有值即可。
        // 其实配合Loading还是不错的。
        // TODO：缺乏自动根据url地址，active左侧对应item
        // TODO: 我希望他点击某些item之后才开始(也就是进入url才开始).而不是默认就展示loading，会和index冲突
        if (permissions.length) {
            myroute = (<div>
                <Route path = '/user/add'  component = { userIsAuthenticated(AddUser)        }/>
                <Route path = '/user/list' component = { userIsAuthenticated(ListUser)       }/>
                <Route path = '/error'     component = { MessageHoc('您没有权限')(BaseError) }/> 
            </div>)
        }

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
                                defaultOpenKeys = {['1000', '1010']}
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
                                { myroute }
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