import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import FindYourIshtam from '../Dashboard/FindYourIshtam';
import DashboardHeader from '../Components/DashboardHeader';
import ChatMessages from '../Components/ChatMessages';
import DashboardNav from '../Components/DashboardNav';
import { FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";


function Subscription() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    


    const plans = [
        {
            name: "Basic",
            price: "₹1500",
            duration: "6 Month Duration",
            features: [
                "Unlimited Chat",
                "Unlimited Connection Requests",
                "3 Contact View Per Day",
                "Chat Support",
            ],
            buttonColor: "bg-[#5A0A1D] text-white", // Brown
            highlight: false,
        },
        {
            name: "Advance",
            price: "₹9",
            duration: "User/Month",
            features: [
                "App Management",
                "Attendance Management",
                "Leave System Management",
                "Employee Management",
                "Expense Tracking",
                "Chat Support",
                "Invoice Generate",
            ],
            buttonColor: "bg-white text-[#5A0A1D]",
            highlight: true, // highlighted like hover
        },
        {
            name: "Premium",
            price: "₹12",
            duration: "User/Month",
            features: [
                "App Management",
                "Attendance Management",
                "Leave System Management",
                "Employee Management",
                "Expense Tracking",
                "Chat Support",
                "Invoice Generate",
                "Purchase Generate",
                "Payroll",
            ],
            buttonColor: "bg-blue-100 text-[#5A0A1D]",
            highlight: false,
        },
    ];


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
                <DashboardNav />
                <div className='flex flex-col justify-center' >
                    <DashboardHeader />
                    {/* Page content */}
                    <div className="flex w-full md:pl-10 sm:px-0 px-2 py-10 sm:py-20">
                        <div className="max-w-[1000px] w-full px-4 sm:px-10">
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


                            <div className='flex flex-col justify-center items-center w-full' >
                                <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-10 px-4">
                                    {plans.map((plan, index) => (
                                        <div
                                            key={index}
                                            className="w-full md:w-72 rounded-lg border border-[#5A0A1D] shadow-md bg-white text-gray-800 
                                               transition-transform duration-300 hover:scale-105"
                                        >
                                            {/* Title */}
                                            <div className="text-center p-5 border-b border-gray-200">

                                                <h2 className="inline-block px-4 py-1 font-semibold text-[#5A0A1D] border-1 border-[#5A0A1D] rounded-[8px]">
                                                    {plan.name}
                                                </h2>


                                            </div>

                                            {/* Price */}
                                            <div className="text-center py-4">
                                                <h3 className="text-[40px] font-medium text-[#5A0A1D]">{plan.price}</h3>
                                                <p className="text-[14px]  text-gray-500">{plan.duration}</p>
                                            </div>

                                            {/* Features */}
                                            <ul className="px-6 space-y-2 text-[13px]">
                                                {plan.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        <IoIosCheckmarkCircleOutline className="text-green-500 text-xl " />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Button */}
                                            <div className="p-6">
                                                <button className="w-full py-2 rounded-md font-semibold bg-[#5A0A1D] text-white transition-colors hover:bg-[#7a1331]">
                                                    Choose Plan
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <ChatMessages />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription
