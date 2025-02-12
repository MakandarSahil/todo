import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

import Register from "../pages/Register";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";

const AppRoute = () => {

  const GoogleAuthWrapperForLogin = () => (
    <GoogleOAuthProvider clientId="386748646703-grivr3pe1j80tbolko276m7r45ob1501.apps.googleusercontent.com">
      <Login /> 
    </GoogleOAuthProvider>
  );

  const GoogleAuthWrapperForRegister = () => (
    <GoogleOAuthProvider clientId="386748646703-grivr3pe1j80tbolko276m7r45ob1501.apps.googleusercontent.com">
      <Register />
    </GoogleOAuthProvider>
  );
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* {public routes} */}
          <Route path="/" element={<GoogleAuthWrapperForLogin />} />
          <Route path="/login" element={<GoogleAuthWrapperForLogin />} />
          <Route path="/register" element={<GoogleAuthWrapperForRegister />} />


          {/* {private routes } */}
          <Route path="/MainPage" element={<MainPage />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoute;
