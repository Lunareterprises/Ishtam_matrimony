import React, { useState } from 'react';
import { FaRegUser, FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import { HiBadgeCheck } from "react-icons/hi";

function TodaysMatchHeader({ onSearch }) {
  const email = sessionStorage.getItem("email");
  const name = sessionStorage.getItem("name");
  const profilePic = sessionStorage.getItem("profilePic");
  const user_id = sessionStorage.getItem("user_id");
  const hasProfilePic = profilePic && profilePic !== "null";

  const [value, setValue] = useState("");

  // handle typing
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue); // send value to parent
  };

  // optional clear button
  const clearSearch = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className="hidden lg:flex bg-white w-full h-auto min-h-[80px] items-center justify-evenly gap-4 px-4 fixed z-20 top-0 left-20">
      {/* Left Section - Search + Filter */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 w-full md:w-auto">
        <div className="relative w-[300px] md:w-[350px]">
          <input
            type="text"
            placeholder="Search Profile ID"
            value={value}
            onChange={handleChange}
            className="w-full rounded-full border border-[#E4E4E7] pl-12 pr-10 py-2 text-[#787878] placeholder-gray-400 focus:outline-none"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          {value && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        {/* <div className="w-10 h-10 border border-[#E4E4E7] rounded-md flex items-center justify-center">
          <PiSlidersBold className="text-xl text-[#787878]" />
        </div> */}
      </div>

      {/* Right Section - User Info */}
      <div className="items-center justify-center gap-6 hidden lg:flex">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2">
            <h1 className="text-[15px]">
              <span className="font-semibold text-[#540D33]">{name}</span> | ID : ITM{user_id}
            </h1>
            <HiBadgeCheck className="text-[#3A78FF] text-[24px]" />
          </div>
          <h1 className="text-[#787878] text-[13px] break-all">{email}</h1>
        </div>

        <div>
          {hasProfilePic ? (
            <img
              className="rounded-full object-cover w-12 h-12"
              src={`https://lunarsenterprises.com:6050${profilePic}`}
              alt="Profile"
            />
          ) : (
            <div className="flex border-gray-200 bg-[#D9D9D9] items-center justify-center rounded-full w-12 h-12">
              <FaRegUser className="text-[#797979] text-[18px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodaysMatchHeader;
