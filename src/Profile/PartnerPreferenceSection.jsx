import React, { useEffect, useState } from 'react'
import { fetchPartnerPreferenceApi, updatePartnerPreferenceApi } from '../Services/allApi';
import { FaPen } from "react-icons/fa";
import Swal from 'sweetalert2';
import { FaChevronDown } from "react-icons/fa";


function PartnerPreferenceSection() {
    const [isEditing, setIsEditing] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const [showPartnerReligionDropdown, setShowPartnerReligionDropdown] = useState(false);
    const [showPartnerCommunityDropdown, setShowPartnerCommunityDropdown] = useState(false);
    const [showPartnerMaritalDropdown, setShowPartnerMaritalDropdown] = useState(false);
    const [showPartnerDietDropdown, setShowPartnerDietDropdown] = useState(false);


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

    useEffect(() => {
        fetchPartnerPrefernce()
    }, [])

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
                Swal.fire({
                    title: 'Partner preference updated',
                    text: 'We’ve saved your new partner preferences successfully.',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: result?.data?.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.log(result);
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });

        }
    }

    const religionData = {
        Hindu: [
            "Ambalavasi",
            "Brahmin - Namboodiri",
            "Chettiar",
            "Dheevara",
            "Ezhava",
            "Ezhuthachan",
            "Maniyani",
            "Menon",
            "Nadar",
            "Nair",
            "Nair - Vaniya",
            "Nair - Vilakkithala",
            "Nambiar",
            "Pillai",
            "Pulaya",
            "Saliya",
            "Thiyya",
        ],
        Christian: [
            "Roman Catholic",
            "Syrian Catholic",
            "Orthodox",
            "Jacobite",
            "Marthoma",
            "Pentecost",
            "CSI",
            "Seventh Day Adventist",
            "Born Again",
        ],
        Muslim: [
            "Sunni",
            "Mappila",
            "Mujahid",
            "Shia",
            "Ahmadiyya",
        ],
        Others: ["Buddhist", "Jain", "No Religion", "Spiritual - Not Religious"],
    };

    return (
        <>
            <div className='flex flex-col pt-20 gap-10' >
                <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                    {/* Header */}
                    <div className="flex  justify-center px-6 py-6 bg-white">
                        <h2 className="text-3xl font-bold text-[#540D33]">PARTNER PREFERENCE</h2>

                    </div>
                </div>

                <div className="bg-white rounded-xl overflow-visible border-[0.4px] border-[#E4E4E7]">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">PARTNER BASIC INFO</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "partner_basic" ? null : "partner_basic")
                            }
                        >
                            <FaPen className="text-white text-[10px]" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="flex flex-col gap-4 text-sm">
                            {/* Age */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Age</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_basic" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.age}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({ ...partnerPreferenceData, age: e.target.value })
                                            }
                                            onKeyDown={(e) => {
                                                // Allow only numeric keys, Backspace, Tab, Arrow keys
                                                if (
                                                    !(
                                                        (e.key >= "0" && e.key <= "9") ||
                                                        ["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
                                                    )
                                                ) {
                                                    e.preventDefault(); // block alphabets and other non-numeric keys
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] 
                         focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.age || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Height */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Height (CM)</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_basic" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.height}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({ ...partnerPreferenceData, height: e.target.value })
                                            }
                                            onKeyDown={(e) => {
                                                // allow backspace, delete, tab, arrows
                                                if (
                                                    ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
                                                ) {
                                                    return;
                                                }

                                                // block alphabets & special characters
                                                if (!/^[0-9]$/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] 
                         focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.height || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Marital Status */}
                            {/* Marital Status */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Marital Status</div>
                                <div>:</div>

                                <div className="relative w-full">
                                    {editingSection === "partner_basic" ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowPartnerMaritalDropdown(!showPartnerMaritalDropdown);
                                                }}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-left text-[#490B22] bg-white flex justify-between items-center"
                                            >
                                                <span>{partnerPreferenceData.marital_status || "Select Marital Status"}</span>
                                                <FaChevronDown className="text-[#490B22] text-sm ml-2" />
                                            </button>

                                            {showPartnerMaritalDropdown && (
                                                <div className="absolute z-50 mt-1 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white rounded-lg shadow-md">
                                                    {["Single", "Married", "Divorced", "Widowed", "Separated"].map((status, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                setPartnerPreferenceData({
                                                                    ...partnerPreferenceData,
                                                                    marital_status: status,
                                                                });
                                                                setShowPartnerMaritalDropdown(false);
                                                            }}
                                                            className="px-3 py-2 text-[14px] text-[#490B22] hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            {status}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <span>{partnerPreferenceData.marital_status || "Not specified"}</span>
                                    )}
                                </div>
                            </div>


                            {/* Religion */}

                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Religion</div>
                                <div>:</div>
                                <div className="relative w-full">
                                    {editingSection === "partner_basic" ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowPartnerReligionDropdown(!showPartnerReligionDropdown);
                                                    setShowPartnerCommunityDropdown(false); // 👈 KEY FIX
                                                }}

                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-left text-[#490B22] bg-white flex justify-between items-center"
                                            >
                                                <span>{partnerPreferenceData.religion || "Select Religion"}</span>
                                                <FaChevronDown className="text-[#490B22] text-sm ml-2" />
                                            </button>

                                            {showPartnerReligionDropdown && (
                                                <div className="absolute z-50 mt-1 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white rounded-lg shadow-md">
                                                    {Object.keys(religionData).map((religion, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                setPartnerPreferenceData({
                                                                    ...partnerPreferenceData,
                                                                    religion,
                                                                    community: "",
                                                                });
                                                                setShowPartnerReligionDropdown(false);
                                                            }}
                                                            className="px-3 py-2 text-[14px] text-[#490B22] hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            {religion}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <span>{partnerPreferenceData.religion || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Community */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Community</div>
                                <div>:</div>
                                <div className="relative w-full">
                                    {editingSection === "partner_basic" ? (
                                        <>
                                            <button
                                                type="button"
                                                disabled={!partnerPreferenceData.religion}
                                                onClick={() => {
                                                    setShowPartnerCommunityDropdown(!showPartnerCommunityDropdown);
                                                    setShowPartnerReligionDropdown(false); // 👈 KEY FIX
                                                }}

                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-left text-[#490B22] bg-white disabled:bg-gray-100 flex justify-between items-center"
                                            >
                                                <span>
                                                    {partnerPreferenceData.community ||
                                                        (partnerPreferenceData.religion
                                                            ? "Select Community"
                                                            : "Select Religion First")}
                                                </span>
                                                <FaChevronDown className="text-[#490B22] text-sm ml-2" />
                                            </button>

                                            {showPartnerCommunityDropdown && partnerPreferenceData.religion && (
                                                <div className="absolute z-50 mt-1 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white rounded-lg shadow-md">
                                                    {religionData[partnerPreferenceData.religion]?.map((community, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                setPartnerPreferenceData({
                                                                    ...partnerPreferenceData,
                                                                    community,
                                                                });
                                                                setShowPartnerCommunityDropdown(false);
                                                            }}
                                                            className="px-3 py-2 text-[14px] text-[#490B22] hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            {community}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <span>{partnerPreferenceData.community || "Not specified"}</span>
                                    )}
                                </div>
                            </div>



                            {/* Mother Tongue */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Mother Tongue</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_basic" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.mother_tongue}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    mother_tongue: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key >= "0" && e.key <= "9") {
                                                    e.preventDefault(); // block numbers only
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] 
                         focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.mother_tongue || "Not specified"}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-xl overflow-visible border-[0.4px] border-[#E4E4E7]">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">PARTNER LOCATION DETAILS</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "partner_location" ? null : "partner_location")
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
                                <div className="font-semibold text-[#540D33] w-32">Country Living In</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_location" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.country}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    country: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key >= "0" && e.key <= "9") {
                                                    e.preventDefault(); // block numbers only
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 
                         focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.country || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* State Living In */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">State Living In</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_location" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.state}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    state: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key >= "0" && e.key <= "9") {
                                                    e.preventDefault(); // block numbers only
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 
                         focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.state || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* City */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">City</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_location" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.city}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    city: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key >= "0" && e.key <= "9") {
                                                    e.preventDefault(); // block numbers only
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 
                         focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.city || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* District */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">District</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_location" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.district}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    district: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key >= "0" && e.key <= "9") {
                                                    e.preventDefault(); // block numbers only
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 
                         focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.district || "Not specified"}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7]">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">PARTNER EDUCATION & CAREER</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "partner_career" ? null : "partner_career")
                            }
                        >
                            <FaPen className="text-white text-[10px]" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="flex flex-col gap-4 text-sm">
                            {/* Qualification */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Qualification</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_career" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.qualification}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    qualification: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key >= "0" && e.key <= "9") {
                                                    e.preventDefault(); // block numbers only
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 
                         focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.qualification || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Working With */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Working With</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_career" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.working_with}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    working_with: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key >= "0" && e.key <= "9") {
                                                    e.preventDefault(); // block numbers only
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 
                         focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.working_with || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Profession Area */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Profession Area</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_career" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.profession_area}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    profession_area: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key >= "0" && e.key <= "9") {
                                                    e.preventDefault(); // block numbers only
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 
                         focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.profession_area || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Working As */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-32">Working As</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_career" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.working_as}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    working_as: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key >= "0" && e.key <= "9") {
                                                    e.preventDefault(); // block numbers only
                                                }
                                            }}
                                            className="bg-transparent border-b-2 border-gray-200 
                         focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.working_as || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Annual Income */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-39">Annual Income (INR)</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_career" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.annual_income}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    annual_income: e.target.value,
                                                })
                                            }
                                            onKeyDown={(e) => {
                                                // allow backspace, delete, tab, arrows
                                                if (
                                                    ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
                                                ) {
                                                    return;
                                                }

                                                // block alphabets & special characters
                                                if (!/^[0-9]$/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}

                                            className="bg-transparent border-b-2 border-gray-200 
                         focus:border-[#E33183] focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.annual_income || "Not specified"}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-white rounded-xl overflow-visible border-[0.4px] border-[#E4E4E7] ">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-6 bg-white">
                        <h2 className="text-lg font-bold text-[#540D33]">PARTNER OTHER DETAILS</h2>
                        <div
                            className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer"
                            onClick={() =>
                                setEditingSection(editingSection === "partner_other" ? null : "partner_other")
                            }
                        >
                            <FaPen className="text-white text-[10px]" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="bg-[#F5F5F5] px-7 py-7">
                        <div className="flex flex-col gap-4 text-sm">

                            {/* Profile Managed by */}
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-40">Profile Managed by</div>
                                <div>:</div>
                                <div>
                                    {editingSection === "partner_other" ? (
                                        <input
                                            type="text"
                                            value={partnerPreferenceData.profile_managed_by}
                                            onChange={(e) =>
                                                setPartnerPreferenceData({
                                                    ...partnerPreferenceData,
                                                    profile_managed_by: e.target.value,
                                                })
                                            }
                                            className="bg-transparent border-b-2 border-gray-200 focus:border-[#E33183] 
                                                                  focus:outline-none text-sm text-[#540D33] transition-all"
                                        />
                                    ) : (
                                        <span>{partnerPreferenceData.profile_managed_by || "Not specified"}</span>
                                    )}
                                </div>
                            </div>

                            {/* Diet */}
                           
                            <div className="flex gap-2 items-center">
                                <div className="font-semibold text-[#540D33] w-40">Diet</div>
                                <div>:</div>

                                <div className="relative w-full">
                                    {editingSection === "partner_other" ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setShowPartnerDietDropdown(!showPartnerDietDropdown)}
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-left text-[#490B22] bg-white flex justify-between items-center"
                                            >
                                                <span>{partnerPreferenceData.diet || "Select Diet"}</span>
                                                <FaChevronDown className="text-[#490B22] text-sm ml-2" />
                                            </button>

                                            {showPartnerDietDropdown && (
                                                <div className="absolute z-50 mt-1 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white rounded-lg shadow-md">
                                                    {["Veg", "Non Veg"].map((diet, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                setPartnerPreferenceData({
                                                                    ...partnerPreferenceData,
                                                                    diet,
                                                                });
                                                                setShowPartnerDietDropdown(false);
                                                            }}
                                                            className="px-3 py-2 text-[14px] text-[#490B22] hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            {diet}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <span>{partnerPreferenceData.diet || "Not specified"}</span>
                                    )}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>


                <div onClick={handleUpdatePartnerPreference} className='w-full flex justify-center' >
                    <button className='bg-[#E33183] py-2 w-[250px] rounded-sm text-white font-medium ' >
                        Save & Update
                    </button>
                </div>
            </div >
        </>
    )
}

export default PartnerPreferenceSection
