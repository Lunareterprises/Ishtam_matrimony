import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import IshtamMarry_Logo from '../assets/Frame 1000008772.png'

function DashboardNav() {
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <>
            {/* Navbar */}
            <div className="lg:hidden fixed inset-x-0 top-0 z-[9999] h-20 flex items-center justify-between p-6 shadow-sm bg-white">

                <div onClick={() => setMenuOpen(!menuOpen)} >
                    {menuOpen ? (
                        <RxCross2 className="text-3xl text-pink-600" />
                    ) : (
                        <HiMiniBars3BottomRight className="text-3xl text-pink-600" />
                    )}
                </div>

                <img className='w-[160px]' src={IshtamMarry_Logo} alt="Logo" />
            </div>

            {/* Dropdown Menu (Below Navbar) */}
            <div
                className={`fixed top-0 left-0 w-full z-[9998] bg-[#E33183] text-white transition-all duration-300 ease-in-out overflow-hidden lg:hidden ${menuOpen ? 'max-h-[470px] pt-30 pb-20 px-6' : 'max-h-0 px-6'
                    }`}
            >
                <ul className="flex flex-col items-center gap-4 font-semibold">
                    <Link
                        to="/dashboard"
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>Dashboard</li>
                    </Link>
                    <Link
                        to="/myProfile"
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>My Profile</li>
                    </Link>
                    <Link
                        to="/todaysMatch"
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>Todays Match</li>
                    </Link>
                    <Link
                        to="/myMatch"
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>My Match</li>
                    </Link>
                    <Link
                        to="/moreMatch"
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>More Matches</li>
                    </Link>
                    <Link

                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>Inbox</li>
                    </Link>

                    <Link

                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>Subscription</li>
                    </Link>
                    <Link

                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>Logout</li>
                    </Link>
                </ul>
            </div>
        </>

    )
}

export default DashboardNav
