import actions from '@Actions/CommonAction'

export default (state = { data: [] }, action) => {
    switch (action.type) {
        case actions.SetUserAuth().type:
            return Object.assign({}, state, { data: action.authData })
        default:
            return state
    }
}