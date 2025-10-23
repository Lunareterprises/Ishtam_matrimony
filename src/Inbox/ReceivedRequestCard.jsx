import React from 'react'
import profilecardimg from '../assets/ishtam-profilecard.jpg'
import { FaCheck, FaRegUser } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { UpdateStatusApi } from '../Services/allApi';
import Swal from 'sweetalert2';


function ReceivedRequestCard({ item }) {

    const calculateAge = (dob) => {
        if (!dob) return null;

        const birthDate = new Date(dob);   // "2025-09-17T04:07:10.000Z"
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // adjust if birthday hasn't happened yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const navigate = useNavigate()
    const navigateToParnerProfile = (id) => {
        navigate(`/partner-profile/${id}`)
    }

    //for canceling connection request
    const acceptRequest = async (interest_id) => {
        console.log("Inside cancel request");

        try {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const reqBody = {
                interest_id: interest_id,
                status: "accepted"
            };
            const result = await UpdateStatusApi(reqHeader, reqBody);
            console.log("Result  for update status ::", result)
            if (result?.data?.reult === true) {
                Swal.fire({
                    title: 'Connection Made!',
                    text: 'You said yes! A new story starts here.',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
            }
            else {
                Swal.fire({
                    title: 'Failed!',
                    text: 'Unable to accept the request. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        }
        catch (error) {
            Swal.fire({
                title: 'Oops!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });

        }
    }

    //for canceling connection request
    const declineRequest = async (interest_id) => {
        console.log("Inside cancel request");

        try {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const reqBody = {
                interest_id: interest_id,
                status: "rejected"
            };
            const result = await UpdateStatusApi(reqHeader, reqBody);
            console.log("Result  for update status ::", result)
            if (result?.data?.reult === true) {
                Swal.fire({
                    title: 'Request Cancelled!',
                    text: 'That connection is off. Explore more matches!',
                    icon: 'info',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
            }
            else {
                Swal.fire({
                    title: 'Failed!',
                    text: 'Oops! Couldn’t decline the request. Try again',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        }
        catch (error) {
            Swal.fire({
                title: 'Oops!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });

        }
    }

    return (
        <div>
            <div className=" hidden md:flex bg-white shadow-lg rounded-lg overflow-hidden w-full mb-4">
                <div className="relative">
                    {
                        item.u_profile_pic ?
                            <img

                                src={`https://lunarsenterprises.com:6050${item.u_profile_pic}`}
                                alt="Profile"
                                className="w-45 h-50 object-cover"
                            />
                            :
                            <div

                                alt="Profile"
                                className="border-gray-200 bg-[#D9D9D9]  w-45 h-50 flex items-center justify-center object-cover"
                            >
                                <FaRegUser className="text-[#797979] text-[24px] sm:text-[48px]" />
                            </div>
                    }
                    <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                        PREMIUM
                    </div>
                </div>

                <div className="p-5 flex flex-col justify-between items-center gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {item.u_firstname} {item.u_lastname}
                            <span className="text-gray-500 text-[18px]"> | ID : ITM{item.u_id}</span>
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {calculateAge(item.u_dob)} yrs, {item.height || "5’ 6”"} | {item.dob || "2001 July 04"} | {item.occupation || "Not Working"}
                        </p>
                        <p className="text-sm text-gray-600">{item.education || "BA English"}</p>
                        <p className="text-sm text-gray-600">
                            {item.language || "Malayalam"} | {item.religion || "Hindu, Nair"} | {item.location || "Alappuzha, Kerala"}
                        </p>
                    </div>
                    <div>
                        <button onClick={() => navigateToParnerProfile(item.u_id)} className=" bg-[#E33183] text-white px-4 py-2 rounded-full text-sm font-medium">
                            View Profile
                        </button>
                    </div>
                </div>


                {item.i_status === "accepted" ? (
                    <div className="flex flex-col items-center justify-center px-7 space-y-4 border-l">
                        <div className="flex flex-col items-center">
                            <button
                                className="border-2 border-[#E33183] text-[#E33183] px-4 py-2 rounded-full text-[13px] font-medium"
                                disabled
                            >
                                Accepted
                            </button>
                        </div>
                    </div>

                ) : item.i_status === "rejected" ? (

                    <div className="flex flex-col items-center justify-center px-7 space-y-4 border-l">
                        <div className="flex flex-col items-center">

                            <button
                                className="border-2 border-gray-400 text-gray-600 px-4 py-2 rounded-full text-[13px] font-medium"
                                disabled
                            >
                                Rejected
                            </button>
                        </div>
                    </div>

                ) : (

                    <div className="flex flex-col items-center justify-center px-7 space-y-4 border-l">

                        <div className="flex flex-col items-center gap-2">
                            <button onClick={() => acceptRequest(item.i_id)} className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-500">
                                <FaCheck className="text-2xl" />
                            </button>
                            <h1 className="text-[13px] font-semibold">Accept</h1>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <button onClick={() => declineRequest(item.i_id)} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                                <RxCross1 className="text-2xl" />
                            </button>
                            <h1 className="text-[13px] font-semibold">Decline</h1>
                        </div>
                    </div>

                )}

            </div>


            {/* Mobile Layout */}
            <div className="flex flex-col md:hidden bg-white shadow-lg rounded-lg overflow-hidden w-65 max-w-sm mb-4">
                <div className="relative">
                    {
                        item.u_profile_pic ?
                            <img src={`https://lunarsenterprises.com:6050${item.u_profile_pic}`} alt="Profile" className="w-full h-64 object-cover" />
                            :
                            <div

                                alt="Profile"
                                className="border-gray-200 bg-[#D9D9D9] w-full h-64 flex items-center justify-center object-cover"
                            >
                                <FaRegUser className="text-[#797979] text-[24px] sm:text-[48px]" />
                            </div>
                    }
                    <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                        PREMIUM
                    </div>
                </div>

                <div className="p-4">
                    <h2 className="text-[17px] font-semibold text-gray-800">
                        {item.u_firstname} {item.u_lastname}
                        <span className="text-gray-500 text-sm"> | ID : ITM{item.u_id}</span>
                    </h2>
                    <p className="text-[13px] text-gray-600 mt-1">
                        {calculateAge(item.u_dob)} yrs, {item.height || "5’ 6”"} | {item.dob || "2001 July 04"} | {item.occupation || "Not Working"}
                    </p>
                    <p className="text-[13px] text-gray-600">{item.education || "BA English"}</p>
                    <p className="text-[13px] text-gray-600">
                        {item.language || "Malayalam"} | {item.religion || "Hindu, Nair"} | {item.location || "Alappuzha, Kerala"}
                    </p>

                    <button onClick={() => navigateToParnerProfile(item.u_id)} className="bg-[#E33183] text-white px-4 py-2 rounded-full text-[13px] font-medium w-full mt-4">
                        View Profile
                    </button>
                </div>
                <div className="flex justify-around p-4 border-t border-gray-300">
                    {item.i_status === "accepted" ? (

                        <div className="flex flex-col items-center gap-2">
                            <button
                                className="border-2 border-[#E33183] text-[#E33183] px-4 py-2 rounded-full text-[13px] font-medium"
                                disabled
                            >
                                Accepted
                            </button>
                        </div>
                    ) : item.i_status === "rejected" ? (

                        <div className="flex flex-col items-center gap-2">

                            <button
                                className="border-2 border-gray-400 text-gray-600 px-4 py-2 rounded-full text-[13px] font-medium"
                                disabled
                            >
                                Declined
                            </button>
                        </div>
                    ) : (

                        <>
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    onClick={() => acceptRequest(item.i_id)}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-500"
                                >
                                    <FaCheck className="text-xl" />
                                </button>
                                <h1 className="text-[13px] font-semibold">Accept</h1>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <button
                                    onClick={() => declineRequest(item.i_id)}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                                >
                                    <RxCross1 className="text-2xl" />
                                </button>
                                <h1 className="text-[13px] font-semibold">Decline</h1>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ReceivedRequestCard
