import React, { useState } from "react";
import Login from "../pages/login";
import Register from "../pages/Register";

const Landing = () => {
  const [isLogin, setIsLogin] = useState(false); // State to toggle between Register and Login forms
  const [errMsg, setErrMsg] = useState("");
  
  return (
    <div className="w-full h-screen sm:flex lg:flex-row">
      <div className="min-w-96 h-full bg-white">
          {isLogin ? (
              <Login errMsg={errMsg} setErrMsg={setErrMsg} toggleRegister={() => setIsLogin(false)} />
            ) : (
              <Register errMsg={errMsg} setErrMsg={setErrMsg}  toggleLogin={() => setIsLogin(true)} />
          )}
      </div>
      <div className="w-full h-full flex justify-center items-center">
        information
      </div>
    </div>
  );
};

export default Landing;
