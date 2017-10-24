export default class CommonAction {
    // 加载菜单
    static LoadMenu () {
        return {
            type: 'INIT_LOAD_MENU'
        }
    }
    // 加载成功
    static LoadMenuSUCCESS (data) {
        return {
            type: 'INIT_LOAD_MENU_SUCCESS',
            payload: data
        }
    }
    // 获取权限
    static GetUserAuth () {
        return {
            type: 'GET_USER_AUTH'
        }
    }
    // 获取权限成功
    static SetUserAuth (data) {
        return {
            type: 'SET_USER_AUTH',
            authData: data
        }
    }
}