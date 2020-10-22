
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { auth, firestore } from '../../config/firebase.config';
import { globalContext } from '../../context/globalContext';
import { checkValidity} from '../../utils/utils';
import Process from '../process/process';
import {motion} from 'framer-motion';

function Form() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ name: null, email: null, password: null });
    const [signup, setSignup] = useState(false);
    const {dispatch}=useContext(globalContext);
    const [process,setProcess]=useState(false);
    const [msg,setMsg]=useState(null)
    const history=useHistory()
    const createUser= async (email,password,name)=>{
            try {
                
                const newUserID= await auth.createUserWithEmailAndPassword(email,password).then((u)=>{return u.user.uid});
                await firestore.collection('user').doc(newUserID).set({
                    id:newUserID,
                    name,
                    email,
                    applicationId:''
                }).then(()=>{
                    dispatch({
                        type:'LOGIN_SUCCESS',
                        user:{
                                id:newUserID,
                                email,
                                name,
                                applicationId:''
                            }
                    })
                    setProcess(false);
                    history.push('/step-1')
                })
                
            } catch (error) {
                setMsg(error.message)
            }
    }

    const getUser= async( email,password)=>{
            try {
                await auth.signInWithEmailAndPassword(email,password).then((res)=>{
                    if(res.user.uid){
                        setProcess(false)
                        history.push('/step-1')
                    }
                })
                
            } catch (error) {
                setMsg(error.message)
            }
    }
    

    const submitHandler=(e)=>{
        e.preventDefault();
        if( signup && (error.name === null) && (error.email === null) && (error.password=== null)){
            if(email !== '' && name !== '' && password !== ''){
                    setProcess(true)
                    const wait=()=>{
                        setTimeout(()=>{createUser(email,password,name)},10000)
                    }
                    wait();
                    
            }else{
                alert('please fill the form')
            }
        }
        if(!signup && error.email === null && error.password === null){
            if(email !== '' && password !== ''){
                setProcess(true);
                const wait=()=>{
                    setTimeout(()=>{getUser(email,password)},10000)
                }
                wait();
                
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
        <motion.div 
        className='form'
        exit={{ x: '-100%', transition: { duration: 2, ease: 'easeOut' } }}
        animate={{ x: 0, transition: { duration: 2, ease: 'easeOut' } }}
        initial={{ x: '100%' }}
        >
            
            
            <h2>{signup ? 'Register' : 'Log In'}</h2>
            <form className={process ? 'hide' : ''}>
                {msg ? msg : null}
                {process ? <Process/> : null}
                {signup ? <label htmlFor='name'>Name</label> : null}
                {signup ? <input className={error.name ? 'error' :''} type='text' name='name' value={name} onChange={nameChangeHandler}></input> : null}
                {error.name ? <small><em>*</em>{error.name}</small> : null}
                <label htmlFor="email">Email</label>
                <input className={error.email ? 'error' : null} type="email" name="email" id="email" value={email}  onChange={emailChangeHandler}/>
                {error.email ? <small><em>*</em>{error.email}</small> : null}
                <label htmlFor="password">Password</label>
                <input className={error.password ? 'error' : null} type="password" name="password" id="password" value={password}  onChange={passwordChangeHandler} placeholder='1 uppercase 1 special 1 number min 6'/>
                {error.password ? <small><em>*</em>{error.password}</small> : null}
                <button disabled={process ? true : false} onClick={submitHandler} type='submit'>{signup ? 'Sign Up' : 'Log in'}</button>
                {signup ? null :
                 (<span className='sign'>You Don't Have an Account ? <em onClick={()=>{setSignup(true)}}>Sign Up</em></span> )
                }
            </form>
            
        </motion.div>
    )
}

export default Form
