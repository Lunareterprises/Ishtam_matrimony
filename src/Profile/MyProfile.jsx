import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import DashboardHeader from '../Components/DashboardHeader';
import DashboardNav from '../Components/DashboardNav';
import { FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import ChatMessages from '../Components/ChatMessages';
import { fetchPartnerPreferenceApi, fetchProfileDataApi, getCurrentPlanApi, updatePartnerPreferenceApi, updateProfileApi } from '../Services/allApi';
import ProfileSection from './ProfileSection';
import PartnerPreferenceSection from './PartnerPreferenceSection';

function MyProfile() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [completionPercent, setCompletionPercent] = useState(0);
    const [currentPlanData, setCurrentPlanData] = useState({})

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


    //function for fetching partner prefernce data
    const fetchPartnerPrefernce = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const result = await fetchPartnerPreferenceApi(reqHeader);


            // Update state with fetched data - CORRECTED
            if (result.data && result.data.data && result.data.data.length > 0) {
                const partnerData = result.data.data[0];
                // ✅ Update state with API response
                setPartnerPreferenceData({
                    age: partnerData.pp_age || "",
                    height: partnerData.pp_height || "",
                    marital_status: partnerData.pp_marital_status || "",
                    religion: partnerData.pp_religion || "",
                    community: partnerData.pp_community || "",
                    mother_tongue: partnerData.pp_mother_tongue || "",
                    country: partnerData.pp_country || "",
                    state: partnerData.pp_state || "",
                    city: partnerData.pp_city || "",
                    district: partnerData.pp_district || "",
                    qualification: partnerData.pp_qualification || "",
                    working_with: partnerData.pp_working_with || "",
                    profession_area: partnerData.pp_profession_area || "",
                    working_as: partnerData.pp_working_as || "",
                    annual_income: partnerData.pp_annual_income || "",
                    profile_managed_by: partnerData.pp_profile_managed_by || "",
                    diet: partnerData.pp_diet || "",
                });
                console.log("partner preference data ::", partnerPreferenceData);

            } else {
                console.warn("No partner preference data found.");
            }
        } catch (error) {
            console.error("Error fetching partner preference data:", error);
        }
    };





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


                if (userData.u_profile_pic) {
                    // Create full URL for the server image
                    const fullImageUrl = `https://lunarsenterprises.com:6050${userData.u_profile_pic}`;
                    setPreview(fullImageUrl);  // Setting the complete URL
                }

            }
            calculateCompletion()

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


    //for calculating profile completion progress
    const calculateCompletion = (profileData, partnerData) => {
        const combinedData = { ...profileData, ...partnerData };

        // exclude only `is_private`
        const excludedKeys = ["is_private"];
        const validKeys = Object.keys(combinedData).filter(
            (key) => !excludedKeys.includes(key)
        );

        const filledCount = validKeys.filter((key) => {
            const value = combinedData[key];
            return (
                value !== "" &&
                value !== null &&
                value !== undefined &&
                !(Array.isArray(value) && value.length === 0)
            );
        }).length;

        return Math.round((filledCount / validKeys.length) * 100);
    };


    useEffect(() => {
        if (profileData && partnerPreferenceData) {
            const percent = calculateCompletion(profileData, partnerPreferenceData);
            setCompletionPercent(percent);
        }
    }, [profileData, partnerPreferenceData]);

    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (completionPercent / 100) * circumference;


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
                        <div className='max-w-[800px] w-full px-4 sm:px-10 sm:mt-0 mt-15' >

                            <div className="flex justify-start my-2 w-full">
                                <div className="relative w-full max-w-[120px] md:max-w-[150px] aspect-square">

                                    {/* Background circle */}
                                    <svg className="w-full h-full absolute" viewBox="0 0 120 120">
                                        <circle cx="60" cy="60" r={radius} fill="#D9D9D9" stroke="#E6F2FF" strokeWidth="8" />
                                    </svg>

                                    {/* Gray track */}
                                    <svg className="w-full h-full absolute" viewBox="0 0 120 120">
                                        <circle cx="60" cy="60" r={radius} fill="none" stroke="#F0F0F0" strokeWidth="8" />
                                    </svg>

                                    {/* Blue progress */}
                                    <svg className="w-full h-full absolute rotate-[-90deg]" viewBox="0 0 120 120">
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r={radius}
                                            fill="none"
                                            stroke="#E33183"
                                            strokeWidth="8"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    {/* Percentage text */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                        <span className="text-xl md:text-2xl font-bold text-[#E33183]">
                                            {completionPercent}%
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div className=' flex flex-col  text-left pt-[50px] text-[#540D33]' >
                                <h1 className='text-[28px] font-bold'  >WELCOME, {sessionStorage.getItem("name")}..!</h1>
                                <p className=' font-semibold' >Your profile is {completionPercent}% completed, Let’s finish setting up your <br /> profile so we can show it to more matches..!</p>
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
