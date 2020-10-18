import * as React from 'react';
import { createContext, useReducer } from 'react';
import { authReducer } from './reducer/authReducer';
import { applicationReducer } from './reducer/applicationReducer';
const initialState = {
    user: {

    },
    application: {
        payload: {},
        response: {}
    }
}

export const globalContext = React.createContext(initialState)

const mainReducer = ({ auth, application }, action) => ({
    auth: authReducer(auth, action),
    application: applicationReducer(application, action)

})
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);


    return (<globalContext.Provider value={{ state, dispatch }}>
        {children}
    </globalContext.Provider>)

}
