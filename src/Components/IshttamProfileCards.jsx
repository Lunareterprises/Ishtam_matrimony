import React, { useEffect, useState } from 'react'
import IshttamImg from '../assets/ishtamcard.png'
import profilecardimg from '../assets/ishtam-profilecard.jpg'
import { FaCamera, FaHeart, FaRegUser } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import ConnectNowModal from './ConnectNowModal';
import { addRemoveWishlistApi, getContactDataApi, sendInterestApi } from '../Services/allApi';
import ViewContactModal from './ViewContactModal';
import Swal from 'sweetalert2';
import { FaRegHeart } from "react-icons/fa";


function IshttamProfileCards({ item }) {
    const [showConnectNowModal, setShowConnectNowModal] = useState(false);
    useEffect(() => {
        console.log("item ::: ", item);
    })
    const [ContactData, setContactData] = useState([])
    const [showViewContactModal, setShowViewContactModal] = useState(false)
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

    /*  <FaRegUser className="text-[#797979] text-[24px] sm:text-[30px]" /> */


    const getContactData = async (userId) => {

        try {
            const token = sessionStorage.getItem("token");
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

    //add and remove to wishlist
    const handleAddRemoveWishlist = async (userId) => {
        try {
            const token = sessionStorage.getItem("token");
            const reqBody = { partner_id: userId };
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const result = await addRemoveWishlistApi(reqBody, reqHeader);
            console.log("Wishlist API Response:", result);
            if (result?.data?.result === true) {
                Swal.fire({
                    title: result?.data?.message === "Added to wishlist"
                        ? "Shortlisted Successfully!"
                        : "Removed from Shortlist!",
                    text: "Check your shortlist for updates",
                    icon: "success",
                    iconColor: "#E33183",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    title: 'Unable to Shortlist!',
                    text: result?.data?.message || 'Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Unable to Shortlist!',
                text: error?.response?.data?.message || 'Something went wrong, please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };


    return (
        <>
            <div
                className="rounded-lg overflow-hidden relative shadow-lg w-55"
            >
                {/* Top badges */}
                <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                    {/* {item.active_plan === null ? "Free" : item.active_plan.s_plan_name} */} freee
                </div>

                <div className="absolute top-2 right-2 flex gap-2">
                    <div className="flex items-center gap-1 bg-black bg-opacity-80 text-white px-2 py-1 rounded-3xl text-[11px]">
                        <FaCamera className="text-xs" />
                        <span>3</span>
                    </div>
                    {
                        item.wishlisted === false ?
                            <div onClick={() => handleAddRemoveWishlist(item.u_id)} className="w-6 h-6 flex items-center justify-center bg-black bg-opacity-80 rounded-full">
                                {/* <BsThreeDotsVertical className="text-white text-sm" /> */}
                                <FaRegHeart className="text-white text-xs" />
                            </div>
                            :
                            <div onClick={() => handleAddRemoveWishlist(item.u_id)} className="w-6 h-6 flex items-center justify-center bg-black bg-opacity-80 rounded-full">
                                {/* <BsThreeDotsVertical className="text-white text-sm" /> */}
                                <FaHeart className="text-[#E33183] text-xs" />
                            </div>
                    }
                </div>

                {/* Profile image */}
                {
                    item.u_profile_pic ?
                        <img
                            onClick={() => navigateToParnerProfile(item.u_id)}
                            src={`https://lunarsenterprises.com:6050${item.u_profile_pic}`}
                            alt="Profile"
                            className="w-full h-72 object-cover"
                        />
                        :
                        <div
                            onClick={() => navigateToParnerProfile(item.u_id)}
                            alt="Profile"
                            className="border-gray-200 bg-[#D9D9D9]  w-full h-72 flex items-center justify-center object-cover"
                        >
                            <FaRegUser className="text-[#797979] text-[24px] sm:text-[48px]" />
                        </div>
                }


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
                        {calculateAge(item.u_dob)} yrs, {item.u_height} cm |{" "}
                        {item.u_working_as}
                    </p>
                    <p className="text-[10px] font-normal text-[#D4D4D8]">
                        {item.u_religion} | {item.u_community}
                    </p>
                    <p className="text-[10px] font-normal text-[#D4D4D8]">
                        {item.u_district} | {item.u_state}
                    </p>

                    {/* Buttons */}
                    <div className="flex justify-between mt-2">
                        <button onClick={() => getContactData(item.u_id)} className="border border-white text-white text-[10px] px-3 py-1 rounded-l-full rounded-r-full hover:bg-white hover:text-black transition">
                            View Contact
                        </button>
                        <button onClick={() => setShowConnectNowModal(true)} className="bg-[#E33183] text-white text-[10px] px-3 py-1 rounded-l-full rounded-r-full hover:bg-pink-600 transition">
                            Connect Now
                        </button>
                    </div>
                </div>
            </div>
            {/* Show modal */}
            {showConnectNowModal && (
                <ConnectNowModal receiver_id={item.u_id} onClose={() => setShowConnectNowModal(false)} />
            )}

            {
                showViewContactModal && (
                    <ViewContactModal onClose={() => setShowViewContactModal(false)} contactData={ContactData} />
                )
            }

        </>
    )
}

export default IshttamProfileCards
