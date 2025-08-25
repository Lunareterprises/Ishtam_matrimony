import React, { useState } from 'react'
import IshtamMarry_Logo from '../assets/Frame 1000008772.png'
import DoubleHearts from '../assets/DoubleHearts.png'
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { BsEnvelopeArrowDown } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

function Sidebar() {
  const [toggleMyIshtam, setToggleMyIshtam] = useState(false);
  const [toggleMatches, setToggleMatches] = useState(false);

  return (
    <div className='bg-white h-screen flex flex-col gap-3 w-[220px] sm:w-[240px] 
                    fixed top-0 left-0 shadow-sm border-r border-gray-200
                    overflow-y-auto z-30'>
      
      {/* Logo */}
      <div className='py-5'>
        <div className='flex justify-center w-full h-auto'>
          <img className='w-[60%]' src={IshtamMarry_Logo} alt="Logo" />
        </div>
      </div>

      {/* My Ishtam */}
      <div
        onClick={() => setToggleMyIshtam(prev => !prev)}
        className='flex justify-between px-6 py-2 items-center cursor-pointer hover:bg-pink-50 duration-200'
      >
        <div className='flex items-center gap-2'>
          <img src={DoubleHearts} alt="icon" />
          <h1 className='font-semibold'>My Ishtam</h1>
        </div>
        {toggleMyIshtam ? <FaCaretUp /> : <FaCaretDown />}
      </div>

      {toggleMyIshtam && (
        <div className="transition-all duration-300 text-sm">
          <Link to="/dashboard" className='block py-2 pl-12 hover:bg-[#e3318455] duration-300'>
            Dashboard
          </Link>
          <Link to="/myProfile" className='block py-2 pl-12 hover:bg-[#e3318455] duration-300'>
            My Profile
          </Link>
        </div>
      )}

      {/* Matches */}
      <div
        onClick={() => setToggleMatches(prev => !prev)}
        className='flex justify-between px-6 py-2 items-center cursor-pointer hover:bg-pink-50 duration-200'
      >
        <div className='flex items-center gap-3'>
          <IoPeopleSharp className='text-xl' />
          <h1 className='font-semibold'>Matches</h1>
        </div>
        {toggleMatches ? <FaCaretUp /> : <FaCaretDown />}
      </div>

      {toggleMatches && (
        <div className="transition-all duration-300 text-sm">
          <Link to="/todays-match" className='block py-2 pl-12 hover:bg-[#e3318455] duration-300'>
            Todays Match
          </Link>
          <Link to="/my-match" className='block py-2 pl-12 hover:bg-[#e3318455] duration-300'>
            My Match (12)
          </Link>
          <Link to="/more-matches" className='block py-2 pl-12 hover:bg-[#e3318455] duration-300'>
            More Matches
          </Link>
        </div>
      )}

      {/* Inbox */}
      <div className='flex px-6 py-2 items-center gap-3 cursor-pointer hover:bg-pink-50 duration-200'>
        <BsEnvelopeArrowDown className='text-xl' />
        <h1 className='font-semibold'>Inbox</h1>
      </div>

      {/* Subscription */}
      <div className='flex px-6 py-2 items-center gap-3 cursor-pointer hover:bg-pink-50 duration-200'>
        <MdOutlineWorkspacePremium className='text-xl' />
        <h1 className='font-semibold'>Subscription</h1>
      </div>

      {/* Logout */}
      <div className='flex px-6 py-2 items-center gap-3 cursor-pointer hover:bg-pink-50 duration-200'>
        <BiLogOut className='text-xl' />
        <h1 className='font-semibold'>Logout</h1>
      </div>
    </div>
  )
}

export default Sidebar
