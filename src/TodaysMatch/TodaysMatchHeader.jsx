import React from 'react';
import { FaRegUser, FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import { HiBadgeCheck } from "react-icons/hi";
import defaultProfilePic from "../assets/profilePic.jpg";

function TodaysMatchHeader() {

  const email = sessionStorage.getItem("email");
  const name = sessionStorage.getItem("name");
  const profilePic = sessionStorage.getItem("profilePic");
  const user_id = sessionStorage.getItem("user_id");
  const hasProfilePic = profilePic && profilePic !== "null";

  return (
    <div className="hidden lg:flex bg-white w-full h-auto min-h-[80px] items-center justify-evenly gap-4 px-4 fixed z-20 top-0 left-20">
      {/* Left Section - Search + Filter */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-5 w-full md:w-auto">
        <div className="relative w-full sm:w-[100px] md:w-[350px]">
         
          <input
            type="text"
            placeholder="Search Profile ID"
            className="w-full rounded-full border border-[#E4E4E7] pl-12 pr-4 py-2 text-[#787878] placeholder-gray-400 focus:outline-none"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          
        </div>
        <div className="w-10 h-10 border border-[#E4E4E7] rounded-md flex items-center justify-center">
          <PiSlidersBold className="text-xl text-[#787878]" />
        </div>
      </div>

      {/* Right Section - User Info */}
      <div className="items-center justify-center gap-4 sm:gap-6 w-full md:w-auto hidden lg:flex">
        {/* Text Info */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3">
            <h1 className="text-[14px] sm:text-[16px]">
              <span className="font-semibold text-[#540D33]">{name} | </span>
              ID : ITM{user_id}
            </h1>
            <HiBadgeCheck className="text-[#3A78FF] text-[24px] sm:text-[30px]" />
          </div>
          <h1 className="text-[#787878] text-[12px] sm:text-[14px] break-all">{email}</h1>
        </div>

        {/* Profile Image */}
        <div>
          {hasProfilePic ? (
            <img
              className="rounded-full object-cover w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13"
              src={`https://lunarsenterprises.com:6050${profilePic}`}
              alt="Profile"
            />
          ) : (
            <div className="flex border-gray-200 bg-[#D9D9D9] items-center justify-center rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13">
              <FaRegUser className="text-[#797979] text-[15px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodaysMatchHeader
