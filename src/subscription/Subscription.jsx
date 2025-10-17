import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import DashboardHeader from "../Components/DashboardHeader";
import ChatMessages from "../Components/ChatMessages";
import DashboardNav from "../Components/DashboardNav";
import { FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import SubscriptionPlanCards from "./SubscriptionPlanCards";

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
    },
  ];

  return (
    <div className="flex">
      <div className="hidden lg:block w-64">
        <Sidebar />
      </div>

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
            <div className="max-w-[1200px] w-full px-4 sm:px-10">
              {/* Pricing Plans */}
              <div className="grid gap-6 py-20 sm:py-10 px-4 
                grid-cols-1 
                md:grid-cols-2 
                xl:grid-cols-3 
                sm:justify-items-start justify-items-center ">
                {plans.map((plan, index) => (
                  <SubscriptionPlanCards
                    key={index}
                    plan={plan}
                    flipped={flippedIndex === index}
                    onFlip={() => setFlippedIndex(index)}
                    onBack={() => setFlippedIndex(null)}
                  />
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
