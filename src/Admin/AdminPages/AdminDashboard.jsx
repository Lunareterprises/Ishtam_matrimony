import React, { useState } from "react";
import AdminNavbar from "../AdminComponents/AdminNavbar";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import { FaCreditCard, FaEye, FaUser } from "react-icons/fa";
import AssignPlanModal from "../AdminComponents/AssignPlanModal";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeStatus, setActiveStatus] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const toggleStatus = (id) => {
        setActiveStatus((prev) => ({
            ...prev,
            [id]: !prev[id], // toggle between true (Active) and false (Inactive)
        }));
    };

    const stats = [
        {
            title: "Active users",
            value: "456K",
            change: "+3%",
            color: "text-green-600",
            desc: "Total registered users",
        },
        {
            title: "Recent Enquiries",
            value: "124K",
            change: "-2%",
            color: "text-red-600",
            desc: "Active subscriptions",
        },
        {
            title: "New Registrations",
            value: "320",
            change: "+12%",
            color: "text-green-600",
            desc: "Joined today",
        },
        {
            title: "New Storie to manage",
            value: "120",
            change: "+8%",
            color: "text-green-600",
            desc: "Profiles reported this week",
        },
    ];

    const pendingProfiles = [
        {
            id: "#12567",
            name: "Aarav K.",
            age: 29,
            gender: "Male",
            location: "Bangalore",
            date: "26 Aug 25",
        },
        {
            id: "#12568",
            name: "Aarav K.",
            age: 29,
            gender: "Male",
            location: "Bangalore",
            date: "26 Aug 25",
        },
        {
            id: "#12569",
            name: "Aarav K.",
            age: 29,
            gender: "Male",
            location: "Bangalore",
            date: "26 Aug 25",
        },
    ];

    const navigate = useNavigate()
    const userProfileView = () => {
        navigate("/user-profileView")
    }

    return (
        <div className="flex h-screen bg-pink-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 overflow-y-auto px-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Dashboard
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Monitor, manage, and keep your platform safe.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
                            {stats.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-gray-600 font-medium flex items-center gap-1">
                                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                            {item.title}
                                        </h3>
                                        <span className={`text-sm font-semibold ${item.color}`}>
                                            {item.change}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">
                                        {item.value}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    User Management
                                </h2>
                                <button className="text-sm font-medium text-gray-600 border border-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-100 transition whitespace-nowrap">
                                    View all
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-gray-800 text-white text-sm">
                                            <th className="p-3 rounded-l-lg whitespace-nowrap">Profile ID</th>
                                            <th className="p-3 whitespace-nowrap">Name</th>
                                            <th className="p-3 whitespace-nowrap">Profile picture</th>
                                            <th className="p-3 whitespace-nowrap">Age</th>
                                            <th className="p-3 whitespace-nowrap">Gender</th>
                                            <th className="p-3 whitespace-nowrap">Location</th>
                                            <th className="p-3 whitespace-nowrap">Date Joined</th>
                                            <th className="p-3 rounded-r-lg whitespace-nowrap">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingProfiles.map((profile, i) => (
                                            <tr
                                                key={i}
                                                className="border-b last:border-b-0 hover:bg-pink-50 transition-colors"
                                            >
                                                <td className="p-3 text-gray-700 whitespace-nowrap">{profile.id}</td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">{profile.name}</td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">
                                                    <div className="sm:w-20 sm:h-20 h-15 w-15 flex items-center justify-center bg-gray-300 rounded-xl text-white text-2xl">
                                                        <FaUser />
                                                    </div>
                                                </td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">{profile.age}</td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">{profile.gender}</td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">{profile.location}</td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">{profile.date}</td>
                                                <td className="p-3 whitespace-nowrap">
                                                    <div className="flex items-center  gap-4 flex-nowrap">
                                                        {/* Toggle */}
                                                        <div className="flex flex-col items-center gap-1 shrink-0">
                                                            <span
                                                                className={`text-sm font-medium ${activeStatus[profile.id] ? "text-green-600" : "text-gray-600"
                                                                    }`}
                                                            >
                                                                {activeStatus[profile.id] ? "Active" : "Inactive"}
                                                            </span>

                                                            <button
                                                                onClick={() => toggleStatus(profile.id)}
                                                                className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors ${activeStatus[profile.id] ? "bg-green-500" : "bg-gray-400"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${activeStatus[profile.id]
                                                                        ? "translate-x-7"
                                                                        : "translate-x-0"
                                                                        }`}
                                                                ></span>
                                                            </button>
                                                        </div>

                                                        {/* View Button */}
                                                        <button onClick={userProfileView} className="bg-gray-400 hover:bg-gray-500 font-sm py-[11px] px-4 rounded-full text-white whitespace-nowrap shrink-0 transition-colors duration-300 ">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <FaEye />
                                                                <span className="text-[14px]">View</span>
                                                            </div>
                                                        </button>

                                                        {/* Activate Button */}
                                                        <button onClick={() => {
                                                            setSelectedUser(profile); // pass clicked user
                                                            setIsModalOpen(true); // open modal
                                                        }} className=" bg-[#E33183] hover:bg-pink-700 font-sm py-[11px] px-4 rounded-full text-white whitespace-nowrap shrink-0 transition-colors duration-300">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <FaCreditCard />
                                                                <span className="text-[14px]">Activate Plan</span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-17">
                            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Inactive User
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">
                                        View all inactive profiles
                                    </p>
                                </div>
                                <button className="border border-gray-300 px-4 py-1.5 rounded-full text-sm text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                                    View all
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Report ID
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">
                                        View all reported users
                                    </p>
                                </div>
                                <button className="border border-gray-300 px-4 py-1.5 rounded-full text-sm text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                                    View all
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <AssignPlanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                user={selectedUser}
            />
        </div>
    );
}

export default AdminDashboard;