import React, { useEffect, useState } from 'react';
import Loader from '../../components/loader/loader';
import { AnimatePresence } from "framer-motion"
import Content from '../../components/content/content';


function Main() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setInterval(() => {
            setLoading(false)
        }, 6000)
    }, [])
    return (

        <div className='main'>
            <AnimatePresence exitBeforeEnter>
                {loading ? <Loader text='Loading...' /> :
                    <Content />

                }
            </AnimatePresence>
        </div>
    )
}

export default Main
