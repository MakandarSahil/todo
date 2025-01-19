import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';

const App = () => {
  return (
    <div className="w-full h-screen bg-[#023530] text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<div className="text-center mt-20">404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
