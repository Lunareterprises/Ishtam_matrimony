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
import ImageGalleryModal from '../partner profile/ImageGalleryModal'
import { useAuth } from '../AuthContext/AuthContext';


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
    const [showChat, setShowChat] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { user } = useAuth();
    const token = user?.token

    const fetchPartnerProfile = async () => {
        console.log("profile id inside the function :::", profileId);
        try {

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
                const criteriaMap = {
                    age: {
                        label: "Age",
                        value: item.age,
                    },
                    height: {
                        label: "Height",
                        value: item.u_height,
                    },
                    marital_status: {
                        label: "Marital Status",
                        value: item.u_marital_status,
                    },
                    religion: {
                        label: "Religion",
                        value: item.u_religion,
                    },
                    community: {
                        label: "Community",
                        value: item.u_community,
                    },
                    mother_tongue: {
                        label: "Mother Tongue",
                        value: item.u_mother_tongue,
                    },
                    country: {
                        label: "Country",
                        value: item.u_country,
                    },
                    state: {
                        label: "State",
                        value: item.u_state,
                    },
                    city: {
                        label: "City",
                        value: item.u_city,
                    },
                    district: {
                        label: "District",
                        value: item.u_district,
                    },
                    qualification: {
                        label: "Qualification",
                        value: item.u_qualification,
                    },
                    working_with: {
                        label: "Working With",
                        value: item.u_working_with,
                    },
                    profession_area: {
                        label: "Profession Area",
                        value: item.u_profession_area,
                    },
                    working_as: {
                        label: "Working As",
                        value: item.u_working_as,
                    },
                    annual_income: {
                        label: "Annual Income",
                        value: item.u_annual_income,
                    },
                    profile_managed_by: {
                        label: "Profile Managed By",
                        value: item.u_profile_for,
                    },
                    diet: {
                        label: "Diet",
                        value: item.u_diet,
                    },
                };

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

    const openModal = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
        setShowChat(false);
    };


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
                                                            {(() => {
                                                                const status = item?.is_connected?.i_status;

                                                                if (status === "accepted") return null;
                                                                if (status === "rejected") {
                                                                    return (
                                                                        <button className="bg-gray-200 text-gray-500 px-6 py-2 rounded-full text-sm font-semibold cursor-not-allowed">
                                                                            Rejected
                                                                        </button>
                                                                    );
                                                                }

                                                                return (
                                                                    <button
                                                                        onClick={() => {
                                                                            setShowConnectNowModal(true);
                                                                            setSelectedProfileId(item?.u_id);
                                                                        }}
                                                                        className="bg-[#E33183] hover:bg-[#c91e6b] text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
                                                                    >
                                                                        Send Interest
                                                                    </button>
                                                                );
                                                            })()}
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

                                        {/* Image gallery */}
                                        <div className="flex flex-col gap-2 px-10 pt-10">

                                            {/* Thumbnails Grid */}
                                            <h1 className="text-[17px] font-semibold text-[#1F1F1F]">
                                                Image Gallery ({item?.images?.length || 0})
                                            </h1>


                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                                                {item?.images?.map((img, i) => (
                                                    <img
                                                        key={i}
                                                        src={`https://lunarsenterprises.com:6050${img?.uf_file}`}
                                                        alt={`img-${i}`}
                                                        className="w-full h-full aspect-square object-cover rounded-sm cursor-pointer hover:opacity-90 transition-opacity"
                                                        onClick={() => openModal(i)}
                                                    />
                                                ))}
                                            </div>
                                            <ImageGalleryModal
                                                images={item?.images}
                                                currentIndex={currentIndex}
                                                setCurrentIndex={setCurrentIndex}
                                                isOpen={isOpen}
                                                setIsOpen={setIsOpen}
                                            />

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


                                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 px-6 xl:px-12 pt-12 w-full mx-auto">

                                            {/* Lifestyle Card */}
                                            <div className="group bg-white/70 backdrop-blur-lg border border-pink-200/40 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
                                                <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8">
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

                                            {/* Background Card */}
                                            <div className="group bg-white/70 backdrop-blur-lg border border-gray-200/40 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
                                                <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8">
                                                    Background
                                                </h2>
                                                <div className="flex flex-col gap-5">
                                                    <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                        <IoLanguage className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm text-gray-800 leading-relaxed">
                                                            {item.u_mother_tongue || "N/A"}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                        <FaStarOfDavid className="text-xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm text-gray-800 leading-relaxed">
                                                            {item.u_religion || "N/A"}, {item.u_community || "N/A"}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                        <IoLocation className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm text-gray-800 leading-relaxed">
                                                            {item.u_city || "N/A"}, {item.u_district || "N/A"}, {item.u_state || "N/A"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Education & Career Card */}
                                            <div className="group bg-white/70 backdrop-blur-lg border border-gray-200/40 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
                                                <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8">
                                                    Education & Career
                                                </h2>
                                                <div className="flex flex-col gap-5">
                                                    <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                        <FaGraduationCap className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm text-gray-800 leading-relaxed">
                                                            {item.u_qualification || "N/A"}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                        <MdOutlineWork className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm text-gray-800 leading-relaxed">
                                                            {item.u_profession_area || "N/A"}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-3 items-start group/item hover:translate-x-1 transition-transform">
                                                        <RiCoinsFill className="text-2xl text-pink-500 mt-0.5 flex-shrink-0" />
                                                        <p className="text-sm text-gray-800 leading-relaxed">
                                                            {(item.u_annual_income / 100000).toFixed(2)} LPA
                                                        </p>
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
                                                                {item?.matched_criteria?.length || 0}/{item?.user_criteria?.length || 0}
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
                                                    {/* Details Section */}
                                                    <div className="flex flex-col gap-6 w-full sm:w-[57%] mt-6">

                                                        {item.user_criteria?.map((key) => {
                                                            const criteriaMap = {
                                                                age: { label: "Age", value: item.age },
                                                                height: { label: "Height", value: item.u_height },
                                                                marital_status: { label: "Marital Status", value: item.u_marital_status },
                                                                religion: { label: "Religion", value: item.u_religion },
                                                                community: { label: "Community", value: item.u_community },
                                                                mother_tongue: { label: "Mother Tongue", value: item.u_mother_tongue },
                                                                country: { label: "Country Living In", value: item.u_country },
                                                                state: { label: "State Living In", value: item.u_state },
                                                                city: { label: "City", value: item.u_city },
                                                                district: { label: "District", value: item.u_district },
                                                                qualification: { label: "Qualification", value: item.u_qualification },
                                                                working_with: { label: "Working With", value: item.u_working_with },
                                                                profession_area: { label: "Profession Area", value: item.u_profession_area },
                                                                working_as: { label: "Working As", value: item.u_working_as },
                                                                annual_income: { label: "Annual Income", value: item.u_annual_income },
                                                                profile_managed_by: { label: "Profile Managed By", value: item.u_profile_for },
                                                                diet: { label: "Diet", value: item.u_diet },
                                                            };

                                                            const criteria = criteriaMap[key];
                                                            if (!criteria) return null;

                                                            const isMatched = item?.matched_criteria?.includes(key);

                                                            return (
                                                                <div
                                                                    key={key}
                                                                    className="flex w-full justify-between items-center pb-4"
                                                                >
                                                                    <div className="flex flex-col items-start">
                                                                        <h1 className="font-semibold">{criteria.label}</h1>
                                                                        <h1>{criteria.value || "N/A"}</h1>
                                                                    </div>

                                                                    {isMatched ? (
                                                                        <div className="text-[#E33183] text-3xl">
                                                                            <FaCircleCheck />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-neutral-400 text-3xl">
                                                                            <FaCircleMinus />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
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

                                        {showChat && <ChatMessages />}
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
