import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { globalContext } from '../../context/globalContext';
import axios from 'axios';
import { corsURL, createAppUrl, initialUpdateState } from '../../utils/utils';
import { ReactComponent as Curly } from '../../svg/curly.svg';




function Step4() {
    const { state } = useContext(globalContext);
    const [application, setApplication] = useState(initialUpdateState);
    const history = useHistory()

    const getApplication = useCallback(async (id) => {
        const url = corsURL + createAppUrl + id;
        const applicationResponse = await axios.get(url)
            .then(
                res => res.data
            ).catch(error => {

                if (error.response.status === 404) {
                    history.push('/error', { fields: [''], msgs: ['Application could nt find'] })
                } else {
                    history.push('/error', { fields: [''], msgs: ['something happened', error.message] })
                }

            })
        setApplication({ ...applicationResponse })
    }, [history])
    // useEffect(() => {
    //     getApplication(state.auth.applicationId);
    // }, [getApplication, state.auth.applicationId])
    useEffect(() => {
        getApplication('3362202869808363906')
    }, [getApplication])

    return (
        <div className='step4'>

            {state === undefined ? <Redirect to='/' /> : null}
            {state.auth.id ? null : <Redirect to='/auth' />}
            <div className="step4__form">
                <div>
                    <label htmlFor="id">Application ID</label>
                    <p>{application.id}</p>
                </div>
                <div>
                    <label htmlFor="name">name</label>
                    <input type="text" value={application.name} />
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="text" value={application.email} />
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
                    <label htmlFor="cv">cv</label>
                    <input type="text" value={application.cv} />
                </div>
                <div>
                    <label htmlFor="notes">notes</label>
                    <textarea cols='30' rows='10' value={application.notes} />
                </div>
                <div id='buttons' className="step4__form__buttons">
                    <button>Log Out</button>
                    <button>Update</button>
                </div>
            </div>

        </div>
    )
}

export default Step4;
