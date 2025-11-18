import React, { useState } from 'react'
import profilecardimg from '../assets/ishtam-profilecard.jpg'
import { TbMessageCircleFilled } from 'react-icons/tb';
import { FaPhoneAlt, FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ViewContactModal from '../Components/ViewContactModal';
import { getContactDataApi } from '../Services/allApi';
import Swal from 'sweetalert2';
import { useAuth } from '../AuthContext/AuthContext';


function AcceptedRequestCard({ item }) {
    const [showViewContactModal, setShowViewContactModal] = useState(false)
    const [ContactData, setContactData] = useState([])
    const { user } = useAuth();
    const token = user?.token
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

    const navigateToChatWindow = (partner) => {
        navigate('/chatWindow', {
            state: {
                chat_id: partner.chat_id || null, // optional if you have chat id
                partner: {
                    id: partner.u_id,
                    firstname: partner.u_firstname,
                    lastname: partner.u_lastname,
                    profile_pic: partner.u_profile_pic,
                },
            },
        });
    };


    const getContactData = async (userId) => {
        console.log("get contact data::");

        try {

            console.log("token::", token);
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const reqBody = { partner_id: userId };
            const result = await getContactDataApi(reqBody, reqHeader);
            if (result?.data?.result === true) {
                console.log("result::", result);
                setContactData(result.data.data);
                setShowViewContactModal(true);
            }
            else {
                Swal.fire({
                    title: 'contact failed',
                    text: result?.data?.message || 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'ok',
                });
            }
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }

    return (
        <div>
            <div className="hidden md:flex bg-white shadow-lg rounded-lg overflow-hidden w-full mb-4 justify-between">
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
                            {calculateAge(item.u_dob)} yrs, {item.height || "5’ 6"} | {item.dob || "2001 July 04"} | {item.occupation || "Not Working"}
                        </p>
                        <p className="text-sm text-gray-600">{item.education || "BA English"}</p>
                        <p className="text-sm text-gray-600">
                            {item.language || "Malayalam"} | {item.u_religion || "N/A"} | {item.location || "Alappuzha, Kerala"}
                        </p>
                    </div>
                    <div>
                        <button onClick={() => navigateToParnerProfile(item.u_id)} className=" bg-[#E33183] text-white px-4 py-2 rounded-full text-sm font-medium">
                            View Profile
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center px-7 space-y-4 border-l">
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={() => navigateToChatWindow(item)}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-500"
                        >
                            <TbMessageCircleFilled className="text-2xl" />
                        </button>

                        <h1 className="text-[13px] font-semibold">Message</h1>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <button onClick={() => getContactData(item.u_id)} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                            <FaPhoneAlt className="text-2xl" />
                        </button>
                        <h1 className="text-[13px] font-semibold">Contact</h1>
                    </div>
                </div>
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
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={() => navigateToChatWindow(item)}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-500"
                        >
                            <TbMessageCircleFilled className="text-xl" />
                        </button>
                        <h1 className="text-[13px] font-semibold">Message</h1>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={() => getContactData(item.u_id)}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                        >
                            <FaPhoneAlt className="text-2xl" />
                        </button>
                        <h1 className="text-[13px] font-semibold">Contact</h1>
                    </div>
                </div>
            </div>
            {
                showViewContactModal && (
                    <ViewContactModal onClose={() => setShowViewContactModal(false)} contactData={ContactData} />
                )
            }


        </div>
    )
}

export default AcceptedRequestCard
