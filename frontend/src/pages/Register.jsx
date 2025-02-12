import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useGoogleLogin} from '@react-oauth/google'
import { use } from "react";
import { googleAuth } from "../api";

const Register = ({ toggleLogin, errMsg, setErrMsg }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      const res = await fetch(import.meta.env.VITE_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        setErrMsg("User Already exist");
        return;
      }

      navigate("/home")
    } catch (err) {
      console.error("Error during registration: ", err);
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      if(authResult["code"]){
        const result = await googleAuth(authResult.code);
        const {email, name, image}= result.data.user;
        const token = result.data.token
        const obj ={email, name, token,image};
        localStorage.setItem('user-info', JSON.stringify(obj))
        navigate('/home')
        console.log("result.data.user", result.data.user);
      }else{
        console.log(authResult)
        throw new Error(authResult)
      }
      console.log(authResult);
    }catch(err) {
      console.log('error while requesting google code : ', err)
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow : 'auth-code'
  })

  return (
    <div className="w-full h-full text-black px-9 py-20 rounded-lg shadow-lg flex items-center">
      <div className="w-full flex flex-col gap-12">
        <div className="w-full h-[15%]">
          <h1 className="text-[#023530] text-3xl font-medium mb-2">Create an account</h1>
          <h3 className="font-semibold">
            Already have an account?{" "}
            <button className="text-blue-700" type="button" onClick={toggleLogin}>
              Login
            </button>
          </h3>
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
              className="bg-gray-100 px-4 py-2 rounded"
              type="name"
              name="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="bg-gray-100 px-4 py-2 rounded"
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="bg-gray-100 px-4 py-2 rounded outline-[#023530]"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full bg-[#023530] text-white h-10 rounded mt-4"
              type="submit"
            >
              Sign Up
            </button>
            {errMsg && <p className="text-red-500 mt-2">{errMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;