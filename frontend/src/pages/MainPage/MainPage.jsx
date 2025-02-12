import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import CameraCapture from '../../components/CameraCapture';
import LocationComponent from '../../components/LocationComponent';
import Location from '../../components/Location';
import Speech from '../../components/Speech';


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
      {/* <CameraCapture   /> */}
      {/* <Location /> */}

      {/* <a href='tel:+919579891114'>
        <button>Call</button> 
      </a> */}

      <Speech />
      
    </div>
  )
}

export default MainPage