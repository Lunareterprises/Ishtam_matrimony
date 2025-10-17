import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { GiChickenOven, GiFruitBowl } from "react-icons/gi";
import { IoLanguage, IoLocation } from "react-icons/io5";
import { FaStarOfDavid, FaGraduationCap } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { RiCoinsFill } from "react-icons/ri";
import AdminSidebar from '../AdminComponents/AdminSidebar';
import AdminNavbar from '../AdminComponents/AdminNavbar';
import { getUserProfileDataApi } from '../../Services/allApi';
import { useLocation, useParams } from 'react-router-dom';

function UserProfileView() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [profileData, setProfileData] = useState([])
    const location = useLocation();
    const userId = location.state?.userId;

    const userProfileView = async (userId) => {
        console.log("User id:::::", userId);
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const reqBody = {
                user_id: userId
            }
            const result = await getUserProfileDataApi(reqHeader, reqBody)
            console.log("profile for userProfileView :::", result);
            setProfileData(result?.data?.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (userId) {
            console.log("User id in useEffect:", userId);
            userProfileView(userId);
        }
    }, [userId]);



    // Static partner profile data
    const partnerProfileData = [
        {
            u_profile_pic: null,
            active_plan: { s_plan_name: "Premium" },
            u_firstname: "John",
            u_lastname: "Doe",
            u_id: 1234,
            age: 29,
            u_dob: "1996-05-15",
            u_marital_status: "Single",
            u_height: 175,
            u_qualification: "B.Tech",
            u_annual_income: "12",
            u_mother_tongue: "English",
            u_religion: "Christian",
            u_community: "Catholic",
            u_district: "Los Angeles",
            u_state: "California",
            u_city: "Los Angeles",
            u_profile_for: "Self",
            u_about: "I am a software developer who loves coding and hiking.",
            u_hobbies: "Reading,Traveling,Cooking",
            u_diet: "Non Veg",
            u_profession_area: "Software Development",
            u_working_as: "Developer",
            u_country: "USA",
            partnerPreference: true
        }
    ];



    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB");
    };

    const calculateAge = (dobString) => {
        if (!dobString) return "N/A"; // handle null/undefined
        const dob = new Date(dobString);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--; // subtract 1 if birthday hasn't occurred yet this year
        }
        return age;
    };

    return (
        <div className="flex h-screen bg-pink-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 overflow-y-auto px-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            User Profile
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Customize landing page banners to keep your site fresh.
                        </p>

                        {profileData ? (
                            <div className='pb-20 sm:pt-10 pt-5'>
                                <div className='flex justify-center'>
                                    <div className='max-w-[750px] w-full px-10'>
                                        <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-lg overflow-hidden gap-2">
                                            {profileData.u_profile_pic ? (
                                                <img
                                                    src={`https://lunarsenterprises.com:6050${profileData.u_profile_pic}`}
                                                    alt="Profile"
                                                    className="sm:w-1/3 w-full object-cover"
                                                />
                                            ) : (
                                                <div className="relative sm:w-1/3 w-full h-60 bg-[#D9D9D9] flex items-center justify-center">
                                                    <FaRegUser className="text-[#797979] text-[35px]" />
                                                    <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[11px] font-semibold px-3 py-2 rounded-tl-md rounded-br-md z-10">
                                                        {profileData.active_plan?.s_plan_name || "Free Plan"}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex flex-col justify-center gap-2 sm:px-2 px-4 py-8 text-center sm:text-left">
                                                <h1 className="text-lg font-semibold">
                                                    {profileData.u_firstname} {profileData.u_lastname} | ID: ITM{profileData.u_id}
                                                </h1>
                                                <p className="text-sm text-gray-700">
                                                    {calculateAge(profileData.u_dob)} yrs | {formatDate(profileData.u_dob)} | {profileData.u_marital_status || "N/A"} | {profileData.u_height || "N/A"} cm
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    {profileData.u_working_as || "N/A"} | {profileData.u_qualification || "N/A"} | {(profileData.u_annual_income / 100000).toFixed(2)} LPA
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    {profileData.u_mother_tongue || "N/A"} | {profileData.u_religion || "N/A"}, {profileData.u_community || "N/A"} | {profileData.u_district || "N/A"}, {profileData.u_state || "N/A"}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    Profile Managed by {profileData.u_profile_for || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2 px-10 pt-10'>
                                    <h1 className='text-[17px] font-semibold text-[#1F1F1F]'>About {profileData.u_firstname} {profileData.u_lastname}</h1>
                                    <p className='text-[#1F1F1F] text-[14px]'>{profileData.u_about || "N/A"}</p>
                                </div>

                                <div className='flex flex-col gap-3 px-10 pt-8 sm:items-start items-center'>
                                    <h1 className='text-[17px] font-semibold text-[#1F1F1F]'>Hobbies & Interests</h1>
                                    <div className="flex flex-wrap gap-5 justify-center">
                                        {profileData.u_hobbies ? profileData.u_hobbies.split(",").map((hobby, index) => (
                                            <span
                                                key={index}
                                                className="px-5 py-2 flex items-center text-sm font-medium text-[#E33183] border border-[#E33183] rounded-full bg-pink-50"
                                            >
                                                {hobby.trim()}
                                            </span>
                                        )) : "N/A"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 px-6 xl:px-12 pt-12 w-full mx-auto">

                                    {/* Lifestyle Card */}
                                    <div className="group bg-white/70 backdrop-blur-lg border border-pink-200/40 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
                                        <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8">
                                            Lifestyle
                                        </h2>
                                        <div className="flex flex-col items-center gap-5">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                                                <div className="relative text-pink-600 border border-pink-400 rounded-full w-20 h-20 bg-gradient-to-br from-white to-pink-50 flex items-center justify-center text-5xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                                                    {profileData.u_diet === "Non Veg" ? <GiChickenOven /> : <GiFruitBowl />}
                                                </div>
                                            </div>
                                            <p className="text-base font-semibold text-gray-800 tracking-wide">
                                                {profileData.u_diet === "Non Veg" ? "Non-Vegetarian" : "Vegetarian"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Background Card */}
                                    <div className="group bg-white/70 backdrop-blur-lg border border-gray-200/40 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
                                        <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8">
                                            Background
                                        </h2>
                                        <div className="flex flex-col gap-5">
                                            <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                <IoLanguage className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-gray-800 leading-relaxed">
                                                    {profileData.u_mother_tongue || "N/A"}
                                                </p>
                                            </div>
                                            <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                <FaStarOfDavid className="text-xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-gray-800 leading-relaxed">
                                                    {profileData.u_religion || "N/A"}, {profileData.u_community || "N/A"}
                                                </p>
                                            </div>
                                            <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                <IoLocation className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-gray-800 leading-relaxed">
                                                    {profileData.u_city || "N/A"}, {profileData.u_district || "N/A"}, {profileData.u_state || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Education & Career Card */}
                                    <div className="group bg-white/70 backdrop-blur-lg border border-gray-200/40 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
                                        <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8">
                                            Education & Career
                                        </h2>
                                        <div className="flex flex-col gap-5">
                                            <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                <FaGraduationCap className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-gray-800 leading-relaxed">
                                                    {profileData.u_qualification || "N/A"}
                                                </p>
                                            </div>
                                            <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                <MdOutlineWork className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-gray-800 leading-relaxed">
                                                    {profileData.u_profession_area || "N/A"}
                                                </p>
                                            </div>
                                            <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                <RiCoinsFill className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                <p className="text-sm text-gray-800 leading-relaxed">
                                                    {(profileData.u_annual_income / 100000).toFixed(2)} LPA
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        ) : (
                            <p className="text-center text-gray-500 mt-10">Loading profile...</p>
                        )}


                        {/*  {profileData && profileData.length > 0 ? (
                            
                                <div key={index} className='pb-20 sm:pt-10 pt-5' >
                                    <div className='flex justify-center'>
                                        <div className='max-w-[750px] w-full px-10'>
                                            <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-lg overflow-hidden gap-2">


                                                {item.u_profile_pic ? (
                                                    <img
                                                        src={item.u_profile_pic}
                                                        alt="Profile"
                                                        className="sm:w-1/3 w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="relative sm:w-1/3 w-full h-60 bg-[#D9D9D9] flex items-center justify-center">
                                                        <FaRegUser className="text-[#797979] text-[35px]" />
                                                        <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[11px] font-semibold px-3 py-2 rounded-tl-md rounded-br-md z-10">
                                                            {item.active_plan.s_plan_name}
                                                        </div>
                                                    </div>
                                                )}


                                                <div className="flex flex-col justify-center gap-2 sm:px-2 px-4 py-8 text-center sm:text-left">
                                                    <h1 className="text-lg font-semibold">
                                                        {item.u_firstname} {item.u_lastname} | ID: ITM{item.u_id}
                                                    </h1>
                                                    <p className="text-sm text-gray-700">
                                                        {item.age} yrs | {formatDate(item.u_dob)} | {item.u_marital_status} | {item.u_height}cm
                                                    </p>
                                                    <p className="text-sm text-gray-700">
                                                        {item.u_working_as} | {item.u_qualification} | {item.u_annual_income} LPA
                                                    </p>
                                                    <p className="text-sm text-gray-700">
                                                        {item.u_mother_tongue} | {item.u_religion}, {item.u_community} | {item.u_district}, {item.u_state}
                                                    </p>
                                                    <p className="text-sm text-gray-700">
                                                        Profile Managed by {item.u_profile_for}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='flex flex-col gap-2 px-10 pt-10'>
                                        <h1 className='text-[17px] font-semibold text-[#1F1F1F]'>About {item.u_firstname} {item.u_lastname}</h1>
                                        <p className='text-[#1F1F1F] text-[14px]'>{item.u_about}</p>
                                    </div>


                                    <div className='flex flex-col gap-3 px-10 pt-8 sm:items-start items-center'>
                                        <h1 className='text-[17px] font-semibold text-[#1F1F1F]'>Hobbies & Interests</h1>
                                        <div className="flex flex-wrap gap-5 justify-center">
                                            {item.u_hobbies.split(",").map((hobby, index) => (
                                                <span
                                                    key={index}
                                                    className="px-5 py-2 flex items-center text-sm font-medium text-[#E33183] border border-[#E33183] rounded-full bg-pink-50"
                                                >
                                                    {hobby.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 pt-12 max-w-7xl mx-auto">

                                        <div className="group bg-white/70 backdrop-blur-lg border border-pink-200/40 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
                                            <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8">
                                                Lifestyle
                                            </h2>
                                            <div className="flex flex-col items-center gap-5">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                                                    <div className="relative text-pink-600 border border-pink-400 rounded-full w-20 h-20 bg-gradient-to-br from-white to-pink-50 flex items-center justify-center text-5xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                                                        {item.u_diet === "Non Veg" ? <GiChickenOven /> : <GiFruitBowl />}
                                                    </div>
                                                </div>
                                                <p className="text-base font-semibold text-gray-800 tracking-wide">
                                                    {item.u_diet === "Non Veg" ? "Non-Vegetarian" : "Vegetarian"}
                                                </p>
                                            </div>
                                        </div>


                                        <div className="group bg-white/70 backdrop-blur-lg border border-gray-200/40 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
                                            <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8">
                                                Background
                                            </h2>
                                            <div className="flex flex-col gap-5">
                                                <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                    <IoLanguage className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-gray-800 leading-relaxed">
                                                        {item.u_mother_tongue}
                                                    </p>
                                                </div>
                                                <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                    <FaStarOfDavid className="text-xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-gray-800 leading-relaxed">
                                                        {item.u_religion}, {item.u_community}
                                                    </p>
                                                </div>
                                                <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                    <IoLocation className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-gray-800 leading-relaxed">
                                                        {item.u_city}, {item.u_district}, {item.u_state}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="group bg-white/70 backdrop-blur-lg border border-gray-200/40 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
                                            <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8">
                                                Education & Career
                                            </h2>
                                            <div className="flex flex-col gap-5">
                                                <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                    <FaGraduationCap className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-gray-800 leading-relaxed">
                                                        {item.u_qualification}
                                                    </p>
                                                </div>
                                                <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                    <MdOutlineWork className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-gray-800 leading-relaxed">
                                                        {item.u_profession_area}
                                                    </p>
                                                </div>
                                                <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                    <RiCoinsFill className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-gray-800 leading-relaxed">
                                                        {item.u_annual_income} LPA
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 mt-10">Loading profile...</p>
                        )} */}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default UserProfileView
