import React, { useEffect, useState } from 'react'
import IshttamImg from '../assets/ishtamcard.png'
import profilecardimg from '../assets/ishtam-profilecard.jpg'
import { FaCamera } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import ConnectNowModal from './ConnectNowModal';
import { sendInterestApi } from '../Services/allApi';

function IshttamProfileCards({ item }) {
    const [showConnectNowModal, setShowConnectNowModal] = useState(false);
    useEffect(() => {
        console.log("item ::: ", item);
    })


    const navigate = useNavigate()
    const navigateToParnerProfile = (id) => {
        navigate(`/partner-profile/${id}`)
    }

    //for calculating age
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


   

    return (
        <>
            <div
                className="rounded-lg overflow-hidden relative shadow-lg w-55"
            >
                {/* Top badges */}
                <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                    PREMIUM
                </div>

                <div className="absolute top-2 right-2 flex gap-2">
                    <div className="flex items-center gap-1 bg-black bg-opacity-80 text-white px-2 py-1 rounded-3xl text-[11px]">
                        <FaCamera className="text-xs" />
                        <span>3</span>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center bg-black bg-opacity-80 rounded-full">
                        <BsThreeDotsVertical className="text-white text-sm" />
                    </div>
                </div>

                {/* Profile image */}
                <img
                    onClick={() => navigateToParnerProfile(item.u_id)}
                    src={profilecardimg}
                    alt="Profile"
                    className="w-full h-72 object-cover"
                />

                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent p-3">
                    <div className="flex gap-2 items-center pb-1">
                        <h3 className="text-sm font-semibold text-white">
                            {item.u_firstname} {item.u_lastname}
                        </h3>
                        <div className="rounded-l-full rounded-r-full bg-[rgba(0,0,0,0.5)] text-white text-[7px] py-1 px-3">
                            4 hrs ago
                        </div>
                    </div>
                    <p className="text-[10px] font-normal text-[#D4D4D8]">
                        {calculateAge(item.u_dob)} yrs, {item.u_height} |{" "}
                        {item.u_working_as}
                    </p>
                    <p className="text-[10px] font-normal text-[#D4D4D8]">
                        {item.u_mother_tongue} | {item.u_community} | {item.u_district},{" "}
                        {item.u_state}
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-between mt-2">
                        <button className="border border-white text-white text-[9px] px-3 py-1 rounded-l-full rounded-r-full hover:bg-white hover:text-black transition">
                            View Contact
                        </button>
                        <button onClick={() => setShowConnectNowModal(true)} className="bg-[#E33183] text-white text-[9px] px-3 py-1 rounded-l-full rounded-r-full hover:bg-pink-600 transition">
                            Connect Now
                        </button>
                    </div>
                </div>
            </div>
            {/* Show modal */}
            {showConnectNowModal && (
                <ConnectNowModal receiver_id={item.u_id} onClose={() => setShowConnectNowModal(false)} />
            )}
        </>
    )
}

export default IshttamProfileCards
