import React, { useCallback, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { auth, firestore } from '../../config/firebase.config';
import { globalContext } from '../../context/globalContext';
import axios from 'axios';
import Positions from '../../components/positions/positions';
import Periods from '../../components/periods/periods';
import { useHistory } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { timeBreak, moveUp } from '../../utils/utils';
function Step1() {
    const [positions, setPositions] = useState(null);
    const [periods, setPeriods] = useState(null);
    const [checking, setChecking] = useState(true);
    const { dispatch } = useContext(globalContext)
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const history = useHistory();


    const getPositions = useCallback(() => {

        const url = 'https://hipolabs.com/api/internship-positions/';
        axios.get(proxyurl + url).then(res => {

            setPositions([...res.data])
        })
    }, [])
    const getPeriods = useCallback(() => {
        const url = 'https://hipolabs.com/api/internship-periods/';
        axios.get(proxyurl + url).then(res => {
            setPeriods([...res.data])
        })
    }, [])

    const getUser = useCallback(async (id) => {
        try {
            const userDB = await firestore.doc(`user/${id}`).get().then(res => res.data());
            dispatch({
                type: 'LOGIN_SUCCESS',
                user: {
                    ...userDB
                }
            })
            if (userDB.applicationId !== '') {
                setChecking(false)
                history.push('/step-3');

            }
            getPositions();
            getPeriods();
            timeBreak(() => { setChecking(false) }, 3000)
        } catch (error) {
            history.push('/error', { fields: [''], msgs: 'something went wrong' })
        }
    }, [dispatch, history, getPeriods, getPositions])
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getUser(user.uid)
            } else {
                history.push('/')
            }
        })
    }, [getUser, history])

    return (
        <motion.div
            className={checking ? 'step1' : 'step1 height'}
        >
            {checking ? <Loader text="checking..." /> :
                <motion.div variants={moveUp} animate='animate' exit='exit' initial='initial'>
                    <h2>Intern Positions</h2>
                    {positions ? <Positions positions={positions} /> : null}
                    <h2>Open Periods to Apply</h2>
                    {periods ?
                        <Periods periods={periods} /> : null}
                </motion.div >
            }



        </motion.div>
    )
}

export default Step1
