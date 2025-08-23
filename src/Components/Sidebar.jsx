import React, { useState } from 'react'
import IshtamMarry_Logo from '../assets/Frame 1000008772.png'
import DoubleHearts from '../assets/DoubleHearts.png'
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { BsEnvelopeArrowDown } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

function Sidebar() {

    const [toggleMyIshtam, setToggleMyIshtam] = useState(false);
    const [toggleMatches, setToggleMatches] = useState(false);
    const toggleMyIshtamDropdown = () => {
        setToggleMyIshtam(prev => !prev);
    };

    const toggleMatchesDropdown = () => {
        setToggleMatches(prev => !prev);
    };

    return (
        <div className='bg-white h-full flex flex-col gap-3 max-w-[240px] text-[#490B22] z-30 fixed shadow-sm' >
            <div className='py-5' >
                <div className='flex justify-center w-full h-auto' >
                    <img className='w-[60%]' src={IshtamMarry_Logo} alt="" />
                </div>

            </div>
            <div onClick={toggleMyIshtamDropdown} className='flex justify-between px-10 py-2 items-center cursor-pointer  duration-200'>
                <div className='flex items-center gap-2'>
                    <img src={DoubleHearts} alt="icon" />
                    <h1 className='font-semibold'>My Ishtam</h1>
                </div>

                <div>
                    {toggleMyIshtam ? <FaCaretUp /> : <FaCaretDown />}
                </div>
            </div>

            {/* Dropdown for my ishttam */}
            {toggleMyIshtam && (
                <div className=" transition-all duration-300">
                    <Link to="/dashboard" className='block py-2 w-full text-center hover:bg-[#e3318455] duration-300'>
                        Dashboard
                    </Link>
                    <Link to="/myProfile" className='block py-2 w-full text-center hover:bg-[#e3318455] duration-300'>
                        My Profile
                    </Link>
                </div>
            )}

            <div onClick={toggleMatchesDropdown} className='flex justify-between px-10 py-2 items-center cursor-pointer duration-200'>
                <div className='flex items-center gap-3'>
                    <IoPeopleSharp className='text-xl' />
                    <h1 className='font-semibold'>Matches</h1>
                </div>

                <div>
                    {toggleMatches ? <FaCaretUp /> : <FaCaretDown />}
                </div>
            </div>

            {/* Dropdown for Matches */}
            {toggleMatches && (
                <div className=" transition-all duration-300">
                    <Link to="/dashboard" className='block py-2 w-full text-center hover:bg-[#e3318455] duration-300'>
                        Todays Match
                    </Link>
                    <Link to="/my-profile" className='block py-2 w-full text-center hover:bg-[#e3318455] duration-300'>
                        My Match (12)
                    </Link>
                    <Link to="/my-profile" className='block py-2 w-full text-center hover:bg-[#e3318455] duration-300'>
                        More Matches
                    </Link>
                </div>
            )}

            <div className='flex justify-between px-10 py-2 items-center cursor-pointer  duration-200'>
                <div className='flex items-center gap-3'>
                    <BsEnvelopeArrowDown  className='text-2xl' />
                    <h1 className='font-semibold'>Inbox</h1>
                </div>
            </div>
            <div className='flex justify-between px-10 py-2 items-center cursor-pointer  duration-200'>
                <div className='flex items-center gap-3'>
                    <MdOutlineWorkspacePremium  className='text-2xl' />
                    <h1 className='font-semibold'>Subscription</h1>
                </div>
            </div>
            <div className='flex justify-between px-10 py-2 items-center cursor-pointer  duration-200'>
                <div className='flex items-center gap-3'>
                    <BiLogOut  className='text-2xl' />
                    <h1 className='font-semibold'>Logout</h1>
                </div>
            </div>


        </div >
    )
}

export default Sidebar
