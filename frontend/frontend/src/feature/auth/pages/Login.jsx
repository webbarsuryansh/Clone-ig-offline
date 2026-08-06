import React from 'react'
import { useState } from 'react'
import './auth.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {


const [username, setusername] = useState('')
const [password ,setpassword] = useState('')




async function handleSubmit(e){
    e.preventDefault()
    try {
        const res = await axios.post('http://localhost:3000/api/auth/login', {
            username,
            password,
        })
        console.log('login success', res.data)
    } catch (err) {
        console.error('login error', err)
    }
}

   
  return (
    <div className="auth-page">
        <main className="auth-main">
            <form className="auth-form" action="" onSubmit={handleSubmit}>
                <h1 className="auth-title">Login</h1>
                <input className="auth-input" value={username} onChange={(e)=>{
                    setusername(e.target.value)
                }} type="text" placeholder='username' name='username' />
                <input className="auth-input" value={password}
                onChange={(e)=>{
                    setpassword(e.target.value)
                }} type="password" placeholder='password' name='password' />
                <button className="auth-button" type='submit'>Login</button>
                <p>Don't have an account? <Link to="/signup">Signup</Link></p>
            </form>
        </main>
    </div>
  )


}



export default Login