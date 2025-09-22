import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import DashboardHeader from '../Components/DashboardHeader';
import ChatMessages from '../Components/ChatMessages';
import DashboardNav from '../Components/DashboardNav';
import { FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import profilecardimg from '../assets/ishtam-profilecard.jpg'
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { TbMessageCircleFilled } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { listInterestApi } from '../Services/allApi';



function Inbox() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("contacts");
    const [interestList, setInterestList] = useState([]);

    const tabs = [
        { key: "received", label: "Received" },
        { key: "accepted", label: "Accepted" },
        { key: "sent", label: "Sent" },
        { key: "contacts", label: "Contacts" },
    ];

    const listInterest = async ({ status }) => {
        console.log("status in fun:::", status);

        try {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const reqBody = { status };
            const result = await listInterestApi(reqHeader, reqBody);
            console.log("result for inbox", result);
            setInterestList(result.data.data || []);
        }
        catch (error) {
            console.log(error);
        }
    }

    //for triggering api according to the change
    useEffect(() => {
        if (activeTab) {
            listInterest({ status: activeTab });
        }
    }, [activeTab]);

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



                            {/*  content section */}
                            <div className='flex flex-col justify-center items-center w-full' >
                                {/*  header tab */}
                                <div className="w-full flex  justify-center pt-5">
                                    <div className=" rounded-xl p-1 flex space-x-2  border-2 border-gray-200">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                                ${activeTab === tab.key
                                                        ? "bg-pink-600 text-white shadow"
                                                        : "bg-white text-gray-700 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>




                                {/* received request section */}
                                {activeTab === "received" && (
                                    <div className="flex items-center justify-center my-6">
                                        {interestList.length > 0 ? (
                                            interestList.map((item, index) => (
                                                <div key={index}>
                                                    {/* Paste your entire static received request card here exactly as it is */}
                                                    <div className=" hidden md:flex bg-white shadow-lg rounded-lg overflow-hidden w-full">
                                                        <div className="relative">
                                                            <img src={profilecardimg} alt="Profile" className="w-45 h-full object-cover" />
                                                            <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                                                                PREMIUM
                                                            </div>
                                                        </div>

                                                        <div className="p-5 flex flex-col justify-between items-center gap-4">
                                                            <div>
                                                                <h2 className="text-lg font-semibold text-gray-800">
                                                                    Esther Aann <span className="text-gray-500 text-sm">| ID: IM1052</span>
                                                                </h2>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    24 yrs, 5’ 6” | 2001 July 04 | Not Working
                                                                </p>
                                                                <p className="text-sm text-gray-600">BA English</p>
                                                                <p className="text-sm text-gray-600">Malayalam | Hindu, Nair | Alappuzha, Kerala</p>
                                                            </div>

                                                            <div>
                                                                <button className="bg-[#E33183] text-white px-4 py-2 rounded-full text-sm font-medium">
                                                                    View Profile
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col items-center justify-center px-7 space-y-4 border-l">
                                                            <div className="flex flex-col gap-2 items-center justify-center">
                                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-500">
                                                                    <FaCheck className="text-2xl" />
                                                                </button>
                                                                <h1 className="text-[13px] font-semibold">Accept</h1>
                                                            </div>
                                                            <div className="flex flex-col gap-2 items-center justify-center">
                                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                                                                    <RxCross1 className="text-2xl" />
                                                                </button>
                                                                <h1 className="text-[13px] font-semibold">Decline</h1>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Mobile Layout */}
                                                    <div className="flex flex-col md:hidden bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm">
                                                        <div className="relative">
                                                            <img src={profilecardimg} alt="Profile" className="w-full h-64 object-cover" />
                                                            <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                                                                PREMIUM
                                                            </div>
                                                        </div>

                                                        <div className="p-4">
                                                            <h2 className="text-lg font-semibold text-gray-800">
                                                                Esther Aann <span className="text-gray-500 text-sm">| ID: IM1052</span>
                                                            </h2>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                24 yrs, 5’ 6” | 2001 July 04 | Not Working
                                                            </p>
                                                            <p className="text-sm text-gray-600">BA English</p>
                                                            <p className="text-sm text-gray-600">Malayalam | Hindu, Nair | Alappuzha, Kerala</p>

                                                            <button className="bg-[#E33183] text-white px-4 py-2 rounded-full text-sm font-medium w-full mt-4">
                                                                View Profile
                                                            </button>
                                                        </div>

                                                        <div className="flex justify-around p-4 border-t">
                                                            <div className="flex flex-col items-center gap-2">
                                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-500">
                                                                    <FaCheck className="text-xl" />
                                                                </button>
                                                                <h1 className="text-[13px] font-semibold">Accept</h1>
                                                            </div>
                                                            <div className="flex flex-col items-center gap-2">
                                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                                                                    <RxCross1 className="text-xl" />
                                                                </button>
                                                                <h1 className="text-[13px] font-semibold">Decline</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500">No {activeTab} interests found</p>
                                        )}
                                    </div>
                                )}




                                {/* accepted request section */}
                                {activeTab === "accepted" && (
                                    <div className="flex flex-col items-center justify-center my-6 space-y-6">
                                        {interestList.length > 0 ? (
                                            interestList.map((item, index) => (
                                                <div key={index} className="w-full">
                                                    {/* Desktop Layout */}
                                                    <div className="hidden md:flex bg-white shadow-lg rounded-lg overflow-hidden w-full mb-4">
                                                        <div className="relative">
                                                            <img src={profilecardimg} alt="Profile" className="w-45 h-full object-cover" />
                                                            <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                                                                PREMIUM
                                                            </div>
                                                        </div>

                                                        <div className="p-5 flex flex-col justify-between items-center gap-4">
                                                            <div>
                                                                <h2 className="text-lg font-semibold text-gray-800">
                                                                    {item.name || "Esther Aann"}{" "}
                                                                    <span className="text-gray-500 text-sm">| ID: {item.id || "IM1052"}</span>
                                                                </h2>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    {item.age || "24"} yrs, {item.height || "5’ 6”"} | {item.dob || "2001 July 04"} | {item.occupation || "Not Working"}
                                                                </p>
                                                                <p className="text-sm text-gray-600">{item.education || "BA English"}</p>
                                                                <p className="text-sm text-gray-600">
                                                                    {item.language || "Malayalam"} | {item.religion || "Hindu, Nair"} | {item.location || "Alappuzha, Kerala"}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col items-center justify-center px-7 space-y-4 border-l">
                                                            <div className="flex flex-col items-center gap-2">
                                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-500">
                                                                    <TbMessageCircleFilled className="text-2xl" />
                                                                </button>
                                                                <h1 className="text-[13px] font-semibold">Message</h1>
                                                            </div>
                                                            <div className="flex flex-col items-center gap-2">
                                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                                                                    <FaPhoneAlt className="text-2xl" />
                                                                </button>
                                                                <h1 className="text-[13px] font-semibold">Contact</h1>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Mobile Layout */}
                                                    <div className="flex flex-col md:hidden bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm mb-4">
                                                        <div className="relative">
                                                            <img src={profilecardimg} alt="Profile" className="w-full h-64 object-cover" />
                                                            <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                                                                PREMIUM
                                                            </div>
                                                        </div>

                                                        <div className="p-4">
                                                            <h2 className="text-lg font-semibold text-gray-800">
                                                                {item.name || "Esther Aann"}{" "}
                                                                <span className="text-gray-500 text-sm">| ID: {item.id || "IM1052"}</span>
                                                            </h2>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {item.age || "24"} yrs, {item.height || "5’ 6”"} | {item.dob || "2001 July 04"} | {item.occupation || "Not Working"}
                                                            </p>
                                                            <p className="text-sm text-gray-600">{item.education || "BA English"}</p>
                                                            <p className="text-sm text-gray-600">
                                                                {item.language || "Malayalam"} | {item.religion || "Hindu, Nair"} | {item.location || "Alappuzha, Kerala"}
                                                            </p>

                                                            <button className="bg-[#E33183] text-white px-4 py-2 rounded-full text-sm font-medium w-full mt-4">
                                                                View Profile
                                                            </button>
                                                        </div>

                                                        <div className="flex justify-around p-4 border-t">
                                                            <div className="flex flex-col items-center gap-2">
                                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-500">
                                                                    <TbMessageCircleFilled className="text-xl" />
                                                                </button>
                                                                <h1 className="text-[13px] font-semibold">Message</h1>
                                                            </div>
                                                            <div className="flex flex-col items-center gap-2">
                                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                                                                    <FaPhoneAlt className="text-xl" />
                                                                </button>
                                                                <h1 className="text-[13px] font-semibold">Contact</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500">No {activeTab} interests found</p>
                                        )}
                                    </div>
                                )}



                                {/* sent Request section */}
                                {activeTab === "sent" && (
                                    <div className="flex flex-col items-center justify-center my-6 space-y-6">
                                        {interestList.length > 0 ? (
                                            interestList.map((item, index) => (
                                                <div key={index} className="w-full">
                                                    {/* Desktop Layout */}
                                                    <div className="hidden md:flex bg-white shadow-lg rounded-lg overflow-hidden w-full mb-4">
                                                        {/* Left - Image */}
                                                        <div className="relative">
                                                            <img
                                                                src={profilecardimg}
                                                                alt="Profile"
                                                                className="w-45 h-full object-cover"
                                                            />
                                                            <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                                                                PREMIUM
                                                            </div>
                                                        </div>

                                                        {/* Middle - Details */}
                                                        <div className="p-5 flex flex-col justify-between items-center gap-4">
                                                            <div>
                                                                <h2 className="text-lg font-semibold text-gray-800">
                                                                    {item.name || "Esther Aann"}{" "}
                                                                    <span className="text-gray-500 text-sm">| ID: {item.id || "IM1052"}</span>
                                                                </h2>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    {item.age || "24"} yrs, {item.height || "5’ 6”"} | {item.dob || "2001 July 04"} | {item.occupation || "Not Working"}
                                                                </p>
                                                                <p className="text-sm text-gray-600">{item.education || "BA English"}</p>
                                                                <p className="text-sm text-gray-600">
                                                                    {item.language || "Malayalam"} | {item.religion || "Hindu, Nair"} | {item.location || "Alappuzha, Kerala"}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <button className="bg-[#E33183] text-white px-4 py-2 rounded-full text-sm font-medium">
                                                                    View Profile
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Right - Action Buttons */}
                                                        <div className="flex flex-col items-center justify-center px-7 space-y-4 border-l">
                                                            <div className="flex flex-col gap-2 items-center justify-center">
                                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                                                                    <RxCross1 className="text-2xl" />
                                                                </button>
                                                                <h1 className="text-[13px] font-semibold">Decline</h1>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Mobile Layout */}
                                                    <div className="flex flex-col md:hidden bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm mb-4">
                                                        <div className="relative">
                                                            <img src={profilecardimg} alt="Profile" className="w-full h-64 object-cover" />
                                                            <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                                                                PREMIUM
                                                            </div>
                                                        </div>

                                                        <div className="p-4">
                                                            <h2 className="text-lg font-semibold text-gray-800">
                                                                {item.name || "Esther Aann"}{" "}
                                                                <span className="text-gray-500 text-sm">| ID: {item.id || "IM1052"}</span>
                                                            </h2>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {item.age || "24"} yrs, {item.height || "5’ 6”"} | {item.dob || "2001 July 04"} | {item.occupation || "Not Working"}
                                                            </p>
                                                            <p className="text-sm text-gray-600">{item.education || "BA English"}</p>
                                                            <p className="text-sm text-gray-600">
                                                                {item.language || "Malayalam"} | {item.religion || "Hindu, Nair"} | {item.location || "Alappuzha, Kerala"}
                                                            </p>

                                                            <button className="bg-[#E33183] text-white px-4 py-2 rounded-full text-sm font-medium w-full mt-4">
                                                                View Profile
                                                            </button>
                                                        </div>

                                                        <div className="flex justify-around p-4 border-t">
                                                            <div className="flex flex-col items-center gap-2">
                                                                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                                                                    <RxCross1 className="text-xl" />
                                                                </button>
                                                                <h1 className="text-[13px] font-semibold">Decline</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500">No {activeTab} interests found</p>
                                        )}
                                    </div>
                                )}




                                {/* contacts section */}
                                {activeTab === "contacts" && (
                                    <div className="flex flex-col items-center justify-center my-6 space-y-6">
                                        {interestList.length > 0 ? (
                                            interestList.map((item, index) => (
                                                <div key={index} className="w-full">
                                                    {/* Desktop Layout */}
                                                    <div className="hidden md:flex bg-white shadow-lg rounded-lg overflow-hidden w-full mb-4">
                                                        {/* Left - Image */}
                                                        <div className="relative">
                                                            <img src={profilecardimg} alt="Profile" className="w-45 h-full object-cover" />
                                                            <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                                                                PREMIUM
                                                            </div>
                                                        </div>

                                                        {/* Middle - Details */}
                                                        <div className="p-5 flex flex-col justify-center items-center gap-4">
                                                            <div>
                                                                <h2 className="text-lg font-semibold text-gray-800">
                                                                    {item.name || "Esther Aann"}{" "}
                                                                    <span className="text-gray-500 text-sm">| ID: {item.id || "IM1052"}</span>
                                                                </h2>
                                                                <p className="text-sm text-gray-600 mt-1">
                                                                    {item.age || "24"} yrs, {item.height || "5’ 6”"} | {item.dob || "2001 July 04"} | {item.occupation || "Not Working"}
                                                                </p>
                                                                <p className="text-sm text-gray-600">{item.education || "BA English"}</p>
                                                                <p className="text-sm text-gray-600">
                                                                    {item.language || "Malayalam"} | {item.religion || "Hindu, Nair"} | {item.location || "Alappuzha, Kerala"}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Right - Action Buttons */}
                                                        <div className="flex flex-col items-center justify-center px-7 space-y-4">
                                                            <div>
                                                                <button className="bg-[#E33183] text-white px-4 py-2 rounded-full text-sm font-medium">
                                                                    View Profile
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Mobile Layout */}
                                                    <div className="flex flex-col md:hidden bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm mb-4">
                                                        <div className="relative">
                                                            <img src={profilecardimg} alt="Profile" className="w-full h-64 object-cover" />
                                                            <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                                                                PREMIUM
                                                            </div>
                                                        </div>

                                                        <div className="p-4">
                                                            <h2 className="text-lg font-semibold text-gray-800">
                                                                {item.name || "Esther Aann"}{" "}
                                                                <span className="text-gray-500 text-sm">| ID: {item.id || "IM1052"}</span>
                                                            </h2>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {item.age || "24"} yrs, {item.height || "5’ 6”"} | {item.dob || "2001 July 04"} | {item.occupation || "Not Working"}
                                                            </p>
                                                            <p className="text-sm text-gray-600">{item.education || "BA English"}</p>
                                                            <p className="text-sm text-gray-600">
                                                                {item.language || "Malayalam"} | {item.religion || "Hindu, Nair"} | {item.location || "Alappuzha, Kerala"}
                                                            </p>

                                                            <button className="bg-[#E33183] text-white px-4 py-2 rounded-full text-sm font-medium w-full mt-4">
                                                                View Profile
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500">No {activeTab} contacts found</p>
                                        )}
                                    </div>
                                )}





                            </div>
                        </div>
                        <ChatMessages />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inbox
