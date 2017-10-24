import axios from 'axios'
import config, { apiHost } from './ApiConfig'

export default class AuthApi {
    static getAuthData () {
       return axios.get(apiHost + config.auth).then(result => result.data)
    }
}