import React, { useState, useEffect } from 'react'
import { camera48 } from '../assets'
import { Button, Avatar, Typography } from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LOGOUT, RESET } from '../constants/actionTypes'
import decode from 'jwt-decode'

const Navbar = () => {
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const getUrl = window.location.href
  const removeAddPost = 'https://image-sharing-application.netlify.app/createPost'
  const logout = () => {
    dispatch({ type: LOGOUT })
    navigate('/posts')
    setUser(null)
    dispatch({ type: RESET })
    //window.location.reload(false)
  }
  const locationChange = () => {
    navigate('/posts')
    dispatch({ type: RESET })
    //window.location.reload(false)
  }
/* eslint-disable */
  useEffect(() => {
    const token = user?.token
    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) logout() 
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
/* eslint-enable */
  return (
    <nav className="w-full flex flex-row p-4 justify-between border-b-[1px] border-grayBorder">
      <div className="flex flex-row ml-2 hover:cursor-pointer" onClick={locationChange}>
        <img src={camera48} alt="logo" />
        <h2 className="text-[32px] text-white font-poppins mx-2">Image Sharing</h2>
      </div>
      <div className="flex flex-row mr-2 items-center">
        {user ? (
        <>
        {getUrl !== removeAddPost &&
          <>
          <Link to='/createPost'>
            <Button sx={{ marginRight: '32px' }} variant="contained" >Add Post</Button>
          </Link>
          </>
        }
          <Avatar src={user.result.picture} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
          <Typography color="white"  sx={{ marginX: "16px"}}>{user.result.name}</Typography>
          <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
        </>
        ) : (
          <Link to='/auth'>
            <Button variant="contained" >Sign in</Button>
          </Link>)}
      </div>
    </nav>
  )
}

export default Navbar