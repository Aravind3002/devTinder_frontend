import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { setUser } from '../utils/userSlice'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.user);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const fetchuser=async()=>{
    if (userdata) {
      setCheckingAuth(false);
      return;
    }
    try{
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials:true
      })
      dispatch(setUser(response.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
    finally {
      setCheckingAuth(false);
    }
  };

  React.useEffect(() => {
      fetchuser();
  }, []);

  return (
    checkingAuth ? (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">loading.......</div>
      </div>
    ) : (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
  )
}

export default Body