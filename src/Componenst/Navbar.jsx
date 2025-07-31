import React, { useState } from 'react'
import IshtamMarry_Logo from '../assets/Frame 1000008772.png'
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

function Navbar() {

    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (

        <>
            <nav className="bg-white h-[80px] flex items-center justify-center shadow">
                <div className="w-[90%] flex items-center justify-between">

                    {/* Logo */}
                    <img
                        src={IshtamMarry_Logo}
                        alt="logo"
                        className="w-[160px] sm:w-[200px] h-auto"
                    />

                    {/* Desktop Nav */}
                    <ul className="hidden lg:flex gap-10 font-medium text-gray-700">
                        <li className="cursor-pointer">Home</li>
                        <li className="cursor-pointer">About us</li>
                        <li className="cursor-pointer">FAQ</li>
                        <li className="cursor-pointer">Guide</li>
                        <li className="cursor-pointer">Contact</li>
                    </ul>

                    {/* Buttons - Hidden on small screens */}
                    <div className="hidden sm:flex gap-5">
                        <button className="w-[150px]  h-[36px] sm:h-[40px] bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700">
                            Registration
                        </button>
                        <button className="w-[90px]  h-[36px] sm:h-[40px] border border-pink-600 text-pink-600 rounded-full font-medium hover:bg-pink-50">
                            Sign In
                        </button>
                    </div>

                    {/* Hamburger icon (mobile) */}
                    <div className="block lg:hidden" onClick={() => setShowSidebar(!showSidebar)}>
                        {showSidebar ? (
                            <RxCross2 className="text-3xl text-pink-600" />
                        ) : (
                            <HiMiniBars3BottomRight className="text-3xl text-pink-600" />
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {showSidebar && (
                <div className="bg-white w-full shadow-lg xl:hidden h-[340px] sm:h-[230px] ">
                    <ul className="flex flex-col items-center gap-4 font-medium text-gray-700">
                        <li>Home</li>
                        <li>About us</li>
                        <li>FAQ</li>
                        <li>Guide</li>
                        <li>Contact</li>
                        <div className="sm:hidden flex flex-col gap-4 items-center mt-6">
                            <button className="w-[150px] h-[39px] bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700">
                                Registration
                            </button>
                            <button className="w-[150px] h-[39px] border border-pink-600 text-pink-600 rounded-full font-medium hover:bg-pink-50">
                                Sign In
                            </button>
                        </div>
                    </ul>

                </div>
            )}
        </>


    )
}

export default Navbar
