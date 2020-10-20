import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { auth, firestore } from '../../config/firebase.config';
import { globalContext } from '../../context/globalContext';
import axios from 'axios';
import Positions from '../../components/positions/positions';
import Periods from '../../components/periods/periods';
function Step1() {
    const [positions, setPositions] = useState(null);
    const [periods, setPeriods] = useState(null)
    const { dispatch } = useContext(globalContext)
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
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

        } catch (error) {
            console.log(error)
        }
    }, [dispatch])
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getUser(user.uid)
            } else {
                console.log('nothing')
            }
        })
    }, [getUser])



    useLayoutEffect(() => {
        getPositions();
        getPeriods();
    }, [getPeriods, getPositions])

    return (
        <motion.div
            exit={{ x: 100, opacity: 0, transition: { duration: 2, ease: 'easeOut' } }}
            animate={{ x: 0, transition: { duration: 2, ease: 'easeOut' } }}
            initial={{ x: '100%' }}
            className='step1'
        >
            <h2>Intern Positions</h2>
            {positions ? <Positions positions={positions} /> : null}
            <h2>Open Periods to Apply</h2>
            {periods ?
                <Periods periods={periods} /> : null}
        </motion.div>
    )
}

export default Step1
