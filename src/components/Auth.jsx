import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signup, signin, signUpGoogle } from '../actions/auth'
import { useGoogleLogin } from '@react-oauth/google'

const initialState = {
  firstName: '', lastName: '', email: '', password: '', confirmPassword: '' 
}

const Auth = () => {
  const [ isSignUp, setIsSignUp ] = useState(false)
  const [ formData, setFormData ] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignUp){
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    setFormData({firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
  }

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const accessToken = tokenResponse.access_token
        dispatch(signUpGoogle(accessToken, navigate))
        
      } catch (error) {
        console.log(error);
      }
    },
    onError: errorResponse => console.log(errorResponse)
  })
  return (
    <section className="flex items-center justify-center">
      <div className="bg-secondary flex flex-col mx-2 p-5 my-6 sm:mx-4 sm:my-12 sm:p-10 items-center rounded-md">
        <h2 className="font-semibold font-poppins text-[32px] text-white my-2">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-[280px] sm:w-[350px]">
          {isSignUp && (
            <>
              <TextField name="firstName" label="First Name" onChange={handleChange} required fullWidth sx={{ marginY: '8px', backgroundColor: 'white' }}/>
              <TextField name="lastName" label="Last Name" onChange={handleChange} required fullWidth sx={{ marginY: '8px', backgroundColor: 'white' }}/>
            </>
            )
          }
          <TextField name="email" label="Email" type="email" onChange={handleChange} required fullWidth sx={{ marginY: '8px', backgroundColor: 'white'}}/>
          <TextField name="password" label="Password" type="password" onChange={handleChange} required fullWidth sx={{ backgroundColor: 'white' }} />
          {isSignUp && (
            <TextField name="confirmPassword" label="Confirm Password" onChange={handleChange} type="password" required fullWidth sx={{ marginY: '8px', backgroundColor: 'white' }} />
          )
          }
          <Button sx={{ marginY: '8px', bgcolor: '#007383' }} variant="contained" type="submit">{isSignUp ? 'Register' : 'Sign In'}</Button>
          {!isSignUp && 
          <>
          <h2 className="text-center text-white font-poppins">or</h2>
          <Button sx={{ marginY: '8px', bgcolor: '#007383' }} variant="contained" onClick={login}>Google Sign In</Button>
          </>
          }
          <Button sx={{ color: 'white' }} fullWidth onClick={switchMode}>{isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up" }</Button>
         
        </form>
      </div>
    </section>
  )
}

export default Auth