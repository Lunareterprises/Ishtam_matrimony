import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { FaPen } from "react-icons/fa";
import DashboardHeader from '../Components/DashboardHeader';
import DashboardNav from '../Components/DashboardNav';
import { FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import ChatMessages from '../Components/ChatMessages';
import { useRef } from "react";
import { fetchPartnerPreferenceApi, fetchProfileDataApi, getCurrentPlanApi, updatePartnerPreferenceApi, updateProfileApi } from '../Services/allApi';
import ProfileSection from './ProfileSection';
import PartnerPreferenceSection from './PartnerPreferenceSection';

function MyProfile() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const [preview, setPreview] = useState(null)
    const [currentPlanData, setCurrentPlanData] = useState({})


    //function for fetching partner prefernce data
    const fetchPartnerPrefernce = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const result = await fetchPartnerPreferenceApi(reqHeader);
            if (result?.status === 200 && result.data) {
                console.log("Fetched Partner Preference Data ::", result.data);
                // ✅ Update state with API response
                setPartnerPreferenceData({
                    age: result.data.data.pp_age || "",
                    height: result.data.data.pp_height || "",
                    marital_status: result.data.data.pp_marital_status || "",
                    religion: result.data.data.pp_religion || "",
                    community: result.data.pp_community || "",
                    mother_tongue: result.data.pp_mother_tongue || "",
                    country: result.data.pp_country || "",
                    state: result.data.pp_state || "",
                    city: result.data.pp_city || "",
                    district: result.data.pp_district || "",
                    qualification: result.data.pp_qualification || "",
                    working_with: result.data.pp_working_with || "",
                    profession_area: result.data.pp_profession_area || "",
                    working_as: result.data.pp_working_as || "",
                    annual_income: result.data.pp_annual_income || "",
                    profile_managed_by: result.data.pp_profile_managed_by || "",
                    diet: result.data.pp_diet || "",
                });
                console.log("partner preference data ::", partnerPreferenceData);

            } else {
                console.warn("No partner preference data found.");
            }
        } catch (error) {
            console.error("Error fetching partner preference data:", error);
        }
    };


    const getCurrentPlan = async () => {
        try {
            console.log("inside get current plan");
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const result = await getCurrentPlanApi(reqHeader)
            console.log("consoling result ::", result.data.data);
            setCurrentPlanData(result.data);
            if (result.data.result === false) {
                console.log("ni mandan aada");
            }
            else {
                console.log("pottta");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCurrentPlan()
    }, [])


    //function for fetching profile data
    const fetchProfileData = async () => {
        try {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const result = await fetchProfileDataApi(reqHeader);
            console.log("result for fetching profile Data:", result);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPartnerPrefernce()
        fetchProfileData()
    }, [])


    const [profileData, setProfileData] = useState({
        created_by: "",
        gender: "",
        firstname: "",
        lastname: "",
        dob: "",
        religion: "",
        community: "",
        father: "",
        mother: "",
        no_of_sisters: "",
        no_of_brothers: "",
        financial_status: "",
        diet: "",
        hobbies: [],
        about: "",
        mother_tongue: "",
        height: "",
        marital_status: "",
        district: "",
        profession_area: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        qualification: "",
        college: "",
        working_with: "",
        working_as: "",
        employer_name: "",
        annual_income: "",
        is_private: "",
        file: "",
    })

    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            setProfileData({ ...profileData, file: file })
        }
    };


    //function for updating profile 
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        console.log("handle update profile function::");

        try {
            const token = sessionStorage.getItem('token')
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            const reqBody = new FormData();
            // Loop through profileData instead of writing manually
            for (let key in profileData) {
                if (profileData[key]) {
                    reqBody.append(key, profileData[key]);
                }
            }
            // Debugging: log FormData contents
            for (let [key, value] of reqBody.entries()) {
                console.log(`${key}:`, value);
            }

            const result = await updateProfileApi(reqBody, reqHeader);
            setIsEditing(false);
            if (result?.data?.result === true) {
                alert("Profile updated successfully");
                console.log(result);
            } else {
                console.log(result);
                alert(result?.data?.message || "Update failed");
            }
        } catch (error) {
            console.error("Update profile failed:", error);
            alert("Something went wrong while updating profile");
        }
    };


    const [partnerPreferenceData, setPartnerPreferenceData] = useState({
        age: "",
        height: "",
        marital_status: "",
        religion: "",
        community: "",
        mother_tongue: "",
        country: "",
        state: "",
        city: "",
        district: "",
        qualification: "",
        working_with: "",
        profession_area: "",
        working_as: "",
        annual_income: "",
        profile_managed_by: "",
        diet: ""
    })


    //function for updating partner preference 
    const handleUpdatePartnerPreference = async (e) => {
        e.preventDefault();
        console.log("handle update partner prefernce:");
        try {
            const token = sessionStorage.getItem('token')
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const result = await updatePartnerPreferenceApi(partnerPreferenceData, reqHeader);
            setIsEditing(false);
            if (result?.data?.result === true) {
                alert("Partner prefernce updated successfully");
                console.log(result);
            } else {
                console.log(result);
                alert(result?.data?.message || "Update failed");
            }
        } catch (error) {
            console.error("Update prefernce failed:", error);
            alert("Something went wrong while updating profile");
        }
    }



    return (
        <div className='flex '>

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


            <div className="flex-1 overflow-y-auto">
                <DashboardNav />
                <div className='flex flex-col justify-center'>
                    <DashboardHeader />

                    <div className='flex flex-col w-full md:pl-20 sm:px-0 px-2 py-10 sm:py-20'>

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
                        <div className='max-w-[800px] w-full px-4 sm:px-10' >
                            <div class="flex justify-start my-2 w-full">
                                <div class="relative w-full max-w-[120px] md:max-w-[150px] aspect-square">

                                    <svg class="w-full h-full absolute" viewBox="0 0 120 120">
                                        <circle cx="60" cy="60" r="54" fill="#E6F2FF" stroke="#E6F2FF" stroke-width="8" />
                                    </svg>


                                    <svg class="w-full h-full absolute" viewBox="0 0 120 120">
                                        <circle cx="60" cy="60" r="54" fill="none" stroke="#F0F0F0" stroke-width="8" />
                                    </svg>


                                    <svg class="w-full h-full absolute rotate-[-90deg]" viewBox="0 0 120 120">
                                        <circle cx="60" cy="60" r="54" fill="none" stroke="#4094F7" stroke-width="8"
                                            stroke-dasharray="339.292" stroke-dashoffset="186.611" />
                                    </svg>

                                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                        <span class="text-xl md:text-2xl font-bold text-[#4094F7]">45%</span>
                                    </div>
                                </div>
                            </div>

                            <div className=' flex flex-col  text-left pt-[50px] text-[#540D33]' >
                                <h1 className='text-[28px] font-bold'  >WELCOME, CALVIN..!</h1>
                                <p className=' font-semibold' >Your profile is 45% completed, Let’s finish setting up your <br /> profile so we can show it to more matches..!</p>
                            </div>


                            <div className='flex flex-col gap-10 pt-[50px] justify-center' >

                                {/* profile section */}
                                <ProfileSection />

                                {/* partner preference section */}
                                <PartnerPreferenceSection/>     

                            </div>

                        </div>
                        <ChatMessages />
                    </div>
                </div>
            </div>


        </div >

    )
}

export default MyProfile
