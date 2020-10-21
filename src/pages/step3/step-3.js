import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { globalContext } from '../../context/globalContext'
import { ReactComponent as Update } from '../../svg/update.svg';
import { auth } from '../../config/firebase.config';

function Step3() {


    const { state } = useContext(globalContext);

    const history = useHistory();
    const logoutHandler = () => {
        auth.signOut();
        history.push('/')
    }


    return (

        <div className='step3'>


            <p>Thank You <span>{state.auth.name}</span> for your interest</p>
            <p>Till 30/10/2020 you can update your application</p>
            <div className='step3__svg'>
                <Update />
            </div>
            <div className="step3__buttons">
                <button onClick={logoutHandler} >log out</button>
                <button>Review and Update</button>
            </div>




            {state.auth.name === '' ? <Redirect to='/auth' /> : null}
        </div>
    )
}

export default Step3
