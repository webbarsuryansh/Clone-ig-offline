import React from 'react'
import './auth.css'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Signup = () => {

const [username, setusername] = useState('')
const [email, setemail] = useState('')
const [password ,setpassword] = useState('')



async function handleSubmit(e){
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:3000/api/auth/register',{
        username,
        email,
        password
      }, {
        withCredentials: true,
      })
      console.log('signup success', res.data)
    }catch(err){
      console.error('signup error', err)
    }
}
  return (
    <div className="auth-page">
          <main className="auth-main">
        <form className="auth-form" action="" onSubmit={handleSubmit}>
          <h1 className="auth-title">Signup</h1>
          <input value={username} onChange={(e)=>{
            setusername(e.target.value)
          }} className="auth-input" type="text" placeholder='username' name='username' />
          <input value={email} onChange={(e)=>{
            setemail(e.target.value)
          }} className="auth-input" type="email" placeholder='email' name='email' />  
          <input value={password} onChange={(e)=>{
            setpassword(e.target.value)

          }} className="auth-input" type="password" placeholder='password' name='password' />
          <button className="auth-button" type='submit'>Signup</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </main>
    </div>
  )
}

export default Signup