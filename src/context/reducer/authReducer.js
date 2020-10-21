

const initialState = {
    id: '',
    name: '',
    email: '',
    applicationId: ''
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':

            return {
                ...state,
                id: action.user.id,
                email: action.user.email,
                name: action.user.name,
                applicationId: action.user.applicationId
            }

        default:
            return state;
    }
}