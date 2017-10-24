import actions from '@Actions/CommonAction'

export default (state = { data: [] }, action) => {
    switch (action.type) {
        // INIT_LOAD_MENU_SUCCESS
        case actions.LoadMenuSUCCESS().type:
            return Object.assign({}, state, { data: action.payload })
        default:
            return state
    }
}