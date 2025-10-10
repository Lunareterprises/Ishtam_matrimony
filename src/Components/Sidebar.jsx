import React, { useState } from 'react'
import IshtamMarry_Logo from '../assets/Frame 1000008772.png'
import DoubleHearts from '../assets/DoubleHearts.png'
import { FaCaretUp, FaCaretDown, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { BsEnvelopeArrowDown } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Swal from 'sweetalert2';

function Sidebar() {
  const [toggleMyIshtam, setToggleMyIshtam] = useState(false);
  const [toggleMatches, setToggleMatches] = useState(false);
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()

    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token")
        navigate('/')
      }
    });
  }
  
  const HeaderCss = `hover:text-pink-600 font-semibold`
  const headerIcon = `hover:text-pink-600 font-semibold text-xl`

  return (
    <div className='hidden lg:flex bg-white h-screen  flex-col gap-3 w-[220px] sm:w-[240px] 
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
          <h1 className={`${HeaderCss}`}>My Ishtam</h1>
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
          <h1 className={`${HeaderCss}`}>Matches</h1>
        </div>
        {toggleMatches ? <FaCaretUp /> : <FaCaretDown />}
      </div>

      {toggleMatches && (
        <div className="transition-all duration-300 text-sm">
          <Link to="/todaysMatch" className='block py-2 pl-12 hover:bg-[#e3318455] duration-300'>
            Todays Match
          </Link>
          <Link to="/myMatch" className='block py-2 pl-12 hover:bg-[#e3318455] duration-300'>
            My Match
          </Link>
          <Link to="/moreMatch" className='block py-2 pl-12 hover:bg-[#e3318455] duration-300'>
            More Matches
          </Link>
        </div>
      )}

      {/* Inbox */}
      <Link to="/inbox" >
        <div className='flex px-6 py-2 items-center gap-3 cursor-pointer hover:bg-pink-50 duration-200'>
          <BsEnvelopeArrowDown className='text-xl' />
          <h1 className={`${HeaderCss}`}>Inbox</h1>
        </div>
      </Link>


      {/* Subscription */}
      <Link to="/subscription" >
        <div className='flex px-6 py-2 items-center gap-3 cursor-pointer hover:bg-pink-50 duration-200'>
          <MdOutlineWorkspacePremium className='text-xl' />
          <h1 className={`${HeaderCss}`}>Subscription</h1>
        </div>
      </Link>
      
      <Link to='/shortlisted' >
        <div className='flex px-6 py-2 items-center gap-3 cursor-pointer hover:bg-pink-50 duration-200'>
          <FaRegHeart className='text-[18px]' />
          <h1 className={`${HeaderCss}`}>Shortlisted</h1>
        </div>
      </Link>


      {/* Profile visits */}
      <Link to="/profile-vists"  >
        <div className='flex px-6 py-2 items-center gap-3 cursor-pointer hover:bg-pink-50 duration-200'>
          <FaEye className='text-xl' />
          <h1 className={`${HeaderCss}`}>Profile Visits</h1>
        </div>
      </Link>

      {/* Logout */}
      <div onClick={handleLogout} className='flex px-6 py-2 items-center gap-3 cursor-pointer hover:bg-pink-50 duration-200 '>
        <BiLogOut className='text-xl' />
        <h1 className={`${HeaderCss}`} >Logout</h1>
      </div>

    </div>
  )
}

export default Sidebar
