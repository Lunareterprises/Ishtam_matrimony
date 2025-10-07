import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import DashboardHeader from '../Components/DashboardHeader';
import ChatMessages from '../Components/ChatMessages';
import DashboardNav from '../Components/DashboardNav';
import { FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import IshttamProfileCards from '../Components/IshttamProfileCards';
import { useNavigate } from 'react-router-dom';
import { getTodaysMatchApi } from '../Services/allApi';
import DoubleHearts from '../assets/DoubleHearts.png';
import TodaysMatchHeader from './TodaysMatchHeader';


function TodaysMatch() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [todaysMatchData, setTodaysMatchData] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setlimit] = useState(12);
    const [search, setSearch] = useState("")
    const navigate = useNavigate()


    //for fetching todays match data
    const getTodaysMatch = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            const reqBody = {
                page: 1,
                limit: limit,
                search: " "
            };
            const result = await getTodaysMatchApi(reqHeader, reqBody)
            console.log("todays match data ::", result);
            setTodaysMatchData(result?.data?.data)
        }
        catch (error) {
            console.log("Error in fetching todays match", error);
        }
    }

    //for navigating to profile view page with profile id
    const navigateToParnerProfile = (id) => {
        navigate(`/partner-profile/${id}`)
    }

    useEffect(() => {
        getTodaysMatch()
    }, [])


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
                    <TodaysMatchHeader />
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



                            {/* profile cards section */}
                            <div className='pt-10' >
                                <div className='flex flex-col sm:items-start items-center text-center '>
                                    <h1 className='text-[22px] text-[#530F29] font-semibold' >Todays Match</h1>
                                    <p className='text-[16px font-semibold text-[#787878]' >we found {todaysMatchData.length} new profiles matching your preferance</p>
                                </div>

                                <div className="flex flex-col sm:items-start items-center gap-7 w-full">

                                    {todaysMatchData?.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
                                            {todaysMatchData?.map((item, index) => (
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

                                {
                                    todaysMatchData.length > 0 && <div className='flex w-full justify-center pt-10' >
                                        <button className="border border-[#E33183] text-[#E33183] text-[13px] px-8 py-2 rounded-l-full rounded-r-full  hover:text-black transition">
                                            View more
                                        </button>
                                    </div>
                                }

                            </div>

                        </div>
                        <ChatMessages />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodaysMatch
