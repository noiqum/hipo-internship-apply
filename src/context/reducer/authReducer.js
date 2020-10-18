

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
                ...action.user
            }

        default:
            return state;
    }
}