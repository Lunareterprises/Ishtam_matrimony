import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import DashboardHeader from '../Components/DashboardHeader';
import ChatMessages from '../Components/ChatMessages';
import DashboardNav from '../Components/DashboardNav';
import { FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import { listVisitedHistoryApi } from '../Services/allApi';
import IshttamProfileCards from '../Components/IshttamProfileCards';
import DoubleHearts from '../assets/DoubleHearts.png';

function ProfileVisits() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("i_visited");
    const [visitHistoryList, setVisitHistoryList] = useState([])

    const tabs = [
        { key: "i_visited", label: "Profiles I Viewed" },
        { key: "visited_me", label: "Profiles Who Viewed Me" },

    ];


    const getWhoViewedMyProfile = async (type) => {
        try {
            console.log("type::", type);

            const reqBody = { type };
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const result = await listVisitedHistoryApi(reqHeader, reqBody);
            console.log(`${type} data ::`, result);
            setVisitHistoryList(result.data.data || []);
        } catch (error) {
            console.log("Error in fetching my match", error);
        }
    };

    useEffect(() => {
        if (activeTab) {
            getWhoViewedMyProfile(activeTab); // pass string directly
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

                            {/*  content section */}
                            <div className='flex flex-col justify-center items-center w-full sm:pt-0 pt-15' >
                                {/*  header tab */}
                                <div className="w-full flex justify-center pt-5 px-2 sm:px-0">
                                    <div className="flex flex-wrap justify-center sm:flex-nowrap gap-2 sm:gap-2 rounded-xl p-1 border-2 border-gray-200">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`flex-1 sm:flex-none text-center px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200
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


                                {/* i visited */}
                                {activeTab === "i_visited" && (

                                    <>
                                        <div className="flex flex-col items-center gap-7 w-full">
                                            {visitHistoryList?.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-10 justify-items-center">
                                                    {visitHistoryList.map((item, index) => (
                                                        <IshttamProfileCards key={index} item={item} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-20 w-full">
                                                    <img src={DoubleHearts} alt="" className="h-6 mb-2" />
                                                    <p className="text-gray-600">No data found</p>
                                                </div>
                                            )}
                                        </div>


                                        {/* {
                                            visitHistoryList.length > 0 && <div className='flex w-full justify-center pt-10' >
                                                <button className="border border-[#E33183] text-[#E33183] text-[13px] px-8 py-2 rounded-l-full rounded-r-full  hover:text-black transition">
                                                    View more
                                                </button>
                                            </div>
                                        } */}
                                    </>

                                )}

                                {/* i visited */}
                                {activeTab === "visited_me" && (
                                    <>
                                        <div className="flex flex-col sm:items-start items-center justify-center gap-7 w-full">
                                            {visitHistoryList?.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
                                                    {visitHistoryList.map((item, index) => (
                                                        <IshttamProfileCards item={item} />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-20 w-full">
                                                    <img src={DoubleHearts} alt="" className="h-6 mb-2" />
                                                    <p className="text-gray-600">No data found</p>
                                                </div>
                                            )}
                                        </div>

                                        {/*  {
                                            visitHistoryList.length > 0 && <div className='flex w-full justify-center pt-10' >
                                                <button className="border border-[#E33183] text-[#E33183] text-[13px] px-8 py-2 rounded-l-full rounded-r-full  hover:text-black transition">
                                                    View more
                                                </button>
                                            </div>
                                        } */}
                                    </>
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

export default ProfileVisits
