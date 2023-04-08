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
  const [ toggle, setToggle ] = useState(false)
  const removeAddPost = 'https://image-sharing-application.netlify.app/createPost'
  const logout = () => {
    dispatch({ type: LOGOUT })
    navigate('/')
    setUser(null)
    dispatch({ type: RESET })
  }
  const locationChange = () => {
    navigate('/')
    dispatch({ type: RESET })
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
      <div className="flex flex-row ml-2 hover:cursor-pointer items-center" onClick={locationChange}>
        <img src={camera48} alt="logo" />
        <h2 className="text-[24px] sm:text-[32px] text-white font-poppins mx-2">Image Sharing</h2>
      </div>
      <div className="flex flex-row mr-2 items-center">
        {user ? (
        <>
        {getUrl !== removeAddPost &&
          <>
          <Link to='/createPost'>
            <Button sx={{ marginRight: '16px' }} variant="contained">Add Post</Button>
          </Link>
          </>
        }
            <div className="flex sm:hidden flex-col min-w-[80px] items-end">
                <button className="p-1 rounded-md" onClick={() => setToggle((prev) => !prev)}>
                  <Avatar src={user.result.picture} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
                </button>
              <div className={`${toggle ? 'flex' : 'hidden'} flex-col bg-tertiary rounded-xl p-4 mt-12 absolute shadow-2xl`}>
                <button className="mt-1 font-poppins text-[16px] text-white font-bold">{user.result.name}</button>
                <div className="border-t-[1px] border-grayBorder m-2"></div>
                <button className="mt-1 font-poppins text-[16px] text-white font-semibold" onClick={logout}>Logout</button>
              </div>
            </div>
            <div className="hidden sm:flex flex-row items-end">
              <Avatar src={user.result.picture} alt={user.result.name}>{user.result.name.charAt(0)}</Avatar>
              <Typography color="white"  sx={{ marginX: "16px"}}>{user.result.name}</Typography>
              <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
            </div>
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