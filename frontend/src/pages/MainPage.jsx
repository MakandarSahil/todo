import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if(!isLoggedIn){
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  return (
    <div>MainPage</div>
  )
}

export default MainPage