import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ toggleLogin, errMsg, setErrMsg }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      const res = await fetch(import.meta.env.REGISTER_URL, {
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

    //   alert("Registration successful");
      navigate("/home")
    } catch (err) {
      console.error("Error during registration: ", err);
    }
  };

  return (
    <div className="w-full h-full text-black  px-9 py-20 rounded-lg shadow-lg flex items-center">
        <div className="w-full  flex flex-col gap-12">
             <div className=" w-full h-[15%] ">
                <h1 className="text-[#023530] text-3xl font-medium mb-2">Create an account</h1>
                <h3 className="font-semibold">Already have an account?? <button className="text-blue-700" type="button"
                onClick={toggleLogin}>Login</button></h3>
            </div>
            <form className="h-[85%] w-full flex flex-col gap-2 outline-[#023530]" onSubmit={handleSubmit}>
                <input className="bg-gray-100 px-4 py-2 rounded"
                    type="name"
                    name = "name"
                    placeholder="name"
                    value={name}
                    onChange={(e => setName(e.target.value))}
                />
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
                    Sign Up
                </button>
                {errMsg && <p className="text-red-500 mt-2">{errMsg}</p>}
            </form>
        </div>
    </div>
  );
};

export default Register;
