const initialState = {
    payload: {},
    response: {}
}

export const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PAYLOAD':


            return {
                ...state,
                payload: { ...action.payload }
            }
        case 'ADD_RESPONSE':
            return {
                ...state,
                response: { ...action.response }
            }

        default:
            return state;
    }
}