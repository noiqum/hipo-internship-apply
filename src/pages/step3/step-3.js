import React, { useContext } from 'react';
import { globalContext } from '../../context/globalContext'

function Step3() {

    const { state } = useContext(globalContext)
    const name = state.auth.name;
    return (
        <div className='step3'>
            <p>Thank You {name} for your interest</p>
            <p>Till 30/10/2020 you can update your application</p>
            <div className="step3__buttons">
                <button>log out</button>
                <button>update</button>
            </div>
        </div>
    )
}

export default Step3
