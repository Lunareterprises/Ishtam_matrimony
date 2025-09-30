import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import DashboardHeader from '../Components/DashboardHeader';
import ChatMessages from '../Components/ChatMessages';
import DashboardNav from '../Components/DashboardNav';
import { listInterestApi } from '../Services/allApi';
import ReceivedRequestCard from './ReceivedRequestCard';
import AcceptedRequestCard from './AcceptedRequestCard';
import SentRequestCard from './SentRequestCard';
import ContactRequestCard from './ContactRequestCard';



function Inbox() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("received");
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
                    <div className="flex w-full md:pl-10 sm:px-0 px-2 pt-20 pb-10 sm:py-20">
                        <div className="max-w-[1000px] w-full px-4 sm:px-10">
                            {/*  content section */}
                            <div className='flex flex-col justify-center items-center w-full' >
                                {/*  header tab */}
                                <div className="w-full flex  justify-center pt-5">
                                    <div className=" rounded-xl p-1 flex sm:space-x-2 space-x-1  border-2 border-gray-200">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`sm:px-6 px-2 py-2 rounded-lg sm:text-sm text-[13px] font-medium transition-all duration-200
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
                                                    <ReceivedRequestCard item={item} />
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
                                                    <AcceptedRequestCard item={item} />
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
                                                    <SentRequestCard item={item} />
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
                                                   <ContactRequestCard item={<item/>} />
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
