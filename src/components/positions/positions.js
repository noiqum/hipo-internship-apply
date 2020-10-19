import React from 'react';

function Positions({ positions }) {
    return (
        <div className='positions'>
            <div className="positions__title">
                <span>ID</span><span>Name</span>
            </div>
            <div className="positions__table">
                {positions.map((elm, idx) => {
                    return <div key={idx} className="positions__table__row">
                        <span>{elm.id}</span>
                        <span>{elm.name}</span>
                    </div>
                })}
            </div>

        </div>
    )
}

export default Positions
