import React, { useState } from 'react'
import AdminNavbar from '../AdminComponents/AdminNavbar';
import AdminSidebar from '../AdminComponents/AdminSidebar';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FiUploadCloud } from 'react-icons/fi';
import { BsBalloonHeart, BsQrCode } from 'react-icons/bs';
import addStoryImg from '../../assets/addStoryImg.png'
import DoubleHearts from '../../assets/DoubleHearts.png';
import AdminSubscriptionPlanCards from '../AdminComponents/AdminSubscriptionPlanCards';


function SubscriptionManagement() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className="flex h-screen bg-pink-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 overflow-y-auto px-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Subscription Plans
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Monitor, manage, and keep your platform safe.
                        </p>
                        <div className='pt-5'>
                            <form className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 md:p-10 space-y-6">
                                <div className='flex flex-col items-center justify-center gap-2'>
                                    <img src={DoubleHearts} width={33} alt="" />
                                    <h2 className="text-2xl font-bold text-center text-pink-600">
                                        Add New Subscription Plan
                                    </h2>
                                </div>

                                {/* SINGLE ROW - Groom, Bride, Date */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">

                                    {/* Plan Name */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Plan Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter New Plan Name"
                                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
                                        />
                                    </div>

                                    {/* Subscription Price */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Subscription Price
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter the Price for This Plan"
                                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
                                        />
                                    </div>

                                    {/* Plan Duration with increment/decrement */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Plan Duration (Months)
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full  px-2">
                                            <button
                                                type="button"
                                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                                                onClick={() => {
                                                    const input = document.getElementById("planDuration");
                                                    input.stepDown();
                                                }}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                id="planDuration"
                                                placeholder="Enter Duration"
                                                min={1}
                                                className="w-full text-center p-2 focus:ring-2 focus:ring-pink-400 outline-none"
                                            />
                                            <button
                                                type="button"
                                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                                                onClick={() => {
                                                    const input = document.getElementById("planDuration");
                                                    input.stepUp();
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contact Limit with increment/decrement */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Contact Limit
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full  px-2">
                                            <button
                                                type="button"
                                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                                                onClick={() => {
                                                    const input = document.getElementById("contactLimit");
                                                    input.stepDown();
                                                }}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                id="contactLimit"
                                                placeholder="Enter Contact Limit"
                                                min={1}
                                                className="w-full text-center p-2 focus:ring-2 focus:ring-pink-400 outline-none"
                                            />
                                            <button
                                                type="button"
                                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                                                onClick={() => {
                                                    const input = document.getElementById("contactLimit");
                                                    input.stepUp();
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                </div>


                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Enter Plan Features
                                    </label>
                                    <textarea
                                        placeholder="Share your success story..."
                                        rows={5}
                                        className="w-full border text-gray-700 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 resize-none"
                                    />
                                </div>

                                {/* Upload Box */}
                                <div className='flex flex-col items-center justify-center'>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        QR CODE
                                    </label>

                                    <label className="flex flex-col items-center justify-center sm:w-100 w-full h-40 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer bg-gray-50 hover:bg-pink-100 transition relative overflow-hidden">
                                        <BsQrCode className="text-gray-500 text-3xl mb-2" />
                                        <span className="text-sm text-gray-600 text-center p-3">
                                            Click or drag & drop to payment QR code
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className='flex items-center justify-center pt-5'>
                                    <button
                                        type="button"
                                        className="px-5 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition"
                                    >
                                        Confirm and Add Plan
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className='py-20' >
                            <h2 className="text-2xl font-semibold text-gray-800 ">
                                Active Plans
                            </h2>
                            <p className="text-gray-500">
                                All active plans currently available on Ishttam Marry
                            </p>
                            <div className="flex flex-col sm:items-start items-center w-full">
                                <div className="flex flex-col md:flex-row sm:items-start gap-6">
                                    {plans.map((plan, index) => (
                                        <AdminSubscriptionPlanCards key={index} plan={plan} />
                                    ))}
                                </div>
                            </div>

                        </div>

                    </main>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionManagement
