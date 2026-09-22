import React from 'react'
import {useState} from 'react';
import Usercard from './Usercard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userslice';


const Editprofile = ({user}) => {
  const [firstname,setFirstName] = useState(user.firstname || "");
  const [lastname,setLastName] = useState(user.lastname || "");
  const [profileImage,setProfileImage] = useState(user.profileImage || "");
  const [age,setAge] = useState(user.age || "");
  const [gender,setGender] = useState(user.gender || "");
  const [about,setAbout] = useState(user.about || "");
  const [error,setError] = useState(null);
  const [showtoast, setShowToast] = useState(false);


  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.user);

  

  const saveprofile= async ()=>{
    setError(null);
    try{
      const response = await axios.patch(BASE_URL + "/profile/edit", {
        firstname,
        lastname,
        profileImage,
        age: parseInt(age),
        gender,
        about
      },{
    withCredentials:true
      }
    );
    dispatch(setUser(response.data));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  } catch (error) {
    setError(
        error.response?.data?.error ||
        "An error occurred while saving the profile."
    );
  }
  };


  return (
    <>
    <div className="flex items-center justify-center min-h-screen pb-20">
      <div className="flex justify-center my-1 bg-base-500 mx-10">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Edit Profile</legend>

  <label className="label">First Name</label>
  <input type="text" 
   className="input" 
   placeholder="First Name"
   value={firstname}
   onChange={(e) => setFirstName(e.target.value)} />

  <label className="label">Last Name</label>
  <input type="text" className="input" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} />

  <label className="label">Profile Picture URL</label>
  <input type="text" className="input" placeholder="Profile Picture URL" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />

  <label className="label">Age</label>
  <input type="number" className="input" placeholder="Age" value={age} min="0" onChange={(e) => setAge(e.target.value)} />

  <label className="label">Gender</label>
  <select className="select" value={gender} onChange={(e) => setGender(e.target.value)}>
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>

  <label className="label">About</label>
  <textarea className="textarea" placeholder="Tell us about yourself" value={about} onChange={(e) => setAbout(e.target.value)} />

  {error && <p className="text-error mt-2">{error}</p>}
  <button className="btn btn-neutral mt-4" onClick={saveprofile}>
    Save Changes
  </button>
</fieldset>
      </div>
      <Usercard user={{ firstname, lastname, profileImage, age: parseInt(age), gender, about }} isclickable={false} />
    </div>
    {showtoast && (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile updated successfully.</span>
        </div>
      </div>
    )}
    </>
  )
}

export default Editprofile