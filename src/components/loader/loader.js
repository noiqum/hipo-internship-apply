import React from 'react';
import { ReactComponent as Hipo } from '../../hipo.svg';

function Loader({ text }) {


    return (
        <div className='loader'>
            <Hipo />
            <p>{text}</p>
        </div>
    )
}

export default Loader;
