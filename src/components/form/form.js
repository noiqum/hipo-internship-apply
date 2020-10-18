import React, { useContext, useEffect, useState } from 'react'
import { globalContext } from '../../context/globalContext';
import { checkValidity } from '../../utils/utils';


function Form() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ name: null, email: null, password: null });
    const [signup, setSignup] = useState(false);
    const {state,dispatch}=useContext(globalContext);

    


    const submitHandler=(e)=>{
        e.preventDefault();
        if( signup && (error.name === null) && (error.email === null) && (error.password=== null)){
            if(email !== '' && name !== '' && password !== ''){
                console.log('submit ready')
            }else{
                alert('please fill the form')
            }
        }
        if(!signup && error.email === null && error.password === null){
            if(email !== '' && password !== ''){
                console.log('submit ready');
            }else{
                alert('please fill the form')
            }
        }
        
        return 
    }
    const emailChangeHandler=(e)=>{
        setEmail(e.target.value);
        const result=checkValidity(email,'email');
        setError({...error,email:result.msg})
    }
    const nameChangeHandler=(e)=>{
        setName(e.target.value);
        const result=checkValidity(name,'name');
        setError({...error,name:result.msg})
    }
    const passwordChangeHandler=(e)=>{
        setPassword(e.target.value)
        const result=checkValidity(password,'password');
        setError({...error,password:result.msg})
    }
    return (
        <div className='form' >
            
            
            <h2>{signup ? 'Register' : 'Log In'}</h2>
            <form>
                {signup ? <label htmlFor='name'>Name</label> : null}
                {signup ? <input className={error.name ? 'error' :''} type='text' name='name' value={name} onChange={nameChangeHandler}></input> : null}
                {error.name ? <small><em>*</em>{error.name}</small> : null}
                <label htmlFor="email">Email</label>
                <input className={error.email ? 'error' : null} type="email" name="email" id="email" value={email}  onChange={emailChangeHandler}/>
                {error.email ? <small><em>*</em>{error.email}</small> : null}
                <label htmlFor="password">Password</label>
                <input className={error.password ? 'error' : null} type="password" name="password" id="password" value={password}  onChange={passwordChangeHandler} placeholder='1 uppercase 1 special 1 number min 6'/>
                {error.password ? <small><em>*</em>{error.password}</small> : null}
                <button onClick={submitHandler} type='submit'>{signup ? 'Sign Up' : 'Log in'}</button>
                {signup ? null :
                 (<span>You Don't Have an Account ? <em onClick={()=>{setSignup(true)}}>Sign Up</em></span> )
                }
            </form>
            
        </div>
    )
}

export default Form
