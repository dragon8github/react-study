import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd'
import UserReduce from '@Reduces/UserReduce'

function mapStateToProps (state) {
    return {
        visible: state.UserReduce.showlogin
    }
}

function mapDispatchToProps (dispatch) { 
    return {
       submitLogin: () => {
            alert('测试登录')
       }
    }
}

class UserLogin extends React.Component {
    render () {
        const { visible, submitLogin } = this.props
        return <Modal title = '用户登录' visible = { visible } onOk = { submitLogin } >
            <p>这里放用户登录表单，下节课做</p>
        </Modal>
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserLogin)