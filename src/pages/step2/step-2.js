import React, { useContext, useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { globalContext } from '../../context/globalContext';
import { ReactComponent as Form } from '../../svg/form.svg';
import { checkValidity, checkPayload, createAppUrl, corsURL, timeBreak } from '../../utils/utils';
import axios from 'axios';
import { firestore } from '../../config/firebase.config';
import Loader from '../../components/loader/loader';

function Step2() {

    const { state, dispatch } = useContext(globalContext);
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
    const [serverError, setServerError] = useState(null);
    const [submit, setSubmit] = useState(false)
    const [user] = useState(state.auth)
    const location = useLocation()
    const history = useHistory()




    const inputHandler = (e) => {
        setPayload({ ...payload, [e.target.name]: e.target.value })
        const checkResult = checkValidity(e.target.value, e.target.name);
        setError({ ...error, [e.target.name]: checkResult.msg })
    }
    const submitApplication = async (data) => {
        try {
            setSubmit(true);
            const response = await axios.post(corsURL + createAppUrl, data).then(res => { return { data: res.data, status: res.status } });
            if (response.status === 201) {
                firestore.doc(`user/${user.id}`).set({
                    applicationId: response.data.id
                }, { merge: true })
                dispatch({
                    type: 'ADD_RESPONSE',
                    response: { ...response.data }
                })
                timeBreak(setSubmit, 6000, false);
                timeBreak(() => { history.push('/step-3') }, 7000)
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setServerError({
                        field: Object.keys(error.response.data.detail),
                        msg: Object.values(error.response.data.detail)
                    })
                } else {
                    setServerError({
                        field: ['unknown'],
                        msg: ['something went wrong']
                    })
                }
            } else {
                setServerError({
                    field: ['unknown'],
                    msg: ['something went wrong']
                })
            }

        }
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
            const period = location.state.period;

            const payloadReady = {
                ...payload,
                position: +location.state.position,
                selected_periods: [period]
            }
            dispatch({
                type: 'ADD_PAYLOAD',
                payload: { ...payloadReady, selected_periods: [...payloadReady.selected_periods] }
            })

            submitApplication(payloadReady)
            setSubmit(true)
        } else {
            setError({ ...error, [control.error]: control.msg })
        }
    }
    return (

        <div className='application'>
            {submit ? <Loader text='Loading...' /> :
                <>
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
                </>
            }

            {user.id ? null : <Redirect to='/auth' />}
            {serverError ? <Redirect to={{ pathname: '/error', state: { fields: serverError.field, msgs: serverError.msg } }} /> : null}
        </div>
    )
}

export default Step2
