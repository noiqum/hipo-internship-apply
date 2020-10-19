import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Pc from '../../svg/pc.png';
function Periods({ periods }) {

    const [position, setPosition] = useState('');
    const [period, setPeriod] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [redirect, setRedirect] = useState(false)

    const applyHandler = (periodID) => {
        setPeriod(periodID);
        if (clicked) {
            setRedirect(true)
        } else {
            alert('be sure you checked position')
        }
    }
    const positionHandler = (e) => {
        updateCheck(clicked);
        setPosition(e.target.name)
    }
    const updateCheck = (present) => {
        setClicked(!present)
    }



    return (
        <div className='periods'>
            {periods.map((period) => {
                return <div className="periods__element">
                    <img src={Pc} alt="pc" />
                    <div>
                        <span>ID</span>
                        <span>{period.id}</span>
                    </div>
                    <div>
                        <span>name</span>
                        <span>{period.name}</span>
                    </div>
                    <div>
                        <span>positions</span>
                        <span>{period.positions.map((e, i) => {
                            return (
                                <span className='periods__element-position' key={i} >
                                    <input type='checkbox' name={e.id} onChange={positionHandler}></input>
                                    <span>ID : {e.id}</span>
                                    <span>Name : {e.name}</span>
                                </span>)
                        })}</span>
                    </div>
                    <div>
                        <span>start date</span>
                        <span>{period.start_date}</span>
                    </div>
                    <div>
                        <span>end date</span>
                        <span>{period.end_date}</span>
                    </div>
                    <div><span>last application date</span>
                        <span>{period.last_application_date}</span>
                    </div>
                    <div>
                        <span>location</span>
                        <span>{period.location}</span>
                    </div>
                    <div>
                        <button onClick={() => { applyHandler(period.id) }}>Apply</button>
                    </div>
                </div>
            })}
            {redirect ? <Redirect to={{ pathname: '/step-2', state: { position, period } }} /> : null}
        </div>
    )
}

export default Periods
