import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { FaPen } from "react-icons/fa";
import IshttamProfileCards from '../Components/IshttamProfileCards';
import FindYourIshtam from './FindYourIshtam';
import MatchSuggestions from './MatchSuggestions';
import WhoViewedMyProfile from './WhoViewedMyProfile';
import DashboardHeader from '../Components/DashboardHeader';
import profilePic from "../assets/profilePic.jpg";
import { HiBadgeCheck } from "react-icons/hi";
import { BsArrowDownLeftCircleFill } from "react-icons/bs";
import { BsFillArrowDownRightCircleFill } from "react-icons/bs";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import ChatMessages from '../Components/ChatMessages';




function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [progress, setProgress] = useState(65);

    return (
        <div className="flex">
            {/* Sidebar - desktop */}
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

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                {/* Topbar with menu button (mobile only) */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b">
                    <button
                        className="text-[#540D33] font-bold"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>
                    <h1 className="text-lg font-semibold text-[#540D33]">Dashboard</h1>
                </div>
                <div className='flex flex-col justify-center' >
                    <DashboardHeader />
                    {/* Page content */}
                    <div className="flex w-full md:pl-10 sm:px-0 px-2 py-10 sm:py-20">

                        <div className="max-w-[1000px] w-full px-4 sm:px-10">
                            <div className="flex flex-col lg:flex-row gap-4 w-full">


                                {/* Profile Summary */}
                                <div className="bg-white rounded-xl overflow-hidden border border-[#E4E4E7] w-full lg:w-[60%] shadow-sm">
                                    {/* Header */}
                                    <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 bg-[#E331830F]">
                                        <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#540D33]">
                                            Profile Summary
                                        </h2>
                                    </div>

                                    {/* Body */}
                                    <div className="px-4 sm:px-7 py-4 sm:py-7 w-full">
                                        <div className="flex gap-7">
                                            {/* Profile Image */}
                                            <div className="w-[140px] h-[140px] overflow-hidden rounded-lg border border-gray-200 flex-shrink-0">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={profilePic}
                                                    alt="Profile"
                                                />
                                            </div>

                                            {/* Info + Progress */}
                                            <div className="flex-1">
                                                {/* Name & Badge */}
                                                <div className="text-[#540D33]">
                                                    <div className="flex items-center gap-2">
                                                        <h1 className="text-[17px] font-semibold">Calvin Sunny</h1>
                                                        <HiBadgeCheck className="text-[19px] text-[#3A78FF]" />
                                                    </div>
                                                    <h1 className="text-[14px] font-medium">28 | Christian</h1>
                                                </div>

                                                {/* Progress Section */}
                                                <div className="w-full pt-17">
                                                    {/* Progress Container */}
                                                    <div className="relative w-full bg-gray-200 rounded-full h-2">
                                                        {/* Fill */}
                                                        <div
                                                            className="bg-[#E33183] h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${progress}%` }}
                                                        ></div>

                                                        {/* Floating Label */}
                                                        <div
                                                            className="absolute -top-15 flex items-center justify-center px-6 py-3 text-white text-[11px] font-medium bg-[#E33183] rounded-full whitespace-nowrap"
                                                            style={{
                                                                left: `${progress}%`,
                                                                transform: "translateX(-50%)",
                                                            }}
                                                        >
                                                            {progress}% Completed

                                                            {/* Pointer */}
                                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#E33183] rounded-full"></div>
                                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full scale-75"></div>
                                                        </div>

                                                    </div>

                                                    {/* Bottom Text */}
                                                    <p className="mt-3 text-[#540D33] text-[14px] font-medium">
                                                        “ Your profile is {progress}% completed ”
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex gap-5 items-center justify-center pt-5' >
                                            <button className="py-2 px-7 text-[14px] border border-[#E33183] text-[#E33183] rounded-full font-medium hover:bg-pink-50">
                                                Change password
                                            </button>
                                            <button className="py-2 px-7 text-[14px] bg-[#E33183] text-white rounded-full font-medium hover:bg-pink-700">
                                                Edit Profile
                                            </button>

                                        </div>
                                    </div>
                                </div>

                                {/* Side cards */}
                                <div className="flex flex-col gap-4 w-full lg:w-[40%]">
                                    {/* Received Interest */}
                                    <div className="rounded-xl overflow-hidden border border-[#E4E4E7]">
                                        <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 bg-[#E331830F]">
                                            <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#540D33]">Received Interest</h2>
                                            <BsArrowDownLeftCircleFill className="text-[#E33183] text-[28px] sm:text-[32px]" />
                                        </div>
                                        <div className="bg-white px-4 sm:px-7 py-4 sm:py-4">
                                            <div className="text-center text-[28px] sm:text-[38px] font-semibold text-[#540D33]">10 +</div>
                                        </div>
                                    </div>

                                    {/* Sent Requests */}
                                    <div className="rounded-xl overflow-hidden border border-[#E4E4E7]">
                                        <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 bg-[#E331830F]">
                                            <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#540D33]">Sent Requests</h2>
                                            <BsArrowUpRightCircleFill className="text-[#E33183] text-[28px] sm:text-[32px]" />
                                        </div>
                                        <div className="bg-white px-4 sm:px-7 py-4 sm:py-4">
                                            <div className="text-center text-[28px] sm:text-[38px] font-semibold text-[#540D33]">100 +</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Other sections */}
                            <FindYourIshtam />
                            <MatchSuggestions />
                            <WhoViewedMyProfile />
                        </div>
                        <ChatMessages/>
                    </div>
                </div>

            </div>

            
        </div>
    )
}

export default Dashboard
