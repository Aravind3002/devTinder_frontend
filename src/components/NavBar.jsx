import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userslice';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const user=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handlelogout=async()=>{
    try{
      await axios.post(BASE_URL + "/logout", {},{
        withCredentials:true
      })
      dispatch(removeUser());
      return navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }


  return (
    <div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
  {!user ? (
    <Link to="/login" className="btn btn-ghost text-xl">DevTinder</Link>
  ) : (
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  )}
</div>
    {user && (<div className="flex gap-2">
      <div className="dropdown dropdown-end mx-5">
        welcome {user.firstname}
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          
          <div className="w-10 rounded-full">
            <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
           </li>
          <li><Link to="/connections">Connections</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li><a onClick={handlelogout}>Logout</a></li>
        </ul>
      </div>
    </div>)}
    </div>
  )
}

export default NavBar