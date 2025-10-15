import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminComponents/AdminNavbar";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import { FaCreditCard, FaEye, FaUser } from "react-icons/fa";
import AssignPlanModal from "../AdminComponents/AssignPlanModal";
import { useNavigate } from "react-router-dom";
import { getDashboardDataApi, listAllUsersApi, updateUserStatusApi } from "../../Services/allApi";
import Swal from "sweetalert2";

function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeStatus, setActiveStatus] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [dashboardData, setDashbordData] = useState([])


    const getAllUsersList = async () => {
        const token = sessionStorage.getItem("token");
        try {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const result = await listAllUsersApi(reqHeader);
            console.log(result);
            // Filter users with u_role = "user"
            const usersOnly = result?.data?.data?.filter(user => user.u_role === "user");

            setUserData(usersOnly);
        } catch (error) {
            console.log(error);
        }
    }


    const updateUserStatus = async (u_id) => {
        const token = sessionStorage.getItem("token");
        try {
            console.log(u_id);
            const payload = { user_id: u_id };
            const reqHeader = { Authorization: `Bearer ${token}` };
            const result = await updateUserStatusApi(reqHeader, payload);
            console.log(result);
            // Update local state to reflect the toggle
            setActiveStatus(prev => ({
                ...prev,
                [u_id]: !prev[u_id]
            }));
            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'User Status Updated!',
                    text: 'The user’s status has been updated successfully.',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
                getAllUsersList()
            } else {
                Swal.fire({
                    title: 'User Status Updation Failed',
                    text: result?.data?.message || 'Unable to update user status. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }


        } catch (error) {
            Swal.fire({
                title: 'Something went wrong',
                text: 'Unable to update user status. Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    }


    const getDashboardData = async () => {
        try {
            console.log("inside dashbord daaa");
            const token = sessionStorage.getItem("token");
            const reqHeader = { Authorization: `Bearer ${token}` };
            const result = await getDashboardDataApi(reqHeader);
            console.log(result);
            setDashbordData(result.data.data)
        }
        catch (error) {
            console.log(error);
        }
    }


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


    useEffect(() => {
        getAllUsersList();
        getDashboardData();
    }, [])


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
            title: "New Stories to manage",
            value: "120",
            change: "+8%",
            color: "text-green-600",
            desc: "Profiles reported this week",
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

                            <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-600 font-medium flex items-center gap-1">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Active users
                                    </h3>
                                    <span
                                        className={`text-sm font-semibold ${parseFloat(dashboardData?.userCount?.growthPercent) > 0
                                            ? "text-green-500"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        +{dashboardData?.userCount?.growthPercent || "0.00"}%
                                    </span>
                                </div>

                                <h2 className="text-3xl pl-3 font-bold text-gray-900">
                                    {dashboardData?.userCount?.total || 0}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Total registered users
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-600 font-medium flex items-center gap-1">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Recent Enquiries
                                    </h3>
                                    <span
                                        className={`text-sm font-semibold ${parseFloat(dashboardData?.enquiryCount?.growthPercent) > 0
                                            ? "text-green-500"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        +{dashboardData?.enquiryCount?.growthPercent || "0.00"}%
                                    </span>
                                </div>

                                <h2 className="text-3xl pl-3 font-bold text-gray-900">
                                    {dashboardData?.enquiryCount?.total || 0}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Enquiries from the last 7 days
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-600 font-medium flex items-center gap-1">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        New Registrations
                                    </h3>
                                    <span
                                        className={`text-sm font-semibold ${parseFloat(dashboardData?.userCount?.growthPercent) > 0
                                            ? "text-green-500"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        +{dashboardData?.userCount?.growthPercent || "0.00"}%
                                    </span>
                                </div>

                                <h2 className="text-3xl pl-3 font-bold text-gray-900">
                                    {dashboardData?.userCount?.last7Days || 0}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Joined in last 7 days
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-600 font-medium flex items-center gap-1">
                                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                        Success Stories
                                    </h3>
                                    <span
                                        className={`text-sm font-semibold ${parseFloat(dashboardData?.storyCount?.growthPercent) > 0
                                            ? "text-green-500"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        +{dashboardData?.storyCount?.growthPercent || "0.00"}%
                                    </span>
                                </div>

                                <h2 className="text-3xl pl-3 font-bold text-gray-900">
                                    {dashboardData?.storyCount?.total || 0}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Total stories to manage
                                </p>
                            </div>
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
                                    <tbody className="text-[14px]" >
                                        {userData.slice(0, 5).map((profile, i) => (
                                            <tr
                                                key={i}
                                                className="border-b last:border-b-0 hover:bg-pink-50 transition-colors"
                                            >
                                                <td className="p-3 text-gray-700 whitespace-nowrap">ITM{profile.u_id}</td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">{profile.u_firstname} {profile.u_lastname}</td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">
                                                    {profile.u_profile_pic ? (
                                                        <img
                                                            className="sm:w-20 sm:h-20 w-15 h-15 object-cover rounded-xl"
                                                            src={`https://lunarsenterprises.com:6050${profile.u_profile_pic}`}
                                                            alt="Profile"
                                                        />
                                                    ) : (
                                                        <div className="sm:w-20 sm:h-20 w-15 h-15 flex items-center justify-center bg-gray-300 rounded-xl text-white text-2xl">
                                                            <FaUser />
                                                        </div>
                                                    )}

                                                </td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">{calculateAge(profile.u_dob)}</td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">{profile.u_gender}</td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">{profile.u_district ? profile.u_district : "Not specified"}</td>
                                                <td className="p-3 text-gray-700 whitespace-nowrap">
                                                    {new Date(profile.u_created_at).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short", // use "long" for full month name
                                                        year: "numeric"
                                                    })}
                                                </td>

                                                <td className="p-3 whitespace-nowrap">
                                                    <div className="flex items-center  gap-4 flex-nowrap">
                                                        {/* Toggle */}
                                                        <div className="flex flex-col items-center gap-1 shrink-0">
                                                            <span
                                                                className={`text-sm font-medium ${profile.u_status === "active" ? "text-green-600" : "text-gray-600"}`}
                                                            >
                                                                {profile.u_status === "active" ? "Active" : "Inactive"}
                                                            </span>


                                                            <button
                                                                onClick={() => updateUserStatus(profile.u_id)}
                                                                className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors ${profile.u_status === "active" ? "bg-green-500" : "bg-gray-400"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${profile.u_status === "active" ? "translate-x-7" : "translate-x-0"
                                                                        }`}
                                                                ></span>
                                                            </button>

                                                        </div>

                                                        {/* View Button */}
                                                        <button onClick={userProfileView} className="bg-gray-400 hover:bg-gray-500 font-sm py-[9px] px-4 rounded-lg text-white whitespace-nowrap shrink-0 transition-colors duration-300 ">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <FaEye />
                                                                <span className="text-[14px]">View</span>
                                                            </div>
                                                        </button>

                                                        {/* Activate Button */}
                                                        <button onClick={() => {
                                                            setSelectedUser(profile.u_id); // pass clicked user
                                                            setIsModalOpen(true); // open modal
                                                        }} className=" bg-[#E33183] hover:bg-pink-700 font-sm py-[9px] px-4 rounded-lg text-white whitespace-nowrap shrink-0 transition-colors duration-300">
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
                userId={selectedUser}
            />
        </div>
    );
}

export default AdminDashboard;