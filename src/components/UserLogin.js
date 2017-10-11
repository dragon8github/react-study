import React from 'react'
import Passport from '../core/Passport'

export default class UserLogin extends React.Component {
    constructor (props) {
        super(props)
        this.passport = this.props.passport == null ? new Passport() : this.props.passport
    }
    login (e) {
        if (!(e.keyCode) || e.keyCode === 13) {
            this.passport.ulogin(this.userNameInput.value, this.userPassInput.value).then(data => {
                this.props.history.push('/news')
            }).catch(err => {
                window.alert(err.msg);
            })   
        }
    }
    render () {
        return <div>
            <h3>这是登录界面</h3>
            <div><span>用户名：</span><input ref = { ele => this.userNameInput = ele } onKeyUp = { this.login.bind(this) } type = 'text'    /></div>            
            <div><span>密 码： </span><input ref = { ele => this.userPassInput = ele } onKeyUp = { this.login.bind(this) } type = 'password'/></div>
            <div><button onClick = { this.login.bind(this) }> 登录 </button></div>
        </div>
    }
}