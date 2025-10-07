import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import IshtamMarry_Logo from '../assets/Frame 1000008772.png'
import Swal from 'sweetalert2';

function DashboardNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()
    const handleLogout = async (e) => {
        e.preventDefault()
        setMenuOpen(false)
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

    return (
        <>
            {/* Navbar */}
            <div className="lg:hidden fixed inset-x-0 top-0 z-[9999] h-20 flex items-center justify-between p-6 shadow-sm bg-white">

                <div onClick={() => setMenuOpen(!menuOpen)} >
                    {menuOpen ? (
                        <RxCross2 className="text-3xl text-[#E33183]" />
                    ) : (
                        <HiMiniBars3BottomRight className="text-3xl text-[#E33183]" />
                    )}
                </div>

                <img className='w-[160px]' src={IshtamMarry_Logo} alt="Logo" />
            </div>

            {/* Dropdown Menu (Below Navbar) */}
            <div
                className={`fixed top-0 left-0 w-full z-[9998] bg-[#E33183] text-white transition-all duration-300 ease-in-out overflow-hidden lg:hidden ${menuOpen ? 'max-h-[550px] pt-30 pb-20 px-6' : 'max-h-0 px-6'
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
                        to="/inbox"
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>Inbox</li>
                    </Link>

                    <Link
                        to="/subscription"
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>Subscription</li>
                    </Link>
                    <Link
                        to='/shortlisted'
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>Shortlisted</li>
                    </Link>
                    <Link
                        to="/profile-vists"
                        onClick={() => setMenuOpen(false)}
                        className="hover:underline hover:underline-offset-4 hover:decoration-white transition-all"
                    >
                        <li>Profile Visits</li>
                    </Link>
                    <Link
                        onClick={handleLogout}

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
