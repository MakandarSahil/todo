import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import Login from "../Login";
import Register from "../Register";

export default function Landing() {
  const [isLoginView, setIsLoginView] = useState(true)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/MainPage")
    }
  }, [isLoggedIn, navigate])

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      {/* Left: Auth Form */}
      <div className="w-full lg:w-[35%] xl:w-[25%] p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {isLoginView ? <Login /> : <Register />}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>

      {/* Right: Marketing Content */}
      <div className="w-full lg:w-[65%] xl:w-[75%] bg-[#023530] text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">Welcome to Our Platform</h1>
          <p className="text-lg text-gray-200 mb-8">
            Experience seamless collaboration and powerful features. Join thousands of users who trust our platform for
            their needs.
          </p>
          <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm">New Features Available</div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-400 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl" />
        </div>
      </div>
    </div>
  )
}

