import React from 'react';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { moveUp } from '../../utils/utils';

function Button({ title, path, history }) {

    const clickHandler = () => {
        history.push(path)
    }

    return (

        <motion.div variants={moveUp} exit='exit' initial='initial' animate='animate' className='button' onClick={clickHandler}>

            <div className="button__out"></div>
            <div className="button__in"><span>{title}</span></div>

        </motion.div >

    )
}

export default withRouter(Button)
