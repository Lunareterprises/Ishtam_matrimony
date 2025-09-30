import React, { useEffect, useState } from 'react'
import DashboardHeader from '../Components/DashboardHeader';
import Sidebar from '../Components/Sidebar';
import { FaEnvelope, FaRegUser, FaStarOfDavid } from "react-icons/fa";
import { GiChickenOven, GiPrayer, GiPrayerBeads } from "react-icons/gi";
import { GiFruitBowl } from "react-icons/gi";
import { FaGraduationCap } from "react-icons/fa6";
import profilePic from "../assets/profilePic.jpg";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import DashboardNav from '../Components/DashboardNav';
import ChatMessages from '../Components/ChatMessages';
import { getContactDataApi, getPartnerProfileApi } from '../Services/allApi';
import { useParams } from 'react-router-dom';
import ConnectNowModal from '../Components/ConnectNowModal';
import { MdOutlineWork } from "react-icons/md";
import { RiCoinsFill } from "react-icons/ri";
import { RiProfileLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { IoLanguage, IoLocation } from "react-icons/io5";
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import ViewContactModal from '../Components/ViewContactModal';


function PartnerProfile() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [partnerProfileData, setPartnerProfileData] = useState([]);
    const [showConnectNowModal, setShowConnectNowModal] = useState(false);
    const [showViewContactModal, setShowViewContactModal] = useState(false)
    const [selectedProfileId, setSelectedProfileId] = useState(null);
    const [matchedCriteria, setMatchedCriteria] = useState([]);
    //for fetching parter id 
    const { profileId } = useParams();
    const profilePic = sessionStorage.getItem("profilePic");
    const fullName = sessionStorage.getItem("name")
    const [ContactData, setContactData] = useState([])

    const fetchPartnerProfile = async () => {
        console.log("profile id inside the function :::", profileId);
        try {
            const token = sessionStorage.getItem("token");
            console.log("token::", token);
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const reqBody = { partner_id: parseInt(profileId) };
            const result = await getPartnerProfileApi(reqBody, reqHeader);
            console.log("consoling result of fetching partner profile::", result);
            if (result?.data?.result) {
                setMatchedCriteria(result?.data?.data?.matched_criteria)
                setPartnerProfileData(result?.data?.data);
            } else {
                await Swal.fire({
                    title: 'Not found!',
                    text: result?.data?.message || 'Profile not found. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#E33183'
                });
            }
        } catch (error) {
            console.log("Error in fetching partner profile", error);
        }
    };



    const getContactData = async (e) => {
        e.preventDefault()
        try {
            const token = sessionStorage.getItem("token");
            console.log("token::", token);
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const reqBody = { partner_id: parseInt(profileId) };
            const result = await getContactDataApi(reqBody, reqHeader);
            if (result?.data?.result === true) {
                console.log("result::", result);
                setContactData(result.data.data);
                setShowViewContactModal(true);
            }
            else {
                Swal.fire({
                    title: 'contact failed',
                    text: result?.data?.message || 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'ok',
                });
            }
        }
        catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB");
    };

    useEffect(() => {
        if (profileId) {
            fetchPartnerProfile();
        }
    }, [profileId]);

    return (
        <>
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
                    {/* Topbar with menu button (mobile only) */}
                    <DashboardNav />

                    <div className='flex flex-col justify-center'>
                        <DashboardHeader />
                        <div className='flex flex-col w-full  pt-30'>

                            {partnerProfileData.length > 0 ? (
                                partnerProfileData.map((item, index) => (
                                    <div>
                                        <div className='flex justify-center'  >
                                            <div className='max-w-[750px] w-full px-10 ' >
                                                <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-[0_0_18px_rgba(0,0,0,0.08)] overflow-hidden max-w-3xl w-full mx-auto sm:gap-8 gap-2">

                                                    {/* Left Image Section */}

                                                    {
                                                        item.u_profile_pic ?
                                                            <div className="relative sm:w-1/3 w-full overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none">
                                                                <img
                                                                    src={
                                                                        item.u_profile_pic
                                                                            ? `https://lunarsenterprises.com:6050${item.u_profile_pic}`
                                                                            : "/default-profile.png"
                                                                    }
                                                                    alt="Profile"
                                                                    className="w-full h-full object-cover"
                                                                />

                                                                {/* Top Black Gradient */}
                                                                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/60 to-transparent"></div>

                                                                {/* Bottom Black Gradient */}
                                                                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/60 to-transparent"></div>

                                                                {/* Premium Tag */}
                                                                <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[11px] font-semibold px-4 py-2 rounded-tl-md rounded-br-md z-10">
                                                                    {item.active_plan === null ? "Free" : item.active_plan.s_plan_name}
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="relative sm:w-1/3 w-full sm:h-auto h-60 overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none bg-[#D9D9D9] flex items-center justify-center ">
                                                                <FaRegUser className="text-[#797979] text-[35px]" />
                                                                {/* Premium Tag */}
                                                                <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[11px] font-semibold px-3 py-2 rounded-tl-md rounded-br-md z-10">
                                                                    {item.active_plan === null ? "Free" : item.active_plan.s_plan_name}
                                                                </div>
                                                            </div>
                                                    }

                                                    {/* Right Content Section */}
                                                    <div className="flex flex-col justify-center gap-2 sm:px-2 px-4 py-8 text-center sm:text-left">
                                                        <h1 className="text-lg font-semibold">
                                                            {item?.u_firstname} {item?.u_lastname} <span className="text-gray-500">| ID: ITM{item?.u_id}</span>
                                                        </h1>
                                                        <p className="text-sm text-gray-700">
                                                            {item?.age} yrs | {formatDate(item?.u_dob)} | {item?.u_marital_status} | {item?.u_height}cm
                                                        </p>
                                                        <p className="text-sm text-gray-700">Not Working | {item?.u_qualification} | {item?.u_annual_income}LPA</p>
                                                        <p className="text-sm text-gray-700">
                                                            {item?.u_mother_tongue} | {item?.u_religion}, {item?.u_community} | {item?.u_district}, {item?.u_state}
                                                        </p>
                                                        <p className="text-sm text-gray-700">
                                                            Profile Managed by {item?.u_profile_for}
                                                        </p>

                                                        {/* CTA Button */}

                                                        <div className='flex flex-col lg:flex-row sm:gap-4 gap-3 pt-4' >
                                                            <button
                                                                onClick={getContactData}
                                                                className='border border-[#E33183] hover:bg-[#E33183] hover:text-[white] text-[#E33183] px-6 py-2 rounded-full text-sm font-semibold self-center sm:self-start"'  >
                                                                View Contact
                                                            </button>
                                                            <button onClick={() => {
                                                                setShowConnectNowModal(true)
                                                                setSelectedProfileId(item?.u_id);
                                                            }} className=" bg-[#E33183] hover:bg-[#c91e6b] text-white px-6 py-2 rounded-full text-sm font-semibold self-center sm:self-start">
                                                                Send Interest
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* about profile */}
                                        <div className='flex flex-col gap-2 px-10 pt-10 ' >
                                            <h1 className='text-[17px] font-semibold text-[#1F1F1F] ' >About {item?.u_firstname} {item?.u_lastname}</h1>
                                            <p className='text-[#1F1F1F] text-[14px]'  >{item?.u_about}</p>
                                        </div>


                                        {/* hobies and interest */}
                                        <div className='flex flex-col gap-3 px-10 pt-8 sm:items-start items-center' >
                                            <h1 className='text-[17px] font-semibold text-[#1F1F1F] '>Hobbies & Interests</h1>
                                            <div className="flex flex-wrap gap-5  justify-center">
                                                {item?.u_hobbies
                                                    ?.split(",") // split string into array
                                                    .map((hobby, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-5 py-2 flex items-center text-sm font-medium text-[#E33183] border border-[#E33183] rounded-full bg-pink-50"
                                                        >
                                                            {hobby.trim()}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row flex-wrap items-center md:items-center lg:items-start justify-center lg:justify-between gap-10 px-5 md:px-10 pt-10">

                                            {/* Contact Details */}
                                            {/* <div className="flex flex-col gap-4 md:w-[45%] lg:w-auto text-center md:text-center lg:text-left">
                                                <h1 className="text-[17px] font-semibold text-[#1F1F1F]">Contact Details</h1>
                                                <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.08)] flex flex-col p-5">
                                                    <div className="flex items-start flex-col gap-3 text-black">
                                                        <div className="flex gap-3 items-center justify-center lg:justify-start">
                                                            <CgPhone className="text-2xl" />
                                                            <h1 className="text-[#1F1F1F] text-[14px]">(+33) xxx xxx xx</h1>
                                                        </div>
                                                        <div className="flex gap-3 items-center justify-center lg:justify-start">
                                                            <FaEnvelope className="text-2xl" />
                                                            <h1 className="text-[#1F1F1F] text-[14px]">curtis.weaver@example.com</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* Lifestyle */}
                                            <div className="flex flex-col gap-4 w-full md:w-[30%] lg:w-auto text-center md:text-center lg:text-left">
                                                <h1 className="text-[17px] font-semibold text-[#1F1F1F]">Lifestyle</h1>
                                                <div className="flex flex-col items-center lg:items-start gap-3">
                                                    <div className="text-[#E33183] border-2 border-[#E33183] rounded-2xl w-16 h-16 bg-pink-50 flex items-center justify-center">
                                                        <div className="text-[43px]">
                                                            {
                                                                item.u_diet === "Non Veg" ?
                                                                    <GiChickenOven />
                                                                    :
                                                                    <GiFruitBowl />
                                                            }
                                                        </div>
                                                    </div>
                                                    {
                                                        item.u_diet === "Non Veg" ?
                                                            <p className="text-[14px] text-[#1F1F1F]">Non-Vegetarian</p>
                                                            :
                                                            <p className="text-[14px] text-[#1F1F1F]">Vegetarian</p>
                                                    }
                                                </div>
                                            </div>

                                            {/* Background */}
                                            <div className="flex flex-col gap-4 w-full md:w-[30%] lg:w-auto text-center md:text-center lg:text-left">
                                                <h1 className="text-[17px] font-semibold text-[#1F1F1F]">Background</h1>
                                                <div className="flex flex-col gap-3 text-[#1F1F1F]">
                                                    <div className="flex gap-1 items-center justify-center lg:justify-start">
                                                        <IoLanguage className="text-2xl" />
                                                        <h1 className="text-[14px]">{item.u_mother_tongue}</h1>
                                                    </div>
                                                    <div className="flex gap-1 items-center justify-center lg:justify-start">
                                                        <FaStarOfDavid className="text-[21px]" />
                                                        <h1 className="text-[14px] pl-1">{item.u_religion}, {item.u_community}</h1>
                                                    </div>
                                                    <div className="flex gap-1 items-center justify-center lg:justify-start">
                                                        <IoLocation className="text-2xl" />
                                                        <h1 className="text-[14px]">{item.u_city}, {item.u_district}, {item.u_state}</h1>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Extra Contact Details */}
                                            <div className="flex flex-col gap-4 w-full md:w-[45%] lg:w-auto text-center md:text-center lg:text-left">
                                                <h1 className="text-[17px] font-semibold text-[#1F1F1F]">Education & Careers</h1>
                                                <div className="flex flex-col gap-3 text-[#1F1F1F]">
                                                    <div className="flex gap-1 items-center justify-center lg:justify-start">
                                                        <FaGraduationCap className="text-2xl" />
                                                        <h1 className="text-[14px]">{item.u_qualification}</h1>
                                                    </div>
                                                    <div className="flex gap-1 items-center justify-center lg:justify-start">
                                                        <MdOutlineWork className="text-2xl" />
                                                        <h1 className="text-[14px]">{item.u_profession_area}</h1>
                                                    </div>
                                                    <div className="flex gap-1 items-center justify-center lg:justify-start">
                                                        <RiCoinsFill className="text-2xl" />
                                                        <h1 className="text-[14px]">{item.u_annual_income}</h1>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        {
                                            item.partnerPreference ?
                                                <div className="flex flex-col w-full items-center justify-center pt-20 gap-10 px-10">
                                                    {/* Title */}
                                                    <div className="flex flex-col items-center w-full sm:w-[65%]">
                                                        <h1 className="text-[22px] font-semibold mb-8 text-center">What {" "}
                                                            <span>{item.u_gender === "Male" ? "he" : "she"}</span> is looking for :</h1>
                                                        {/* Profile Images and Score */}
                                                        <div className="flex w-full justify-between items-center">
                                                            {/* Left Profile */}
                                                            <div className="flex flex-col items-center gap-3">
                                                                {
                                                                    item.u_profile_pic ? <img
                                                                        src={
                                                                            item.u_profile_pic
                                                                                ? `https://lunarsenterprises.com:6050${item.u_profile_pic}`
                                                                                : "/default-profile.png"
                                                                        }
                                                                        alt="Profile"
                                                                        className="sm:w-33 sm:h-33 w-20 h-20 rounded-full object-cover shadow-md"
                                                                    />
                                                                        :
                                                                        <div className='sm:w-33 sm:h-33 w-20 h-20 rounded-full object-cover shadow-md bg-[#D9D9D9] flex items-center justify-center' >
                                                                            <FaRegUser className='text-[#797979] text-[28px]' />
                                                                        </div>
                                                                }

                                                                <h1 className="font-semibold ">{item.u_firstname} {item.u_lastname}</h1>
                                                            </div>

                                                            {/* Score */}
                                                            <div className="w-13 h-13 sm:h-22 sm:w-22 rounded-full bg-[#E33183] flex items-center justify-center text-white font-semibold sm:text-lg text-sm shadow-lg">
                                                                08/10
                                                            </div>

                                                            {/* Right Profile */}
                                                            <div className="flex flex-col items-center gap-3">
                                                                {
                                                                    profilePic ?
                                                                        <img
                                                                            src={`https://lunarsenterprises.com:6050${profilePic}`}
                                                                            alt="Profile"
                                                                            className="sm:w-33 sm:h-33 w-20 h-20 rounded-full object-cover shadow-md"
                                                                        />
                                                                        :
                                                                        <div className='sm:w-33 sm:h-33 w-20 h-20 rounded-full object-cover shadow-md bg-[#D9D9D9] flex items-center justify-center' >
                                                                            <FaRegUser className='text-[#797979] text-[28px]' />
                                                                        </div>
                                                                }
                                                                <h1 className="font-semibold ">{fullName}</h1>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Details Section */}
                                                    <div className="flex flex-col gap-6 w-full sm:w-[57%] mt-6">
                                                        {/* Each Row */}
                                                        <div className="flex w-full justify-between items-center pb-4">
                                                            <div className="flex flex-col items-start ">
                                                                <h1 className="font-semibold">Age</h1>
                                                                <h1>{item.age}</h1>
                                                            </div>

                                                            {
                                                                matchedCriteria?.age
                                                                    ? <div className="text-[#E33183] text-3xl">
                                                                        <FaCircleCheck />
                                                                    </div>
                                                                    :
                                                                    <div className="text-neutral-400 text-3xl">
                                                                        <FaCircleMinus />
                                                                    </div>
                                                            }

                                                        </div>

                                                        <div className="flex w-full justify-between items-center  pb-4">
                                                            <div className="flex flex-col items-start ">
                                                                <h1 className="font-semibold">Height</h1>
                                                                <h1>{item.u_height}</h1>
                                                            </div>
                                                            {
                                                                matchedCriteria?.height
                                                                    ? <div className="text-[#E33183] text-3xl">
                                                                        <FaCircleCheck />
                                                                    </div>
                                                                    :
                                                                    <div className="text-neutral-400 text-3xl">
                                                                        <FaCircleMinus />
                                                                    </div>
                                                            }
                                                        </div>

                                                        <div className="flex w-full justify-between items-center  pb-4">
                                                            <div className="flex flex-col items-start ">
                                                                <h1 className="font-semibold">Marital Status</h1>
                                                                <h1>{item.u_marital_status}</h1>
                                                            </div>
                                                            {
                                                                matchedCriteria?.marital_status
                                                                    ? <div className="text-[#E33183] text-3xl">
                                                                        <FaCircleCheck />
                                                                    </div>
                                                                    :
                                                                    <div className="text-neutral-400 text-3xl">
                                                                        <FaCircleMinus />
                                                                    </div>
                                                            }
                                                        </div>

                                                        <div className="flex w-full justify-between items-center pb-4">
                                                            <div className="flex flex-col items-start ">
                                                                <h1 className="font-semibold">Religion / Community</h1>
                                                                <h1>{item.u_religion}, {item.u_community}</h1>
                                                            </div>
                                                            <div className="text-[#E33183] text-3xl">
                                                                {
                                                                    matchedCriteria?.religion_community
                                                                        ? <div className="text-[#E33183] text-3xl">
                                                                            <FaCircleCheck />
                                                                        </div>
                                                                        :
                                                                        <div className="text-neutral-400 text-3xl">
                                                                            <FaCircleMinus />
                                                                        </div>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="flex w-full justify-between items-center">
                                                            <div className="flex flex-col items-start">
                                                                <h1 className="font-semibold">Mother Tongue</h1>
                                                                <h1>{item.u_mother_tongue}</h1>
                                                            </div>
                                                            {
                                                                matchedCriteria?.mother_tongue
                                                                    ? <div className="text-[#E33183] text-3xl">
                                                                        <FaCircleCheck />
                                                                    </div>
                                                                    :
                                                                    <div className="text-neutral-400 text-3xl">
                                                                        <FaCircleMinus />
                                                                    </div>
                                                            }
                                                        </div>

                                                        <div className="flex w-full justify-between items-center pb-4">
                                                            <div className="flex flex-col items-start ">
                                                                <h1 className="font-semibold">Country Living In</h1>
                                                                <h1>{item.u_country}</h1>
                                                            </div>
                                                            <div className="text-[#E33183] text-3xl">
                                                                <FaCircleCheck />
                                                            </div>
                                                        </div>

                                                        <div className="flex w-full justify-between items-center pb-4">
                                                            <div className="flex flex-col items-start ">
                                                                <h1 className="font-semibold">State Living In</h1>
                                                                <h1>{item.u_state}</h1>
                                                            </div>
                                                            <div className="text-[#E33183] text-3xl">
                                                                <FaCircleCheck />
                                                            </div>
                                                        </div>

                                                        <div className="flex w-full justify-between items-center pb-4">
                                                            <div className="flex flex-col items-start ">
                                                                <h1 className="font-semibold">Qualification</h1>
                                                                <h1>{item.u_qualification}</h1>
                                                            </div>
                                                            <div className="text-[#E33183] text-3xl">
                                                                <FaCircleCheck />
                                                            </div>
                                                        </div>
                                                        <div className="flex w-full justify-between items-center pb-4">
                                                            <div className="flex flex-col items-start ">
                                                                <h1 className="font-semibold">Working As</h1>
                                                                <h1>{item.u_working_as}</h1>
                                                            </div>
                                                            <div className="text-[#E33183] text-3xl">
                                                                <FaCircleCheck />
                                                            </div>
                                                        </div>
                                                        <div className="flex w-full justify-between items-center pb-4">
                                                            <div className="flex flex-col items-start ">
                                                                <h1 className="font-semibold">Diet</h1>
                                                                <h1>{item.u_diet}</h1>
                                                            </div>
                                                            <div className="text-neutral-400 text-3xl">
                                                                <FaCircleMinus />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                :

                                                <div className='flex w-full items-center justify-center h-80' >
                                                    <div className="flex flex-col gap-3 items-center justify-center">
                                                        <h1 className="text-gray-500 font-medium text-center">
                                                            Complete your profile to view what{" "}
                                                            <span>{item.u_gender === "Male" ? "he" : "she"}</span> is looking for
                                                        </h1>
                                                        <Link to="/myProfile"  >
                                                            <button
                                                                className="border border-[#E33183] hover:bg-[#E33183] hover:text-white text-[#E33183] px-6 py-2 rounded-full text-sm font-semibold "
                                                            >
                                                                Update Profile
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                        }
                                        <ChatMessages />
                                    </div>
                                ))
                            ) : (
                                <div className='w-full flex flex-col gap-3 items-center justify-center pt-50 py-3' >
                                    <div className="flex  items-center justify-center text-white bg-[#E33183] w-10 h-10 rounded-full">
                                        <RiProfileLine className='text-xl' />
                                    </div>
                                    <h1 className='text-gray-500 font-medium '  >Oops! We couldn’t load the profile.</h1>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div >

            {/* Show modal */}
            {showConnectNowModal && (
                <ConnectNowModal receiver_id={selectedProfileId} onClose={() => setShowConnectNowModal(false)} />
            )}

            {
                showViewContactModal && (
                    <ViewContactModal onClose={() => setShowViewContactModal(false)} contactData={ContactData} />
                )
            }

        </>
    )
}

export default PartnerProfile
