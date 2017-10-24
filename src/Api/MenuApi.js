import axios from 'axios'
import config, { apiHost } from './ApiConfig'

export default class MenuApi {
    static getMenuData () {
       return axios.get(apiHost + config.menu).then(result => result.data)
    }
}