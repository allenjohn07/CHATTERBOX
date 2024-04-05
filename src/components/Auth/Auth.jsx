import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../../firebase-config'
import Cookies from 'universal-cookie'
import logo from '../../assets/logo.png'
import './Auth.css'

const cookies = new Cookies()

function Auth(props) {


    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set("auth-token", result.user.refreshToken)
            props.setIsAuth(true)
        } catch(err){
            console.error(err)
        }  
    }

    return (
        <div className='auth-container'>
            <div className='heading'><h2>Welcome to ChatterBox </h2><img className='logo' src={logo} alt="" /></div>
            <p className='sign-in-p'>Sign in to continue</p>
            <button className='sign-in-with-google' onClick={signInWithGoogle}> <i style={{marginRight:'5px'}} class="fa-brands fa-google"></i> Sign in with Google</button>
        </div>
    )
}

export default Auth