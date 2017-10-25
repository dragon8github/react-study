import UserApi from '@Api/UserApi'
export default (state = { userinfo: {}, showlogin: false }, action) => {
    if (action.type === 'INIT_LOAD_USER') {
        const userinfo = UserApi.loadUserFromStorage()
        if (userinfo !== null)
            return Object.assign({}, state, { userinfo, showlogin: false })
        else
            return Object.assign({}, state, { showlogin: true }) 
    }
    return state
}