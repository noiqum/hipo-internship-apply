import React, { useEffect, useState } from 'react'
import { checkDate } from '../../utils/utils';
import Form from '../../components/form/form';
function Auth() {

    const [date, setDate] = useState(null);
    useEffect(() => {
        const today = Date.now();
        const valid = checkDate(today);
        setDate(valid)
    }, [])

    return (
        <div className='auth'>
            {date ? <Form /> : <p>Application Process ended 30/10/2020 ,follow us ,we will announce next sessions</p>}
        </div>
    )
}

export default Auth
