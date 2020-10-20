import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ReactComponent as Form } from '../../svg/form.svg';
import { checkValidity, checkPayload } from '../../utils/utils';
function Step2() {
    const [payload, setPayload] = useState({
        name: '',
        email: '',
        position: '',
        selected_periods: '',
        cv: '',
        notes: ''
    })
    const [error, setError] = useState({
        name: null,
        email: null,
        cv: null,
        notes: null
    })

    const location = useLocation()

    const inputHandler = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
        const checkResult = checkValidity(e.target.value, e.target.name);
        setError({ ...error, [e.target.name]: checkResult.msg })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const subPayload = {
            name: payload.name,
            email: payload.email,
            cv: payload.cv,
            notes: payload.notes
        }
        const control = checkPayload(subPayload);

        if (control.done) {
            console.log('submit ready')
        } else {
            setError({ ...error, [control.error]: control.msg })
        }
    }
    return (
        <div className='application'>
            <Form />
            <h2>Application form</h2>
            <form className="application__form">
                <label htmlFor="name">name</label>
                <input
                    type="text"
                    name='name'
                    autoFocus onChange={inputHandler}
                    className={error.name ? 'error' : ''}
                />
                <small> {error.name ? error.name : null}</small>
                <label htmlFor="email">email</label>
                <input
                    type="email"
                    name='email'
                    onChange={inputHandler}
                    className={error.email ? 'error' : ''}
                />
                <small> {error.email ? error.email : null}</small>
                <label htmlFor="position">position</label>
                <input
                    type="text"
                    name='position'
                    value={location.state.position}
                    readOnly
                />
                <label htmlFor="selected_periods">Period</label>
                <input
                    type="text"
                    name="selected_periods"
                    value={location.state.period}
                    readOnly
                />
                <p>Please use the base64 representation of your CV file (PDF is preferred). You can transform any file to a base64 string using an online tool.
                <a target='blank' href='https://www.freeformatter.com/base64-encoder.html#ad-output'>Here</a> is a good one.</p>
                <label htmlFor="cv">CV</label>
                <input
                    type="text"
                    name="cv" id="cv"
                    onChange={inputHandler}
                    className={error.cv ? 'error' : ''}
                />
                <small> {error.cv ? error.cv : null}</small>
                <p>While filling the notes field, do not hesitate to give information about yourself and briefly explain why you want to be an intern at Hipo.</p>
                <small> {error.notes ? error.notes : null}</small>
                <textarea
                    name="notes" id="notes"
                    cols="35" rows="10"
                    onChange={inputHandler}
                    className={error.notes ? 'error' : ''}
                ></textarea>
                <button onClick={submitHandler}>Submit</button>
            </form>
        </div>
    )
}

export default Step2
