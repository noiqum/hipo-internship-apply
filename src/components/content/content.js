import React from 'react';
import { ReactComponent as Hipo } from '../../hipo.svg';
import { motion } from 'framer-motion';

function Content() {
    const moveUp = {
        animate: {
            y: -30,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeIn",
                durationDelay: 6
            }
        },
        initial: {
            opacity: 0
        },
        exit: {
            y: -20,
            opacity: 0,
            transition: {
                duration: 2,
                ease: "easeIn"
            }
        }

    }

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
        </div>
    )
}

export default Content
