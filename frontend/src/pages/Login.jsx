import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ toggleRegister, errMsg, setErrMsg}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      const res = await fetch(import.meta.env.LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setErrMsg("Invalid Credentials");
        return;
      }

    //   alert("Login successful");
    navigate("/home")
    } catch (err) {
      console.error("Error during login: ", err);
    }
  };

  return (
    <div className="w-full h-full text-black  px-9 py-20 rounded-lg shadow-lg flex items-center">
        <div className="w-full  flex flex-col gap-12">
            <div className=" w-full h-[15%] ">
                <h1 className="text-[#023530] text-3xl font-medium mb-2">Log in to your account</h1>
                <h3 className="font-semibold">Don't have an account ?? <button className="text-blue-700" type="button"
                onClick={toggleRegister}>SignUp</button></h3>
            </div>
            <form className="h-[85%] w-full flex flex-col gap-2 outline-[#023530]" onSubmit={handleLogin}>
                <input className="bg-gray-100 px-4 py-2 rounded"
                    type="email"
                    name = "email"
                    placeholder="email"
                    value={email}
                    onChange={(e => setEmail(e.target.value))}
                />
                <input className="bg-gray-100 px-4 py-2 rounded outline-[#023530]"
                    type="password" 
                    name = "password"
                    placeholder="password"
                    value={password}
                    onChange={(e => setPassword(e.target.value))}
                />
                <button
                    className="w-full bg-[#023530] text-white h-10 rounded mt-4"
                    type="submit"
                >
                    Log in
                </button>
                {errMsg && <p className="text-red-500 mt-2">{errMsg}</p>}
            </form>
        </div>
    </div>
  );
};

export default Login;
