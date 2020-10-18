import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import { AnimatePresence } from "framer-motion"
import Content from '../../components/content/content';
import { auth } from '../../config/firebase.config';
import { globalContext } from '../../context/globalContext';


function Main() {
    const [loading, setLoading] = useState(true);
    const { dispatch } = useContext(globalContext)
    useEffect(() => {
        setInterval(() => {
            setLoading(false)
        }, 6000)
    }, [])



    return (

        <div className='main'>
            <AnimatePresence exitBeforeEnter>
                {loading ? <Loader text='Loading...' /> :
                    <Content />}
            </AnimatePresence>
        </div>
    )
}

export default Main
