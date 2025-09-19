import React, { useEffect, useState } from 'react'
import DashboardHeader from '../Components/DashboardHeader';
import Sidebar from '../Components/Sidebar';
import TodaysMatchCard from '../assets/TodaysMatchCard.jpg'
import { CgPhone } from "react-icons/cg";
import { FaEnvelope } from "react-icons/fa";
import { GiChickenOven } from "react-icons/gi";
import { GiFruitBowl } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa6";
import profilePic from "../assets/profilePic.jpg";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import DashboardNav from '../Components/DashboardNav';
import { FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import ChatMessages from '../Components/ChatMessages';
import { getPartnerProfileApi } from '../Services/allApi';
import { useParams } from 'react-router-dom';
import ConnectNowModal from '../Components/ConnectNowModal';

function PartnerProfile() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [partnerProfileData, setPartnerProfileData] = useState([]);
    const [showConnectNowModal, setShowConnectNowModal] = useState(false);

    //for fetching parter id 
    const { profileId } = useParams();

    const fetchPartnerProfile = async () => {
        console.log("profile id inside the function :::", profileId);
        try {
            const token = sessionStorage.getItem("token");
            console.log("token::", token);
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const reqBody = { partner_id: profileId };
            const result = await getPartnerProfileApi(reqBody, reqHeader);
            console.log("consoling result of fetching partner profile::", result);

            setPartnerProfileData(result?.data);
        } catch (error) {
            console.log("Error in fetching partner profile", error);
        }
    };

    useEffect(() => {
        if (profileId) {
            fetchPartnerProfile();
        }
    }, [profileId]);


    return (
        <>
            <div className='flex '>
                <div className="hidden lg:block w-64">
                    <Sidebar />
                </div>
                {/* Sidebar - mobile drawer */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 flex">
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 "
                            onClick={() => setSidebarOpen(false)}
                        />
                        {/* Drawer */}
                        <div className="relative bg-white z-50 h-full ">
                            <Sidebar />
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto">
                    {/* Topbar with menu button (mobile only) */}
                    <DashboardNav />

                    <div className='flex flex-col justify-center'>
                        <DashboardHeader />
                        <div className='flex flex-col w-full sm:px-0 px-2  py-10 sm:py-30 '>

                            {/* search bar and filter */}
                            <div className="flex px-10 lg:hidden items-center justify-center gap-3 pt-18 pb-8 w-full">
                                {/* Search Bar */}
                                <div className="relative w-full ">
                                    <input
                                        type="text"
                                        placeholder="Search Profile ID"
                                        className="w-full rounded-full border border-[#E4E4E7] pl-12 pr-4 py-2 text-[#787878] placeholder-gray-400 focus:outline-none"
                                    />
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>

                                {/* Filter Icon */}
                                <div className="w-10 h-10 border border-[#E4E4E7] rounded-md flex items-center justify-center">
                                    <PiSlidersBold className="text-xl text-[#787878]" />
                                </div>
                            </div>

                            <div className='flex justify-center'  >
                                <div className='max-w-[750px] w-full px-10 ' >
                                    <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-[0_0_18px_rgba(0,0,0,0.08)] overflow-hidden max-w-3xl w-full mx-auto gap-8">
                                        {/* Left Image Section */}
                                        <div className="relative sm:w-1/3 w-full overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={TodaysMatchCard}
                                                alt="Profile"
                                            />

                                            {/* Top Black Gradient */}
                                            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/60 to-transparent"></div>

                                            {/* Bottom Black Gradient */}
                                            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/60 to-transparent"></div>

                                            {/* Premium Tag */}
                                            <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[11px] font-semibold px-3 py-2 rounded-tl-md rounded-br-md z-10">
                                                PREMIUM
                                            </div>
                                        </div>

                                        {/* Right Content Section */}
                                        <div className="flex flex-col justify-center gap-2 p-5 sm:w-2/3 text-center sm:text-left">
                                            <h1 className="text-lg font-semibold">
                                                Esther Aann <span className="text-gray-500">| ID: IM1052</span>
                                            </h1>
                                            <p className="text-sm text-gray-700">
                                                24 yrs, 5’6’’ | 2001 July 04 | Not Working
                                            </p>
                                            <p className="text-sm text-gray-700">BA English</p>
                                            <p className="text-sm text-gray-700">
                                                Malayalam | Hindu, Nair | Alappuzha, Kerala
                                            </p>
                                            <p className="text-sm text-gray-700">Never Married | Never Married</p>
                                            <p className="text-sm text-gray-700">
                                                5LPA | Profile Managed by Siblings
                                            </p>

                                            {/* CTA Button */}
                                            <button onClick={() => setShowConnectNowModal(true)} className="mt-3 bg-[#E33183] hover:bg-[#c91e6b] text-white px-6 py-2 rounded-full text-sm font-semibold self-center sm:self-start">
                                                Send Interest
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* about profile */}
                            <div className='flex flex-col gap-2 px-10 pt-10 ' >
                                <h1 className='text-[17px] font-semibold text-[#1F1F1F] ' >About Esther Aann</h1>
                                <p className='text-[#1F1F1F] text-[14px]'  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </div>


                            {/* hobies and interest */}
                            <div className='flex flex-col gap-3 px-10 pt-8 items-start' >
                                <h1 className='text-[17px] font-semibold text-[#1F1F1F] '>Hobbies & Interests</h1>
                                <div className="flex flex-wrap gap-5">
                                    <span className="px-5 py-2 flex items-center text-sm font-medium text-[#E33183] border border-[#E33183] rounded-full bg-pink-50">
                                        Playing Musical Instruments
                                    </span>
                                    <span className="px-5 py-2 flex items-center justify-center text-sm font-medium text-[#E33183] border border-[#E33183] rounded-full bg-pink-50">
                                        Singing
                                    </span>
                                    <span className="px-5 py-2 flex items-center text-sm font-medium text-[#E33183] border border-[#E33183] rounded-full bg-pink-50">
                                        Writing / Poetry
                                    </span>
                                    <span className="px-5 py-2 flex items-center text-sm font-medium text-[#E33183] border border-[#E33183] rounded-full bg-pink-50">
                                        Acting / Drama
                                    </span>
                                    <span className="px-5 py-2 flex items-center text-sm font-medium text-[#E33183] border border-[#E33183] rounded-full bg-pink-50">
                                        Makeup & Styling
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row flex-wrap items-center md:items-center lg:items-start justify-center lg:justify-between gap-10 px-5 md:px-10 pt-10">

                                {/* Contact Details */}
                                <div className="flex flex-col gap-4 md:w-[45%] lg:w-auto text-center md:text-center lg:text-left">
                                    <h1 className="text-[17px] font-semibold text-[#1F1F1F]">Contact Details</h1>
                                    <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.08)] flex flex-col p-5">
                                        <div className="flex items-start flex-col gap-3 text-[#490B22]">
                                            <div className="flex gap-3 items-center justify-center lg:justify-start">
                                                <CgPhone className="text-2xl" />
                                                <h1 className="text-[#1F1F1F] text-[14px]">(+33) xxx xxx xx</h1>
                                            </div>
                                            <div className="flex gap-3 items-center justify-center lg:justify-start">
                                                <FaEnvelope className="text-2xl" />
                                                <h1 className="text-[#1F1F1F] text-[14px]">curtis.weaver@example.com</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Lifestyle */}
                                <div className="flex flex-col gap-4 w-full md:w-[30%] lg:w-auto text-center md:text-center lg:text-left">
                                    <h1 className="text-[17px] font-semibold text-[#1F1F1F]">Lifestyle</h1>
                                    <div className="flex flex-col items-center lg:items-start gap-3">
                                        <div className="text-[#E33183] border-2 border-[#E33183] rounded-2xl w-16 h-16 bg-pink-50 flex items-center justify-center">
                                            <div className="text-[43px]">
                                                <GiChickenOven />
                                            </div>
                                        </div>
                                        <p className="text-[14px] text-[#1F1F1F]">Non-Vegetarian</p>
                                    </div>
                                </div>

                                {/* Background */}
                                <div className="flex flex-col gap-4 w-full md:w-[30%] lg:w-auto text-center md:text-center lg:text-left">
                                    <h1 className="text-[17px] font-semibold text-[#1F1F1F]">Background</h1>
                                    <div className="flex flex-col gap-3 text-[#1F1F1F]">
                                        <h1 className="text-[14px]">Malayalam</h1>
                                        <h1 className="text-[14px]">Christian, Catholic</h1>
                                        <h1 className="text-[14px]">Lives in Ernakulam, Kerala, India</h1>
                                    </div>
                                </div>

                                {/* Extra Contact Details */}
                                <div className="flex flex-col gap-4 w-full md:w-[45%] lg:w-auto text-center md:text-center lg:text-left">
                                    <h1 className="text-[17px] font-semibold text-[#1F1F1F]">Contact Details</h1>
                                    <div className="flex flex-col gap-3 text-[#1F1F1F]">
                                        <div className="flex gap-3 items-center justify-center lg:justify-start">
                                            <FaGraduationCap className="text-2xl" />
                                            <h1 className="text-[14px]">curtis.weaver@example.com</h1>
                                        </div>
                                        <div className="flex gap-3 items-center justify-center lg:justify-start">
                                            <FaEnvelope className="text-2xl" />
                                            <h1 className="text-[14px]">curtis.weaver@example.com</h1>
                                        </div>
                                        <div className="flex gap-3 items-center justify-center lg:justify-start">
                                            <FaEnvelope className="text-2xl" />
                                            <h1 className="text-[14px]">curtis.weaver@example.com</h1>
                                        </div>
                                    </div>
                                </div>

                            </div>





                            <div className="flex flex-col w-full items-center justify-center pt-20 gap-10 px-10">
                                {/* Title */}
                                <div className="flex flex-col items-center w-full sm:w-[65%]">
                                    <h1 className="text-[22px] font-semibold mb-8 text-center">What She is looking for</h1>

                                    {/* Profile Images and Score */}
                                    <div className="flex w-full justify-between items-center">
                                        {/* Left Profile */}
                                        <div className="flex flex-col items-center gap-3">
                                            <img className="sm:w-33 sm:h-33 w-20 h-20 rounded-full object-cover shadow-md" src={TodaysMatchCard} alt="Today's Match" />
                                            <h1 className="font-semibold ">Esther Aann</h1>
                                        </div>

                                        {/* Score */}
                                        <div className="w-18 h-18 sm:h-22 sm:w-22 rounded-full bg-[#E33183] flex items-center justify-center text-white font-semibold sm:text-lg text-sm shadow-lg">
                                            09/10
                                        </div>

                                        {/* Right Profile */}
                                        <div className="flex flex-col items-center gap-3">
                                            <img className="sm:w-33 sm:h-33 w-20 h-20 rounded-full object-cover shadow-md" src={profilePic} alt="Profile Pic" />
                                            <h1 className="font-semibold ">Calvin Sunny</h1>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="flex flex-col gap-6 w-full sm:w-[57%] mt-6">
                                    {/* Each Row */}
                                    <div className="flex w-full justify-between items-center pb-4">
                                        <div className="flex flex-col items-start ">
                                            <h1 className="font-semibold">Age</h1>
                                            <h1>27-30</h1>
                                        </div>
                                        <div className="text-[#E33183] text-3xl">
                                            <FaCircleCheck />
                                        </div>
                                    </div>

                                    <div className="flex w-full justify-between items-center  pb-4">
                                        <div className="flex flex-col items-start ">
                                            <h1 className="font-semibold">Height</h1>
                                            <h1>4’10” (147cm) to 5’9” (175cm)</h1>
                                        </div>
                                        <div className="text-[#E33183] text-3xl">
                                            <FaCircleCheck />
                                        </div>
                                    </div>

                                    <div className="flex w-full justify-between items-center  pb-4">
                                        <div className="flex flex-col items-start ">
                                            <h1 className="font-semibold">Marital Status</h1>
                                            <h1>Never Married</h1>
                                        </div>
                                        <div className="text-[#E33183] text-3xl">
                                            <FaCircleCheck />
                                        </div>
                                    </div>

                                    <div className="flex w-full justify-between items-center pb-4">
                                        <div className="flex flex-col items-start ">
                                            <h1 className="font-semibold">Religion / Community</h1>
                                            <h1>Christian, Marthoma</h1>
                                        </div>
                                        <div className="text-[#E33183] text-3xl">
                                            <FaCircleCheck />
                                        </div>
                                    </div>

                                    <div className="flex w-full justify-between items-center">
                                        <div className="flex flex-col items-start">
                                            <h1 className="font-semibold">Mother Tongue</h1>
                                            <h1>Malayalam</h1>
                                        </div>
                                        <div className="text-[#E33183] text-3xl">
                                            <FaCircleCheck />
                                        </div>
                                    </div>



                                    <div className="flex w-full justify-between items-center pb-4">
                                        <div className="flex flex-col items-start ">
                                            <h1 className="font-semibold">Country Living In</h1>
                                            <h1>USA, China, UK, India</h1>
                                        </div>
                                        <div className="text-[#E33183] text-3xl">
                                            <FaCircleCheck />
                                        </div>
                                    </div>

                                    <div className="flex w-full justify-between items-center pb-4">
                                        <div className="flex flex-col items-start ">
                                            <h1 className="font-semibold">State Living In</h1>
                                            <h1>Kerala</h1>
                                        </div>
                                        <div className="text-[#E33183] text-3xl">
                                            <FaCircleCheck />
                                        </div>
                                    </div>

                                    <div className="flex w-full justify-between items-center pb-4">
                                        <div className="flex flex-col items-start ">
                                            <h1 className="font-semibold">Qualification</h1>
                                            <h1>Bachelors, Under Graduate</h1>
                                        </div>
                                        <div className="text-[#E33183] text-3xl">
                                            <FaCircleCheck />
                                        </div>
                                    </div>
                                    <div className="flex w-full justify-between items-center pb-4">
                                        <div className="flex flex-col items-start ">
                                            <h1 className="font-semibold">Working As</h1>
                                            <h1>IT Proffessional</h1>
                                        </div>
                                        <div className="text-[#E33183] text-3xl">
                                            <FaCircleCheck />
                                        </div>
                                    </div>
                                    <div className="flex w-full justify-between items-center pb-4">
                                        <div className="flex flex-col items-start ">
                                            <h1 className="font-semibold">Diet</h1>
                                            <h1>Working</h1>
                                        </div>
                                        <div className="text-neutral-400 text-3xl">
                                            <FaCircleMinus />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <ChatMessages />
                        </div>
                    </div>
                </div>
            </div >

            {/* Show modal */}
            {showConnectNowModal && (
                <ConnectNowModal onClose={() => setShowConnectNowModal(false)} />
            )}

        </>
    )
}

export default PartnerProfile
