import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeuserfromFeed } from '../utils/feedslice';
const Usercard = ({ user, isclickable }) => {
   if (!user) {
    return null;
  }

    const { _id, firstname, lastname, profileImage, age, gender,about } = user;
    const dispatch=useDispatch();
    const handlesendrequest = async (status,userid) => {
        try {
            const response = await axios.post(BASE_URL+"/request/send/"+status+"/"+userid, {}, {
                withCredentials: true
            });
            // console.log(response.data);
            dispatch(removeuserfromFeed(userid));
        }
        catch (error) {
            console.error("Error sending request:", error);
        }
      }


  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={user?.profileImage || "https://as1.ftcdn.net/v2/jpg/08/77/14/82/1000_F_877148202_juJIhToSiz5x175ey1zfcnDu3EuiDjX6.jpg"}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstname} {lastname}</h2>
    {age && <p>Age: {age}</p>}
    {gender && <p>Gender: {gender}</p>}
    {about && <p>About: {about}</p>}
    <div className="card-actions justify-end">
      {isclickable && (
        <>
          <button className="btn btn-primary" onClick={() => handlesendrequest("Ignore", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handlesendrequest("Interested", _id)}>Interested</button>
        </>
      )}
    </div>
  </div>
</div>
  )
}

export default Usercard