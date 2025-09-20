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
        userId: ""
    })

    //function for fetching profile data
    const fetchProfileData = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            const result = await fetchProfileDataApi(reqHeader);
            console.log("result for fetching profile Data:", result);

            // Update state with fetched data - CORRECTED
            if (result.data && result.data.data && result.data.data.length > 0) {
                const userData = result.data.data[0];

                setProfileData({
                    file: userData.u_profile_pic,
                    created_by: userData.u_profile_for || "",
                    gender: userData.u_gender || "",
                    firstname: userData.u_firstname || "",
                    lastname: userData.u_lastname || "",
                    dob: userData.u_dob || "",
                    userId: userData.u_id || "",
                    religion: userData.u_religion || "",
                    community: userData.u_community || "",
                    father: userData.u_father || "",
                    mother: userData.u_mother || "",
                    no_of_sisters: userData.u_no_sisters || "",
                    no_of_brothers: userData.u_no_brothers || "",
                    financial_status: userData.u_financial_status || "",
                    diet: userData.u_diet || "",
                    hobbies: userData.u_hobbies ? userData.u_hobbies.split(',') : [],
                    about: userData.u_about || "",
                    mother_tongue: userData.u_mother_tongue || "",
                    height: userData.u_height || "",
                    marital_status: userData.u_marital_status || "",
                    district: userData.u_district || "",
                    profession_area: userData.u_profession_area || "",
                    country: userData.u_country || "",
                    state: userData.u_state || "",
                    city: userData.u_city || "",
                    zip: userData.u_zip || "",
                    qualification: userData.u_qualification || "",
                    college: userData.u_college || "",
                    working_with: userData.u_working_with || "",
                    working_as: userData.u_working_as || "",
                    employer_name: userData.u_employer_name || "",
                    annual_income: userData.u_annual_income || "",
                    is_private: userData.u_private_income || false,
                });

                console.log("profile pic path:", userData.u_profile_pic);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPartnerPrefernce()
        fetchProfileData()
    }, [])


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
                                <h1 className='text-[28px] font-bold'  >WELCOME, {profileData.firstname}..!</h1>
                                <p className=' font-semibold' >Your profile is 45% completed, Let’s finish setting up your <br /> profile so we can show it to more matches..!</p>
                            </div>


                            <div className='flex flex-col gap-10 pt-[50px] justify-center' >

                                {/* profile section */}
                                <ProfileSection />

                                {/* partner preference section */}
                                <PartnerPreferenceSection />

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
