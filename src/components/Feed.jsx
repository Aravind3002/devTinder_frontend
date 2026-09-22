import React from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedslice';
import { useSelector } from 'react-redux';
import Usercard from './Usercard';

const Feed = () => {

  const feed=useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const getfeed=async()=>{
    
    try{
    const response = await axios.get(BASE_URL + "/feed", {
      withCredentials:true
    });
    // console.log(response.data);
    dispatch(addFeed(response.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  React.useEffect(() => {
      getfeed();
  }, []);

  if(!feed || feed.length === 0){
    return (
      <div className="flex flex-col justify-center">
        <p>No more users to show.</p>
      </div>
    );
  }

  return (

    feed&&(<div className="flex flex-col items-center justify-center my-20">
      <Usercard user={feed[0]} isclickable={true} />
    </div>)
  )
}

export default Feed