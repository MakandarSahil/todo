import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import CameraCapture from '../../components/CameraCapture';


const MainPage = () => {
  document.title = "MAIN PAGE | TODO"
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if(!isLoggedIn){
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  return (
    <div>
      <CameraCapture   />
      
    </div>
  )
}

export default MainPage