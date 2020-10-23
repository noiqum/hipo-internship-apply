import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { globalContext } from '../../context/globalContext';
import axios from 'axios';
import { corsURL, createAppUrl, initialUpdateState } from '../../utils/utils';
import { ReactComponent as Curly } from '../../svg/curly.svg';
import { auth } from '../../config/firebase.config';
import { motion } from 'framer-motion';
import { moveUp } from '../../utils/utils';
import Modal from '../../components/modal/modal';



function Step4() {
    const { state } = useContext(globalContext);
    const [application, setApplication] = useState(initialUpdateState);
    const [process, setProcess] = useState(false);
    const [height, setHeight] = useState(null)
    const history = useHistory();
    const step4Ref = useRef(null);


    const getApplication = useCallback(async (id) => {
        const url = corsURL + createAppUrl + id;
        const applicationResponse = await axios.get(url)
            .then(
                res => res.data
            ).catch(error => {

                if (error.response.status === 404) {
                    history.push('/error', { fields: [''], msgs: ['Application could nt find'] })
                }
                else {
                    history.push('/error', { fields: [''], msgs: ['something happened', error.message] })
                }

            })
        setApplication({ ...applicationResponse })
    }, [history])
    useEffect(() => {
        getApplication(state.auth.applicationId);
        setHeight(step4Ref.current.offsetHeight)
    }, [getApplication, state.auth.applicationId])


    const changeHandler = (e) => {
        setApplication({ ...application, [e.target.name]: e.target.value })
    }

    const logoutHandler = () => {
        auth.signOut();
        history.push('/');
    }

    const updateApplication = async (id) => {
        const position = application.position.id;
        const selected_periods = application.selected_periods.map((e) => { return e.id });
        const data = {
            name: application.name,
            email: application.email,
            position,
            selected_periods,
            cv: application.cv,
            notes: application.notes
        }
        const url = corsURL + createAppUrl + id + '/';
        await axios.put(url, data)
            .then(res => {

                setApplication(res.data)
            })
            .then(() => {

                setProcess(false)
            })
            .catch(error => {

                if (error.response.status === 404) {
                    history.push('/error', { fields: [''], msgs: ['Application could nt find'] })
                } if (error.response.status === 400) {
                    history.push('/error', { fields: Object.keys(error.response.data.detail), msgs: Object.values(error.response.data.detail) })
                } else {
                    history.push('/error', { fields: [''], msgs: ['something happened', error.message] })
                }

            })
    }

    const updateHandler = (e) => {
        e.preventDefault();
        step4Ref.current.scrollTop = 0;
        setProcess(true)
        updateApplication(application.id)
    }


    return (
        <div className='step4' ref={step4Ref} >

            {state === undefined ? <Redirect to='/' /> : null}
            {state.auth.id ? null : <Redirect to='/auth' />}
            {process ? <Modal height={height} text='Updating' /> : null}
            <motion.div className="step4__form" variants={moveUp} animate='animate' exit='exit' initial='initial'>
                <div>
                    <label htmlFor="id">Application ID</label>
                    <p>{application.id}</p>
                </div>
                <div>
                    <label htmlFor="name">name</label>
                    <input name='name' type="text" value={application.name} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input name='email' type="text" value={application.email} onChange={changeHandler} />
                </div>
                <div className='step4__form__position'>
                    <div className='step4__form__position__title'>position</div>
                    <div>

                        <label htmlFor="position_id">position id</label>
                        <p>{application.position.id}</p>
                        <label htmlFor="position_name">name</label>
                        <p>{application.position.name}</p>
                    </div>
                </div>
                <div className='step4__form__period'>
                    {application.selected_periods.map((e, i) => {
                        return <div key={i}>
                            <div>period</div>
                            <div><Curly /></div>
                            <div>
                                <div>
                                    <span >Period ID</span>
                                    <span>{e.id}</span>
                                </div>
                                <div>
                                    <span >Period Name</span>
                                    <span>{e.name}</span>
                                </div>
                                <div>
                                    <span>Start Date</span>
                                    <span>{e.start_date}</span>
                                </div>
                                <div>
                                    <span >End Date</span>
                                    <span>{e.end_date}</span>
                                </div>
                                <div>
                                    <span>Last Application Date</span>
                                    <span>{e.last_application_date}</span>
                                </div>
                                <div>
                                    <span >Location</span>
                                    <span>{e.location}</span>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <div>
                    <label htmlFor="cv">cv *<small>Please replace with base64 version</small></label>
                    <input name='cv' type="text" value={application.cv} onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor="notes">notes</label>
                    <textarea name='notes' cols='30' rows='10' value={application.notes} onChange={changeHandler} />
                </div>
                <div id='buttons' className="step4__form__buttons">
                    <button onClick={logoutHandler}>Log Out</button>
                    <button onClick={updateHandler} >Update</button>
                </div>
            </motion.div>

        </div>
    )
}

export default Step4;
