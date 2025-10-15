import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import FindYourIshtam from '../Dashboard/FindYourIshtam';
import DashboardHeader from '../Components/DashboardHeader';
import ChatMessages from '../Components/ChatMessages';
import DashboardNav from '../Components/DashboardNav';
import { FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaQrcode } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";

function Subscription() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);

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
      buttonColor: "bg-[#5A0A1D] text-white",
      highlight: false,
    },
    {
      name: "Advance",
      price: "₹3000",
      duration: "12 Month Duration",
      features: [
        "App Management",
        "Attendance Management",
        "Leave System",
        "Employee Management",
        "Expense Tracking",
        "Chat Support",
      ],
      buttonColor: "bg-white text-[#5A0A1D]",
      highlight: true,
    },
    {
      name: "Premium",
      price: "₹5000",
      duration: "1 Year",
      features: [
        "All Advance Features",
        "Invoice Generate",
        "Purchase Generate",
        "Payroll System",
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
          <div className="fixed inset-0" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-white z-50 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <DashboardNav />
        <div className="flex flex-col justify-center">
          <DashboardHeader />

          <div className="flex w-full md:pl-10 sm:px-0 px-2 py-10 sm:py-20">
            <div className="max-w-[1000px] w-full px-4 sm:px-10">
              {/* Search & Filter - Mobile */}
              <div className="flex px-10 lg:hidden items-center justify-center gap-3 pt-18 pb-8 w-full">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search Profile ID"
                    className="w-full rounded-full border border-[#E4E4E7] pl-12 pr-4 py-2 text-[#787878] placeholder-gray-400 focus:outline-none"
                  />
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="w-10 h-10 border border-[#E4E4E7] rounded-md flex items-center justify-center">
                  <PiSlidersBold className="text-xl text-[#787878]" />
                </div>
              </div>

              {/* Pricing Plans */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-10 px-4">
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className="w-full md:w-72 [perspective:1000px]"
                  >
                    <div
                      className={`relative w-full min-h-[480px] transition-transform duration-700 [transform-style:preserve-3d] ${
                        flippedIndex === index ? "[transform:rotateY(180deg)]" : ""
                      }`}
                    >
                      {/* Front Side */}
                      <div className="absolute w-full h-full bg-white rounded-lg border border-[#5A0A1D] shadow-md [backface-visibility:hidden] flex flex-col">
                        <div className="text-center p-5 border-b border-gray-200">
                          <h2 className="inline-block px-4 py-1 font-semibold text-[#5A0A1D] border-1 border-[#5A0A1D] rounded-[8px]">
                            {plan.name}
                          </h2>
                        </div>
                        <div className="text-center py-4">
                          <h3 className="text-[40px] font-medium text-[#5A0A1D]">
                            {plan.price}
                          </h3>
                          <p className="text-[14px] text-gray-500">{plan.duration}</p>
                        </div>
                        <ul className="px-6 space-y-2 text-[13px] flex-1">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <IoIosCheckmarkCircleOutline className="text-green-500 text-xl flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="p-6">
                          <button
                            onClick={() => setFlippedIndex(index)}
                            className="w-full py-2 rounded-md font-semibold bg-[#5A0A1D] text-white transition-colors hover:bg-[#7a1331] flex items-center justify-center gap-2"
                          >
                            <FaQrcode /> Choose Plan
                          </button>
                        </div>
                      </div>

                      {/* Back Side */}
                      <div className="absolute w-full h-full bg-white rounded-lg border border-[#5A0A1D] shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center p-6">
                        <div className="mb-4 flex flex-col items-center">
                          <FaQrcode className="text-5xl text-[#5A0A1D] mb-2" />
                          <p className="text-[#5A0A1D] font-semibold text-center">
                            Scan to Pay for {plan.name} Plan
                          </p>
                        </div>
                        <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                          <FaQrcode className="text-6xl text-[#5A0A1D]" />
                        </div>
                        <button
                          onClick={() => setFlippedIndex(null)}
                          className="mt-4 px-4 py-2 rounded-md bg-[#5A0A1D] text-white flex items-center gap-2 hover:bg-[#7a1331]"
                        >
                          <IoArrowBack /> Back
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ChatMessages />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;