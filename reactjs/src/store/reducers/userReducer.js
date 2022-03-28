const initialState = { user:  JSON.parse(localStorage.getItem('user') === null ? '{}' : localStorage.getItem('user'))}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER':
            return { ...state, user: action.payload }
        default:
            return state
    }
}

export default UserReducer;