import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const GoogleAuthWrapper = () => (
    <GoogleOAuthProvider clientId="386748646703-grivr3pe1j80tbolko276m7r45ob1501.apps.googleusercontent.com">
      <Landing />
    </GoogleOAuthProvider>
  );

  return (
    <div className="w-full h-screen bg-[#023530] text-white">
      <Router>
        <Routes>
          <Route path="/" element={<GoogleAuthWrapper />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<div className="text-center mt-20">404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;