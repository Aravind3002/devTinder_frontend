import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import { addConnection } from '../utils/connectionslice';


const Connections = () => {
        const connections=useSelector((state)=>state.connections);
        const dispatch = useDispatch();
    const fetchConnections=async()=>{
        try{
            const response = await axios.get(BASE_URL + "/user/connections", {
                withCredentials:true
            });
            // console.log(response.data);
            dispatch(addConnection(response.data));
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    };

    React.useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections || connections.length === 0) {
        return (
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold my-10 text-center">No connections found</h1>
            </div>
        );
    }

  return (
    <div className="flex flex-col           justify-center">
        <h1 className="text-2xl font-bold my-10 text-center">Connections</h1>

       {connections.map((connection) => (
        <div
            key={connection._id}
            className="card w-96 bg-base-300 shadow-xl my-5 mx-auto flex flex-row"
            >
            <div className="w-1/3">
                <img
                alt="Connection Profile"
                src={
                connection.profileImage ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                className="w-full h-48 object-cover"
                />
            </div>

            <div className="card-body w-2/3">
                <h2 className="card-title">
                    {connection.firstname} {connection.lastname}
                </h2>
                <p>Age: {connection.age}</p>
                <p>Gender: {connection.gender}</p>
                <p>About: {connection.about}</p>
            </div>
        </div>
        ))}
    </div>
  )
}

export default Connections