import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { TiCameraOutline } from "react-icons/ti";
import { FaPen } from "react-icons/fa";
import { useRef } from "react";
import { fetchProfileDataApi, getCurrentPlanApi, updateProfileApi } from '../Services/allApi';


function ProfileSection() {
    const [currentPlanData, setCurrentPlanData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const [preview, setPreview] = useState(null)

    //for fetching current plan
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

                if (userData.u_profile_pic) {
                    // Create full URL for the server image
                    const fullImageUrl = `https://lunarsenterprises.com:6050${userData.u_profile_pic}`;
                    setPreview(fullImageUrl);  // Setting the complete URL
                }

            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCurrentPlan()
        fetchProfileData()
    }, []);


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
        images: "",
        userId: ""
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
            const token = sessionStorage.getItem("token");

            // Don’t set Content-Type manually, let browser handle it
            const reqHeader = {
                "Authorization": `Bearer ${token}`,
            };

            const reqBody = new FormData();

            // Append all fields including image
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



    return (
        <>
            {/* profile image subscription button section */}
            <div className="bg-[#F5F5F5] flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-40 w-full rounded-xl p-5 sm:p-7 gap-5 sm:gap-0">
                {/* Left Section (Profile + Info) */}
                <div className="flex items-center gap-5">

                    {/* Profile Image Placeholder */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                        {/* Circle container with overflow-hidden */}
                        <div className="w-full h-full rounded-full bg-[#D9D9D9] flex items-center justify-center overflow-hidden">
                            {/* First try to show preview */}
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        console.log("Preview image failed to load");
                                        e.target.style.display = 'none';
                                    }}
                                />
                            )}

                            {/* If no preview, try to show server image */}
                            {!preview && profileData.file && (
                                <img
                                    src={`https://lunarsenterprises.com:6050${profileData.file}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        console.log("Server image failed to load");
                                        e.target.style.display = 'none';
                                    }}
                                />
                            )}

                            {/* If both fail, show default icon */}
                            {!preview && !profileData.file && (
                                <FaRegUser className="text-[#797979] text-[24px] sm:text-[30px]" />
                            )}

                            {/* Camera icon for uploading */}
                            <div
                                className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <TiCameraOutline className="text-gray-600 text-[18px]" />
                            </div>

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col items-start text-[#540D33]">
                        <div className="flex gap-2 sm:gap-3 items-center">
                            <h1 className="font-semibold text-sm sm:text-base">{profileData.firstname} {profileData.lastname}</h1>
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                        </div>
                        <h1 className="font-extralight text-xs sm:text-sm">ID : ITM {profileData.userId}</h1>
                    </div>
                </div>
                {
                    currentPlanData.result === false ? (
                        <button className="bg-[#E33183] py-2 px-6 sm:px-10 rounded-full text-white font-medium text-sm sm:text-base self-start sm:self-auto">
                            Subscription
                        </button>
                    ) : (

                        <div className='flex flex-col gap-3' >
                            <div className='flex flex-col items-start' >
                                <h1 className='text-[14px]' >Plan name</h1>
                                <p className='text-[14px]'  ><span>Expiry:</span> 13 Sep 2025</p>
                            </div>
                            <div className='flex flex-col items-start' >
                                <h1 className='text-[14px]' >Plan name</h1>
                                <p className='text-[14px]'  ><span>Expiry:</span> 13 Sep 2025</p>
                            </div>
                        </div>

                    )
                }
            </div>

            <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7]">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-6 bg-white">
                    <h2 className="text-lg font-bold text-[#540D33]">Add more photos (2/4)</h2>
                    <div
                        className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                        onClick={() => setEditingSection(editingSection === "photos" ? null : "photos")}
                    >
                        <FaPen className="text-white text-[10px]" />
                    </div>
                </div>

                {/* Body - Only show when editing */}
                {editingSection === "photos" ? (
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Photo 1 - With delete button */}
                            <div className="relative bg-white rounded-lg overflow-hidden h-40 border border-gray-200">
                                <img
                                    src="https://placehold.co/200x200/540d33/white?text=Photo+1"
                                    alt="Profile photo 1"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
                                    <span className="text-xs font-bold text-[#540D33]">1</span>
                                </div>
                                {/* Delete button */}
                                <div className="absolute top-2 left-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </div>
                            </div>

                            {/* Photo 2 - With delete button */}
                            <div className="relative bg-white rounded-lg overflow-hidden h-40 border border-gray-200">
                                <img
                                    src="https://placehold.co/200x200/540d33/white?text=Photo+2"
                                    alt="Profile photo 2"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
                                    <span className="text-xs font-bold text-[#540D33]">2</span>
                                </div>
                                {/* Delete button */}
                                <div className="absolute top-2 left-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </div>
                            </div>

                            {/* Add Photo Button */}
                            <div className="relative bg-white rounded-lg overflow-hidden h-40 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-[#540D33] flex items-center justify-center mb-2">
                                    <TiCameraOutline className="text-white text-xl" />
                                </div>
                                <span className="text-sm font-medium text-[#540D33]">Add Photo</span>
                                <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
                                    <span className="text-xs font-bold text-[#540D33]">3</span>
                                </div>
                            </div>

                            {/* Add Photo Button */}
                            <div className="relative bg-white rounded-lg overflow-hidden h-40 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-[#540D33] flex items-center justify-center mb-2">
                                    <TiCameraOutline className="text-white text-xl" />
                                </div>
                                <span className="text-sm font-medium text-[#540D33]">Add Photo</span>
                                <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
                                    <span className="text-xs font-bold text-[#540D33]">4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Display only the first two photos in view mode */}
                            <div className="relative bg-white rounded-lg overflow-hidden h-40 border border-gray-200">
                                <img
                                    src="https://placehold.co/200x200/540d33/white?text=Photo+1"
                                    alt="Profile photo 1"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
                                    <span className="text-xs font-bold text-[#540D33]">1</span>
                                </div>
                            </div>

                            <div className="relative bg-white rounded-lg overflow-hidden h-40 border border-gray-200">
                                <img
                                    src="https://placehold.co/200x200/540d33/white?text=Photo+2"
                                    alt="Profile photo 2"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
                                    <span className="text-xs font-bold text-[#540D33]">2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            {/* user pofile section */}
            <div className='flex flex-col gap-10' >
                {/*  BASIC INFO */}
                <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">BASIC INFO</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "basic" ? null : "basic")
                            }
                        >
                            <FaPen className="text-white text-[10px]" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="flex flex-col gap-4 text-sm">

                            {/* Created by */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Created by</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "basic" ? (
                                        < select
                                            value={profileData.created_by}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, created_by: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200
                                    focus:border-[#E33183] focus:outline-none text-sm text-[#540D33]"
                                        >
                                            <option value="My Son">My Son</option>
                                            <option value="My Self">My Self</option>
                                            <option value="My Daughter">My Daughter</option>
                                            <option value="My Brother">My Brother</option>
                                            <option value="My Sister">My Sister</option>
                                            <option value="My Friend">My Friend</option>
                                            <option value="My Relative">My Relative</option>
                                        </select>

                                    ) : (
                                        <span>{profileData.created_by || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Gender</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "basic" ? (
                                        <select
                                            value={profileData.gender}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, gender: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 
                                                            focus:border-[#E33183] focus:outline-none text-sm text-[#540D33]"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <span>{profileData.gender || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* First Name */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">First Name</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "basic" ? (
                                        <input
                                            type="text"
                                            value={profileData.firstname}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, firstName: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 
                                                        focus:border-[#E33183] focus:outline-none text-sm text-[#540D33]"
                                        />
                                    ) : (
                                        <span>{profileData.firstname || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Last Name</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "basic" ? (
                                        <input
                                            type="text"
                                            value={profileData.lastname}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, lastName: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 
                                                            focus:border-[#E33183] focus:outline-none text-sm text-[#540D33]"
                                        />
                                    ) : (
                                        <span>{profileData.lastname || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* DOB */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">DOB</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "basic" ? (
                                        <input
                                            type="date"
                                            value={profileData.dob}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, dob: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 
                                                                  focus:border-[#E33183] focus:outline-none text-sm text-[#540D33]"
                                        />
                                    ) : (
                                        <span>
                                            {profileData.dob
                                                ? new Date(profileData.dob).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                                : "Not specified"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">RELIGION BACKGROUND</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "religion" ? null : "religion")
                            }
                        >
                            <FaPen className="text-white text-[10px]" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="flex flex-col gap-4 text-sm">

                            {/* Religion */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Religion</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "religion" ? (
                                        <input
                                            type="text"
                                            value={profileData.religion}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, religion: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 
                                                              focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{profileData.religion || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Community */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Community</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "religion" ? (
                                        <input
                                            type="text"
                                            value={profileData.community}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, community: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 
                                                                 focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{profileData.community || "Not specified"}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* FAMILY INFO */}
                <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">FAMILY INFO</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "family" ? null : "family")
                            }
                        >
                            <FaPen className="text-white text-[10px]" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="flex flex-col gap-4 text-sm">

                            {/* Father's Details */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-44">Father's Details</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "family" ? (
                                        <input
                                            type="text"
                                            value={profileData.father}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, father: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 
                             focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{profileData.father || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Mother's Details */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-44">Mother's Details</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "family" ? (
                                        <input
                                            type="text"
                                            value={profileData.mother}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, mother: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.mother || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Sisters */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-44">No: of Sisters</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "family" ? (
                                        <input
                                            type="text"
                                            value={profileData.sisters}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, sisters: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.sisters || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Brothers */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-44">No: of Brothers</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "family" ? (
                                        <input
                                            type="text"
                                            value={profileData.brothers}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, brothers: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.brothers || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Financial Status */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-44">Family Financial Status</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "family" ? (
                                        <input
                                            type="text"
                                            value={profileData.financial_status}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    financial_status: e.target.value,
                                                })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.financial_status || "Not specified"}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* LOCATION, EDUCATION & CAREER */}
                <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">LOCATION, EDUCATION & CAREER</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "location" ? null : "location")
                            }
                        >
                            <FaPen className="text-white text-[10px]" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="flex flex-col gap-4 text-sm">

                            {/* Country Living In */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">Country Living in</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.country}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, country: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] 
                             focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{profileData.country || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* State Living In */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">State Living In</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.state}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, state: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] 
                             focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{profileData.state || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* District */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">District</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.district}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, district: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.district || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* City Living In */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">City Living In</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.city}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, city: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.city || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Zip / Pin code */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">Zip / Pin code</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.zip}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, zip: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.zip || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Qualification */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">Highest Qualification</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.qualification}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, qualification: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.qualification || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* College */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">College Attended</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.college}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, college: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.college || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Profession */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">Profession as</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.profession_area}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, profession_area: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.profession_area || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Working With */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">Working With</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.working_with}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, working_with: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.working_with || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Working As */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">Working As</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.working_as}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, working_as: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.working_as || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Employer Name */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">Employer Name</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.employer_name}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, employer_name: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.employer_name || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Annual Income */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-48">Annual Income</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "location" ? (
                                        <input
                                            type="text"
                                            value={profileData.annual_income}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, annual_income: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none"
                                        />
                                    ) : (
                                        <span>{profileData.annual_income || "Not specified"}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Keep Private Checkbox */}
                        <div className="flex justify-center pt-10">
                            <label className="inline-flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={profileData.is_private}
                                    onChange={(e) =>
                                        setProfileData({ ...profileData, is_private: e.target.checked })
                                    }
                                    className="form-checkbox h-5 w-5"
                                />
                                <span className="text-sm text-[#540D33]">Keep this private</span>
                            </label>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">LIFE STYLE</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "lifestyle" ? null : "lifestyle")
                            }
                        >
                            <FaPen className="text-white text-[10px]" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="flex flex-col gap-4 text-sm">
                            {/* Diet */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-20">Diet</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "lifestyle" ? (
                                        <input
                                            type="text"
                                            value={profileData.diet}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, diet: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] 
                             focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{profileData.diet || "Not specified"}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl overflow-hidden border border-[#E4E4E7]">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">HOBBIES & INTEREST</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "hobbies" ? null : "hobbies")
                            }
                        >
                            <FaPen className="text-white text-[10px]" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        {editingSection === "hobbies" ? (
                            <div className="flex flex-wrap gap-3">
                                {profileData.hobbies.map((hobby, index) => (
                                    <div key={index} className="relative inline-block">
                                        {/* Hidden span to calculate text width */}
                                        <span
                                            className="invisible absolute whitespace-pre px-4 py-2 text-sm font-medium"
                                            ref={(el) => {
                                                if (el) {
                                                    el.textContent = hobby || " "; // Mirror input value
                                                    const input = el.nextSibling;
                                                    if (input) input.style.width = `${el.offsetWidth}px`;
                                                }
                                            }}
                                        >
                                            {hobby || " "}
                                        </span>

                                        {/* Input */}
                                        <input
                                            type="text"
                                            value={hobby}
                                            onChange={(e) => {
                                                const updated = [...profileData.hobbies];
                                                updated[index] = e.target.value;
                                                setProfileData({ ...profileData, hobbies: updated });
                                            }}
                                            className="px-4 py-2 rounded-lg border border-pink-400 
                                                                  text-[#540D33] text-sm font-medium bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-400 inline-block"
                                            style={{ width: "auto" }}
                                        />
                                    </div>
                                ))}


                                {/* Add new hobby */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setProfileData({
                                            ...profileData,
                                            hobbies: [...profileData.hobbies, ""],
                                        })
                                    }
                                    className="px-4 py-2 rounded-lg border border-dashed border-pink-400 
                                                                 text-pink-500 text-sm font-medium bg-white hover:bg-pink-50 transition"
                                >
                                    + Add Hobby
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {profileData.hobbies.length > 0 ? (
                                    profileData.hobbies.map((hobby, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg 
                                                                     border border-pink-400 bg-pink-50  text-[#540D33] text-sm font-medium"
                                        >
                                            <span>{hobby}</span>
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-sm">No hobbies added</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>



                <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">MORE ABOUT MY SELF</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "more" ? null : "more")
                            }
                        >
                            <FaPen className="text-white text-[10px]" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="flex flex-col gap-4 text-sm">

                            {/* About */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">About</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "more" ? (
                                        <input
                                            type="text"
                                            value={profileData.about}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, about: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{profileData.about || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Mother Tongue */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Mother Tongue</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "more" ? (
                                        <input
                                            type="text"
                                            value={profileData.mother_tongue}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    mother_tongue: e.target.value,
                                                })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{profileData.mother_tongue || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Height */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Height</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "more" ? (
                                        <input
                                            type="text"
                                            value={profileData.height}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, height: e.target.value })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{profileData.height || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Marital Status */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Marital Status</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "more" ? (
                                        <input
                                            type="text"
                                            value={profileData.marital_status}
                                            onChange={(e) =>
                                                setProfileData({
                                                    ...profileData,
                                                    marital_status: e.target.value,
                                                })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{profileData.marital_status || "Not specified"}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-center' >
                    <button onClick={handleUpdateProfile} className='bg-[#E33183] py-2 w-[250px] rounded-sm text-white font-medium ' >
                        Save & Update
                    </button>
                </div>

            </div >
        </>
    )
}

export default ProfileSection
