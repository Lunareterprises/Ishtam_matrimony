import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import FindYourIshtam from './FindYourIshtam';
import MatchSuggestions from './MatchSuggestions';
import WhoViewedMyProfile from './WhoViewedMyProfile';
import DashboardHeader from '../Components/DashboardHeader';
import profilePic from "../assets/profilePic.jpg";
import { HiBadgeCheck } from "react-icons/hi";
import { BsArrowDownLeftCircleFill } from "react-icons/bs";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import ChatMessages from '../Components/ChatMessages';
import DashboardNav from '../Components/DashboardNav';
import { FaRegUser, FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import ChangePassword from '../Components/ChangePassword';
import { Link } from 'react-router-dom';
import { fetchPartnerPreferenceApi, fetchProfileDataApi, getCurrentPlanApi, listInterestApi } from '../Services/allApi';


function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [progress, setProgress] = useState(65);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [sentInterestCount, setSentInterestCout] = useState(0);
    const [receivedInterestCount, setReceivedInterestCount] = useState(0);
    const [completionPercent, setCompletionPercent] = useState(0);
    const [currentPlanData, setCurrentPlanData] = useState({})


    const listSentInterest = async () => {
        try {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const reqBody = {
                "status": "sent"
            }
            const result = await listInterestApi(reqHeader, reqBody);
            console.log(result);
            setSentInterestCout(result.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const listReceivedInterest = async () => {
        try {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const reqBody = {
                "status": "received"
            }
            const result = await listInterestApi(reqHeader, reqBody);
            console.log(result);
            setReceivedInterestCount(result.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }



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

            }
            else {

            }
        }
        catch (error) {
            console.log(error);
        }
    }


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
        getCurrentPlan()
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


    useEffect(() => {
        listSentInterest()
        listReceivedInterest()
    }, [])


    const calculateAge = (dob) => {
        if (!dob) return "";

        const birthDate = new Date(dob);   // parses "1999-12-13T18:30:00.000Z"
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // adjust if birthday hasn’t occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };



    return (
        <div className="flex">
            {/* Sidebar - desktop */}
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

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                {/* Topbar with menu button (mobile only) */}
                <DashboardNav />
                <div className='flex flex-col justify-center' >
                    <DashboardHeader />
                    {/* Page content */}
                    <div className="flex w-full md:pl-10 sm:px-0 px-2 py-30 sm:py-30">
                        <div className="max-w-[1000px] w-full px-4 sm:px-10">
                            <div className="flex flex-col lg:flex-row gap-8 sm:gap-4 w-full">
                                {/* Profile Summary */}
                                <div className="bg-white rounded-xl overflow-hidden border border-[#E4E4E7] w-full lg:w-[60%] shadow-sm">
                                    {/* Header */}
                                    <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 bg-[#E331830F]">
                                        <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#540D33]">
                                            Profile Summary
                                        </h2>
                                    </div>

                                    {/* Body */}
                                    <div className="px-4 sm:px-7 py-4 sm:py-7 w-full">
                                        <div className="flex gap-7">
                                            {/* Profile Image */}
                                            <div className="w-[140px] h-[140px] flex items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-[#D9D9D9] flex-shrink-0">
                                                {
                                                    profileData.file ? (
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            src={`https://lunarsenterprises.com:6050${profileData.file}`}
                                                            alt="Profile"
                                                        />
                                                    ) : (
                                                        <FaRegUser className="text-[#797979] text-[24px] sm:text-[30px]" />
                                                    )
                                                }

                                            </div>

                                            {/* Info + Progress */}
                                            <div className="flex-1">
                                                {/* Name & Badge */}
                                                <div className="text-[#540D33]">
                                                    <div className="flex items-center gap-2">
                                                        <h1 className="text-[17px] font-semibold">{profileData.firstname} {profileData.lastname}</h1>
                                                        <HiBadgeCheck className="text-[19px] text-[#3A78FF]" />
                                                    </div>
                                                    <h1 className="text-[14px] font-medium">{calculateAge(profileData.dob)} | {profileData.religion}</h1>
                                                </div>

                                                {/* Progress Section */}
                                                <div className="w-full pt-10">
                                                    {/* Progress Container */}
                                                    <div className="relative w-full bg-gray-200 rounded-full h-2">
                                                        {/* Fill */}
                                                        <div
                                                            className="bg-[#E33183] h-2 rounded-full transition-all duration-500"
                                                            style={{ width: `${completionPercent}%` }}
                                                        ></div>

                                                        {/* Floating Label */}
                                                        <div
                                                            className="absolute -top-15 flex items-center justify-center px-4 py-3 text-white text-[11px] font-medium bg-[#E33183] rounded-full whitespace-nowrap"
                                                            style={{
                                                                left: `${completionPercent}%`,
                                                                transform: "translateX(-50%)",
                                                            }}
                                                        >
                                                            {completionPercent}%

                                                           
                                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#E33183] rounded-full"></div>
                                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full scale-75"></div>
                                                        </div>

                                                    </div>

                                                    {/* Bottom Text */}
                                                    <p className="mt-3 text-[#540D33] text-[14px] font-medium">
                                                        “ Your profile is {completionPercent}% completed ”
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex gap-5 items-center justify-center pt-5' >
                                            <button onClick={() => setShowChangePassword(true)} className="py-2 px-7 text-[14px] border border-[#E33183] text-[#E33183] rounded-full font-medium hover:bg-pink-50">
                                                Change password
                                            </button>
                                            <Link to={"/myProfile"} >
                                                <button className="py-2 px-7 text-[14px] bg-[#E33183] text-white rounded-full font-medium hover:bg-pink-700">
                                                    Edit Profile
                                                </button>
                                            </Link>


                                        </div>
                                    </div>
                                </div>

                                {/* Side cards */}
                                <div className="flex flex-col gap-8 sm:gap-4 w-full lg:w-[40%]">
                                    {/* Received Interest */}
                                    <div className="rounded-xl overflow-hidden border border-[#E4E4E7]">
                                        <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 bg-[#E331830F]">
                                            <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#540D33]">Received Interests</h2>
                                            <BsArrowDownLeftCircleFill className="text-[#E33183] text-[28px] sm:text-[32px]" />
                                        </div>
                                        <div className="bg-white px-4 sm:px-7 py-4 sm:py-4">
                                            <div className="text-center text-[28px] sm:text-[38px] font-semibold text-[#540D33]">{receivedInterestCount?.length || 0}</div>
                                        </div>
                                    </div>

                                    {/* Sent Requests */}
                                    <div className="rounded-xl overflow-hidden border border-[#E4E4E7]">
                                        <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 bg-[#E331830F]">
                                            <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#540D33]">Sent interests</h2>
                                            <BsArrowUpRightCircleFill className="text-[#E33183] text-[28px] sm:text-[32px]" />
                                        </div>
                                        <div className="bg-white px-4 sm:px-7 py-4 sm:py-4">
                                            <div className="text-center text-[28px] sm:text-[38px] font-semibold text-[#540D33]">{sentInterestCount?.length || 0}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Other sections */}
                            <FindYourIshtam />
                            <MatchSuggestions />
                            <WhoViewedMyProfile />
                        </div>
                        <ChatMessages />
                    </div>
                </div>

            </div>

            {/* Show modal */}
            {showChangePassword && (
                <ChangePassword onClose={() => setShowChangePassword(false)} />
            )}
        </div>
    )
}

export default Dashboard
