import axios from 'axios'
import config,{ apiHost } from './ApiConfig'
export default class UserApi {
    static loadUserFromStorage () {
        let userName  = window.localStorage.getItem('user_name')
        let userToken = window.localStorage.getItem('user_token')
        if (userName === null || userToken === null) 
            return null
        return {userName,userToken}
    }
    static setUserInfoToStorage (result) {
        const userObject = { user_name: result.username, user_token: result.token }
        window.localStorage.setItem('user_name', userObject.user_name)
        window.localStorage.setItem('user_token', userObject.user_token)
        return userObject
    }
}