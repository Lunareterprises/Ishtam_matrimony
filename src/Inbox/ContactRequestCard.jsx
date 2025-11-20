import React from 'react'
import profilecardimg from '../assets/ishtam-profilecard.jpg'
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';

function ContactRequestCard({ item }) {
    console.log("item data in contact card::", item);
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

    const navigate = useNavigate()
    const navigateToParnerProfile = (id) => {
        navigate(`/partner-profile/${id}`)
    }

    return (
        <div>
            <div className="hidden md:flex bg-white shadow-lg rounded-lg overflow-hidden w-full mb-4">
                {/* Left - Image */}
                <div className="relative">
                    {/* <img
                               src={profilecardimg}
                               alt="Profile"
                               className="w-45 h-full object-cover"
                           /> */}
                    {
                        item.u_profile_pic ?
                            <img

                                src={`https://lunarsenterprises.com:6050${item.u_profile_pic}`}
                                alt="Profile"
                                className="w-45 h-50 object-cover"
                            />
                            :
                            <div

                                alt="Profile"
                                className="border-gray-200 bg-[#D9D9D9] w-45 h-50 flex items-center justify-center object-cover"
                            >
                                <FaRegUser className="text-[#797979] text-[24px] sm:text-[48px]" />
                            </div>
                    }
                    <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                        {item?.active_plan?.s_plan_name || "Free"}
                    </div>
                </div>

                {/* Middle - Details */}
                <div className="p-5 flex flex-col justify-between items-center gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {item.u_firstname} {item.u_lastname}
                            <span className="text-gray-500 text-[18px]"> | ID : ITM{item.u_id}</span>
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {calculateAge(item.u_dob)} yrs  || {item.u_height} || {item.u_working_as || "Not Working"}
                        </p>
                        <p className="text-sm text-gray-600">{item.u_qualification || "BA English"}</p>
                        <p className="text-sm text-gray-600">
                            {item.u_mother_tongue || "N/A"} | {item.u_religion}, {item.u_community} | {item.u_district || "N/A"}, {item.u_state || "N/A"}
                        </p>
                    </div>
                    <div>
                        <button onClick={() => navigateToParnerProfile(item.u_id)} className="bg-[#E33183] text-white px-4 py-2 rounded-full text-sm font-medium">
                            View Profile
                        </button>
                    </div>
                </div>
            </div >

            {/* Mobile Layout */}
            < div className="flex flex-col md:hidden bg-white shadow-lg rounded-lg overflow-hidden w-65 max-w-sm mb-4" >
                <div className="relative">
                    {
                        item.u_profile_pic ?
                            <img src={`https://lunarsenterprises.com:6050${item.u_profile_pic}`} alt="Profile" className="w-full h-64 object-cover" />
                            :
                            <div

                                alt="Profile"
                                className="border-gray-200 bg-[#D9D9D9] w-full h-64 flex items-center justify-center object-cover"
                            >
                                <FaRegUser className="text-[#797979] text-[24px] sm:text-[48px]" />
                            </div>
                    }
                    <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                        {item?.active_plan?.s_plan_name || "Free"}
                    </div>
                </div>

                <div className="p-4">
                    <h2 className="text-[17px] font-semibold text-gray-800">
                        {item.u_firstname} {item.u_lastname}
                        <span className="text-gray-500 text-sm"> | ID : ITM{item.u_id}</span>
                    </h2>
                      <p className="text-sm text-gray-600 mt-1">
                            {calculateAge(item.u_dob)} yrs  || {item.u_height} || {item.u_working_as || "Not Working"}
                        </p>
                        <p className="text-sm text-gray-600">{item.u_qualification || "BA English"}</p>
                        <p className="text-sm text-gray-600">
                            {item.u_mother_tongue || "N/A"} | {item.u_religion}, {item.u_community} | {item.u_district || "N/A"}, {item.u_state || "N/A"}
                        </p>

                    <button onClick={() => navigateToParnerProfile(item.u_id)} className="bg-[#E33183] text-white px-4 py-2 rounded-full text-[13px] font-medium w-full mt-4">
                        View Profile
                    </button>
                </div>
            </div >
        </div >
    )
}

export default ContactRequestCard
