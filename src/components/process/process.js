import React from 'react';
import { ReactComponent as Hipo } from '../../svg/hipo.svg';
import City from '../../svg/city.png';
import { ReactComponent as Engine } from '../../svg/engine.svg';
import { ReactComponent as Cloud } from '../../svg/cloud.svg';

function Process() {
    return (
        <div className='process'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <Cloud />
            <Engine />
            <div className="process__smoke">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <Hipo />
            <div style={{ backgroundImage: `url(${City})`, backgroundRepeat: 'repeat-x' }} className="process__city"></div>
            <p className="process__text">...redirecting</p>
        </div>
    )
}

export default Process;
