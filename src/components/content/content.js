import React from 'react';
import { ReactComponent as Hipo } from '../../hipo.svg';
import { motion } from 'framer-motion';
import Button from '../button/button';
import { moveUp } from '../../utils/utils';

function Content() {


    return (
        <div className='content'>
            <motion.header variants={moveUp} animate='animate' exit='exit' initial='initial'>
                <Hipo />
                <h1>Hipo</h1>
            </motion.header>
            <motion.main variants={moveUp} animate='animate' exit='exit' initial='initial'>
                <h2>The Fine Science of Apps</h2>
                <p>
                    At hipo,we build products people can't live without.
                    Let's compose a code symphony together.
                    Be <span>intern</span> at Hipo.
                </p>
            </motion.main>
            <Button title='apply' path='/auth' />
        </div>
    )
}

export default Content
