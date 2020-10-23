import React from 'react'
import { useLocation } from 'react-router-dom'

function Down() {

    const location = useLocation()
    const fields = location.state.fields;
    const msgs = location.state.msgs
    return (
        <div className='down'>
            <p>Opps There is an Error</p>
            {fields.map((elm) => {
                return <p key={fields[elm]}> field:{elm}</p>
            })}
            {msgs.map((elm) => {
                return <p>Message: {elm}</p>
            })}
            <a href="/">HomePage</a>
            <a href='/'>Log In</a>
        </div>
    )
}

export default Down
