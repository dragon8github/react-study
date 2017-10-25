// ajax加载菜单
export const INIT_LOAD_MENU = () => Object({ type: 'INIT_LOAD_MENU' })

// dispatch-reducer加载成功
export const INIT_LOAD_MENU_SUCCESS = data => Object({ type: 'INIT_LOAD_MENU_SUCCESS', payload: data }) 

// ajax获取权限
export const GET_USER_AUTH = () => Object({ type: 'GET_USER_AUTH' }) 

// dispatch-reducer设置权限
export const SET_USER_AUTH = data => Object({ type: 'SET_USER_AUTH', authData: data }) 