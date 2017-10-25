export default (state = { data: [] }, action) => {
    switch (action.type) {
        case 'SET_USER_AUTH':
            return Object.assign({}, state, { data: action.data })
        default:
            return state
    }
}