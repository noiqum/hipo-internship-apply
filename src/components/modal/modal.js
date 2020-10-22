import React, { useEffect, useRef } from 'react'

function Modal({ text, height }) {


    const barREf = useRef(null);




    useEffect(() => {
        barREf.current.scrollIntoView(true);

    }, [])


    return (
        <div className='modal' style={{ height: height }}>
            <div ref={barREf} className='modal__bar'><span id='modal__bar__text'>{text}</span></div>
        </div>
    )
}

export default Modal
