import React, { useState } from 'react'
import { Navbar, Main, Auth, Footer, CreatePost } from './components'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {
   const [ currentId, setCurrentId ] = useState(0)
   const google_clientId = process.env.REACT_APP_GOOGLE_ID

  return (
    <GoogleOAuthProvider clientId={google_clientId}>
    <BrowserRouter>
    <div className="bg-primary overflow-hidden w-full">
      <div className="flex items-center w-full justify-center">
        <div className="xl:max-w-[1280px] w-full">
          <Navbar />
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="xl:max-w-[1280px] w-full">
        <Routes>
          <Route path='/' exact element={<Navigate to='/posts' />} />
          <Route path='/posts' exact element={<Main currentId={currentId} setCurrentId={setCurrentId} />} />
          <Route path='/auth' exact element={<Auth />} />
          <Route path='/createPost' exact element={<CreatePost currentId={currentId} setCurrentId={setCurrentId} />} />
        </Routes>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="xl:max-w-[1280px] w-full">
          <Footer />
        </div>
      </div>
    </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App