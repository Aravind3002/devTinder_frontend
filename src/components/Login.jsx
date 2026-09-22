import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId,setEmailId] = useState("");
const [password,setPassword] = useState("");
const [firstname,setFirstname] = useState("");
const [lastname,setLastname] = useState("");
const [isloginform,setIsloginform] = useState(false);
const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async () => {
  try{
    const response = await axios.post(BASE_URL + "/login", {
      email:emailId,
      password:password,
    },
    {
      withCredentials:true
    },
    );
    dispatch(setUser(response.data));
    navigate('/profile');
  }
  catch (error) {
    setError("Invalid credentials. Please try again.");
  
}
}

const handleSignup = async () => {
  try{
    const response = await axios.post(BASE_URL + "/signup", {
      firstname:firstname,
      lastname:lastname,
      email:emailId,
      password:password,
    },
    );
    setIsloginform(true); 
    setError("");
    setFirstname("");
    setLastname("");
    setEmailId("");
    setPassword("");
  }
  catch (error) {
    setError(error.response?.data?.error || "An error occurred while signing up.");
}
}

  return (
    <div className="flex justify-center my-18 bg-base-500">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">{isloginform ? "Login" : "Sign Up"}</legend>
        {!isloginform && (
          <>
            <label className="label">First Name</label>
            <input type="text" 
            className="input" 
            placeholder="First Name" 
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)} />


        <label className="label">Last Name</label>
        <input type="text" 
        className="input" 
        placeholder="Last Name" 
        value={lastname}
        onChange={(e) => setLastname(e.target.value)} />
        </>
        )
        }

  <label className="label">Email</label>
  <input type="email" 
   className="input" 
   placeholder="Email" 
   value={emailId}
   onChange={(e) => setEmailId(e.target.value)} />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    <p className="text-red-500 text-sm mt-2">
      {error}
    </p>
  <button className="btn btn-neutral mt-4" onClick={isloginform ? handleLogin: handleSignup}>
    {isloginform ? "Login" : "Sign Up"}
  </button>
  <p className="mt-2">
    {isloginform ? "Don't have an account?" : "Already have an account?"}
    <button className="btn btn-link" onClick={() => setIsloginform(!isloginform)}>
      {isloginform ? "Sign Up" : "Login"}
    </button>
  </p>
</fieldset>
    </div>
  )
}

export default Login