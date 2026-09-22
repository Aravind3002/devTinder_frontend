import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addrequest } from '../utils/requestslice';
import { useEffect } from 'react';
import { removeRequest } from '../utils/requestslice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((state) => state.requests);

    const reviewrequest=async(status,_id)=>{
        try{
            const response = await axios.post(BASE_URL + "/request/review/" + status+"/" + _id, {},
            {
                withCredentials: true
            });
            // console.log(response.data);
            // fetchrequests();
            dispatch(removeRequest(_id));
        }
        catch (error) {
            console.error("Error reviewing request:", error);
        }
    }

    const fetchrequests = async () => {
        try {
            const response = await axios.get(
                BASE_URL + "/user/requests/received",
                {
                    withCredentials: true
                }
            );

            dispatch(addrequest(response.data));
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

    useEffect(() => {
        fetchrequests();
    }, []);

    if (!requests || requests.length === 0) {
        return (
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold my-10 text-center">
                    No requests found
                </h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center">

            <h1 className="text-2xl font-bold my-10 text-center">
                Requests
            </h1>

            {requests.map((request) => {
                const {
                    firstname,
                    lastname,
                    age,
                    gender,
                    about,
                    profileImage
                } = request.fromuserid;

                return (
                    <div
                        key={request._id}
                        className="card w-[800px] min-h-40 bg-base-300 shadow-xl my-5 mx-auto flex flex-row items-center overflow-hidden"
                    >

                        {/* Image */}
                        <div className="w-32 h-28 shrink-0">
                            <img
                                alt="Request Profile"
                                src={
                                    profileImage ||
                                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                }
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 px-6">
                            <h2 className="text-xl font-bold">
                                {firstname} {lastname}
                            </h2>

                            <p>Age: {age}</p>
                            <p>Gender: {gender}</p>

                            <p className="truncate max-w-[350px]">
                                About: {about}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-row gap-2 px-5">
                            <button className="btn btn-primary btn-sm" onClick={() => reviewrequest("accepted", request._id)}>
                                Accept
                            </button>

                            <button className="btn btn-secondary btn-sm" onClick={() => reviewrequest("rejected", request._id)}>
                                Reject
                            </button>
                        </div>

                    </div>
                );
            })}
        </div>
    );
};

export default Requests;