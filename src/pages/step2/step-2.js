import React from 'react'
import { useLocation } from 'react-router-dom'

function Step2() {

    const location = useLocation()
    return (
        <div>
            <p>Step 2</p>
            <p>{location.state.position}</p>
            <p>{location.state.period}</p>
        </div>
    )
}

export default Step2
