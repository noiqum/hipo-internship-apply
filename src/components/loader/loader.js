import React from 'react';
import { ReactComponent as Hipo } from '../../hipo.svg';
import { motion } from 'framer-motion';
function Loader({ text }) {




    return (
        <motion.div exit={{ opacity: 0, transition: { duration: 2, ease: 'easeIn' } }} className='loader'>
            <Hipo />
            <p>{text}</p>
        </motion.div>
    )
}

export default Loader;
