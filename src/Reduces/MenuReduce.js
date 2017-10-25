export default (state = { data: [], selectedKeys: [], }, action) => {
    switch (action.type) {
        case 'INIT_LOAD_MENU_SUCCESS':
            return Object.assign({}, state, { data: action.data })
        default:
            return state
    }
}