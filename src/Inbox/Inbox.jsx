import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import DashboardHeader from "../Components/DashboardHeader";
import ChatMessages from "../Components/ChatMessages";
import DashboardNav from "../Components/DashboardNav";
import {
    listContactHistoryApi,
    listInterestApi,
} from "../Services/allApi";
import ReceivedRequestCard from "./ReceivedRequestCard";
import AcceptedRequestCard from "./AcceptedRequestCard";
import SentRequestCard from "./SentRequestCard";
import ContactRequestCard from "./ContactRequestCard";

function Inbox() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("received");
    const [interestList, setInterestList] = useState([]);
    const [selectedOption, setSelectedOption] = useState("me"); // For accepted tab
    const [contactOption, setContactOption] = useState("me"); // For contacts tab
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const tabs = [
        { key: "received", label: "Received" },
        { key: "accepted", label: "Accepted" },
        { key: "sent", label: "Sent" },
        { key: "contacts", label: "Contacts" },
    ];

    // Fetch API based on active tab
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError("");
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            try {
                if (activeTab === "contacts") {
                    // Send "me" or "else" in type key
                    const reqBody = { type: contactOption === "me" ? "me" : "else" };
                    const result = await listContactHistoryApi(reqHeader, reqBody);
                    setInterestList(result.data.data || []);
                } else {
                    const reqBody = { status: activeTab };
                    const result = await listInterestApi(reqHeader, reqBody);
                    setInterestList(result.data.data || []);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab, contactOption]); // contactOption dependency for contacts tab

    // Filter accepted tab by "me" or "her"
    const filterAcceptedProfile = (list, option) => {
        const userId = sessionStorage.getItem("user_id");
        return list.filter((item) => {
            if (option === "me") return Number(userId) === Number(item.i_receiver_id);
            if (option === "her") return Number(userId) === Number(item.i_sender_id);
            return true;
        });
    };

    const filteredList =
        activeTab === "accepted"
            ? filterAcceptedProfile(interestList, selectedOption)
            : interestList;

    return (
        <div className="flex">
            {/* Sidebar - desktop */}
            <div className="hidden lg:block w-64">
                <Sidebar />
            </div>

            {/* Sidebar - mobile drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex">
                    <div className="fixed inset-0" onClick={() => setSidebarOpen(false)} />
                    <div className="relative bg-white z-50 h-full">
                        <Sidebar />
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                <DashboardNav />
                <div className="flex flex-col justify-center">
                    <DashboardHeader />
                    <div className="flex w-full md:pl-10 sm:px-0 px-2 pt-20 pb-10 sm:py-20">
                        <div className="max-w-[1000px] w-full px-4 sm:px-10">
                            <div className="flex flex-col justify-center items-center w-full">
                                {/* Tabs */}
                                <div className="w-full flex justify-center pt-5">
                                    <div className="rounded-xl p-1 flex sm:space-x-2 space-x-1 border-2 border-gray-200">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key)}
                                                className={`sm:px-6 px-2 py-2 rounded-lg sm:text-sm text-[13px] font-medium transition-all duration-200 ${
                                                    activeTab === tab.key
                                                        ? "bg-pink-600 text-white shadow"
                                                        : "bg-white text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Loading / Error */}
                                {loading && <p className="text-center text-gray-500 my-6">Loading...</p>}
                                {error && <p className="text-center text-red-500 my-6">{error}</p>}

                                {/* Tab content */}
                                {!loading && !error && (
                                    <>
                                        {/* Received */}
                                        {activeTab === "received" && (
                                            <div className="flex flex-col items-center justify-center my-6 space-y-6">
                                                {interestList.length > 0 ? (
                                                    interestList.map((item, index) => (
                                                        <div key={index} className="w-full">
                                                            <ReceivedRequestCard item={item} />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-center text-gray-500">
                                                        No received interests found
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Accepted */}
                                        {activeTab === "accepted" && (
                                            <div className="flex flex-col items-center justify-center w-full">
                                                {/* Radio Buttons */}
                                                <div className="flex justify-center mt-6 sm:space-x-10 space-x-6">
                                                    <label className="flex items-center space-x-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="acceptedBy"
                                                            value="me"
                                                            checked={selectedOption === "me"}
                                                            onChange={() => setSelectedOption("me")}
                                                            className="sm:w-5 sm:h-5 h-4 w-4 accent-[#540D33] cursor-pointer transition-all duration-200"
                                                        />
                                                        <span
                                                            className={`sm:text-sm text-[13px] font-medium ${
                                                                selectedOption === "me"
                                                                    ? "text-[#540D33]"
                                                                    : "text-gray-700"
                                                            }`}
                                                        >
                                                            Accepted by Me
                                                        </span>
                                                    </label>

                                                    <label className="flex items-center space-x-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="acceptedBy"
                                                            value="her"
                                                            checked={selectedOption === "her"}
                                                            onChange={() => setSelectedOption("her")}
                                                            className="sm:w-5 sm:h-5 h-4 w-4 accent-[#540D33] cursor-pointer transition-all duration-200"
                                                        />
                                                        <span
                                                            className={`sm:text-sm text-[13px] font-medium ${
                                                                selectedOption === "her"
                                                                    ? "text-[#540D33]"
                                                                    : "text-gray-700"
                                                            }`}
                                                        >
                                                            Accepted by Her
                                                        </span>
                                                    </label>
                                                </div>

                                                <div className="flex flex-col items-center justify-center my-6 space-y-6">
                                                    {filteredList.length > 0 ? (
                                                        filteredList.map((item, index) => (
                                                            <div key={index} className="w-full">
                                                                <AcceptedRequestCard item={item} />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-center text-gray-500">
                                                            No {selectedOption === "me"
                                                                ? "accepted by me"
                                                                : "accepted by her"}{" "}
                                                            interests found
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Sent */}
                                        {activeTab === "sent" && (
                                            <div className="flex flex-col items-center justify-center my-6 space-y-6">
                                                {interestList.length > 0 ? (
                                                    interestList.map((item, index) => (
                                                        <div key={index} className="w-full">
                                                            <SentRequestCard item={item} />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-center text-gray-500">No sent interests found</p>
                                                )}
                                            </div>
                                        )}

                                        {/* Contacts */}
                                        {activeTab === "contacts" && (
                                            <div className="flex flex-col items-center justify-center w-full">
                                                {/* Radio Buttons */}
                                                <div className="flex justify-center mt-6 sm:space-x-10 space-x-6">
                                                    <label className="flex items-center space-x-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="contactedBy"
                                                            value="me"
                                                            checked={contactOption === "me"}
                                                            onChange={() => setContactOption("me")}
                                                            className="sm:w-5 sm:h-5 h-4 w-4 accent-[#540D33] cursor-pointer transition-all duration-200"
                                                        />
                                                        <span className="sm:text-sm text-[13px] font-medium text-gray-700">
                                                            Contacted by Me
                                                        </span>
                                                    </label>

                                                    <label className="flex items-center space-x-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="contactedBy"
                                                            value="else"
                                                            checked={contactOption !== "me"}
                                                            onChange={() => setContactOption("else")}
                                                            className="sm:w-5 sm:h-5 h-4 w-4 accent-[#540D33] cursor-pointer transition-all duration-200"
                                                        />
                                                        <span className="sm:text-sm text-[13px] font-medium text-gray-700">
                                                            Contacted by Her
                                                        </span>
                                                    </label>
                                                </div>

                                                <div className="flex flex-col items-center justify-center my-6 space-y-6">
                                                    {interestList.length > 0 ? (
                                                        interestList.map((item, index) => (
                                                            <div key={index} className="w-full">
                                                                <ContactRequestCard item={item} />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-center text-gray-500">No contacts found</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <ChatMessages />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inbox;
