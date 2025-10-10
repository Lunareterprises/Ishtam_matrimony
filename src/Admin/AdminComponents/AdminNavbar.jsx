import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import IshtamMarry_Logo from '../../assets/Frame 1000008772.png';
import { PiBellLight, PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { FaAngleDown, FaRegUser } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { HiMiniBars3BottomRight } from "react-icons/hi2";


function AdminNavbar({ onMenuClick }) {
    

    return (
        <div className="flex items-center justify-center py-5 px-5" >
            <div className="flex items-center justify-between  bg-white backdrop-blur-md shadow-sm h-22 w-full  sm:px-8 px-5 rounded-2xl mb-6 border border-white/70 transition-all">
                {/* Left: Logo & Search */}
                <div className="flex items-center gap-4 md:gap-6 w-full">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="">
                            <img
                                src={IshtamMarry_Logo} alt="logo" className="w-[160px] sm:w-[170px] h-auto"
                            />
                        </div>

                    </div>

                    {/* Search bar (hidden on small screens) */}
                    <div className="relative flex-1 max-w-[450px] ml-4 hidden md:block">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full rounded-full border-2 border-gray-300 pl-6 pr-12 py-3 focus:outline-none text-gray-600"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer">
                            <IoSearch className="text-[17px]" />
                        </div>
                    </div>
                </div>


                {/* Right: Notification + Avatar + Mobile Menu */}
                <div className="flex items-center gap-4 sm:gap-6">

                    {/* Notification icon */}
                    <div className="flex items-center justify-center gap-6" >
                        <div className="relative">
                            <button className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gray-100 flex items-center justify-center shadow hover:bg-gray-100 transition">
                                <PiBellLight className="sm:text-[24px] text-[20px] text-gray-500" />
                            </button>
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                                2
                            </span>
                        </div>
                        <div onClick={onMenuClick} className="md:hidden">
                            <button className="">
                                <HiMiniBars3BottomRight className="text-[39px] pt-2 text-gray-400" />
                            </button>
                        </div>
                    </div>
                    <div className=" justify-center items-center gap-3 rounded-full  py-2 pl-3 pr-5  border-2 border-gray-200 hidden lg:flex" onClick={() => setMenuOpen(!menuOpen)} >
                        <div className="items-center justify-center gap-4 w-full md:w-auto hidden lg:flex">
                            {/* Profile Image */}
                            <div>
                                <div className="flex border-gray-200 bg-[#D9D9D9] items-center justify-center rounded-full w-10 h-10 sm:w-11 sm:h-11 md:w-11 md:h-11">
                                    <FaRegUser className="text-[#797979] text-[15px]" />
                                </div>
                            </div>
                            {/* Text Info */}
                            <div className="flex flex-col items-start">
                                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3">
                                    <h1 className="text-[15px] ">
                                        <span className="font-semibold text-[#540D33]">Admin</span>
                                    </h1>
                                </div>
                                <h1 className="text-[#787878] text-[13px] ">ITM234</h1>
                            </div>
                        </div>
                       
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;
