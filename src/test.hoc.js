import React from 'react'
import ReactDOM from 'react-dom'

class UserList extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
       const { title, datalist, showTest } = this.props
       return <div>
           <h2> { title } </h2>
           <ul>
               {
                  datalist.map(item => {
                      return <li key = { item }> { item } </li>
                  })
               }
           </ul>
           <input type = 'button' value = '测试方法' onClick = { showTest }/>
       </div>
   }
}

class Abc extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        const { title, datalist, showTest } = this.props
        return <div>
            <h2> { title } abc </h2>
            <ul>
                {
                    datalist.map(item => {
                        return <li key = { item }> { item } </li>
                    })
                }
            </ul>
            <input type = 'button' value = '测试方法' onClick = { showTest }/>
        </div>
    }
}

function mapStateToProps () {
    return {
        title: '用户列表',
        datalist: ['张三', '李四']
    }
}

function mapDispatchToHandler () { 
    return {
        showTest: () => {
            alert('高阶组件测试方法')
        }
    }
}

function Hoc (mapStateToProps, mapDispatchToHandler) {
    const props = Object.assign({}, mapStateToProps(), mapDispatchToHandler())

    return function (Component) {
        return class extends React.Component {
            render () {
                return <Component {...props} />
            }
        }
    }
}

const App = Hoc(mapStateToProps, mapDispatchToHandler)(Abc)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)