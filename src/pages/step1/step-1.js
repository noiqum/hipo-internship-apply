import React from 'react';
import { motion } from 'framer-motion'

function Step1() {



    return (
        <motion.div
            exit={{ x: 100, opacity: 0, transition: { duration: 2, ease: 'easeOut' } }}
            animate={{ x: 0, transition: { duration: 2, ease: 'easeOut' } }}
            initial={{ x: '100%' }}
            className='step1'
        >
            <p>step 1</p>
        </motion.div>
    )
}

export default Step1
