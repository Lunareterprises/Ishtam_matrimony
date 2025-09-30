import React, { useState } from 'react';
import IshtamMarry_Logo from '../assets/Frame 1000008772.png';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import Login from '../Components/Login';
import LoginWithOtp from './LoginWithOtp';
import Registration from './Registration';
import VerifyOtp from './VerifyOtp';
import ForgotPassword from '../Components/ForgotPassword';
import { Link } from 'react-scroll';
import { HashLink } from 'react-router-hash-link';


function Nav() {

    const [showSidebar, setShowSidebar] = useState(false);

    //for login
    const [showLogin, setShowLogin] = useState(false);
    const [showLoginWithOtp, setShowLoginWithOtp] = useState(false);
    const [showEnterOtp, setShowEnterOtp] = useState(false);
    const [showVerifyOtp, setShowVerifyOtp] = useState(false);
    const [emailToVerify, setEmailToVerify] = useState("");
    const closeMenu = () => setShowSidebar(false);
    //for Registration
    const [showRegistration, setShowRegistration] = useState(false)

    //for forgot password
    const [showForgotPassword, setShowForgotPassword] = useState(false);


    const openLoginForm = () => {
        setShowRegistration(false)
        setShowLogin(true)
        setShowSidebar(false)

    }

    const openRegistrationForm = () => {
        setShowLogin(false)
        setShowRegistration(true)
        setShowSidebar(false)
    }


    return (
        <>
            <nav className="fixed inset-0 z-[9999] bg-white h-[80px] flex items-center justify-center shadow ">
                <div className="w-[90%] flex items-center justify-between">
                    {/* Logo */}
                    <img
                        src={IshtamMarry_Logo}
                        alt="logo"
                        className="w-[160px] sm:w-[200px] h-auto"
                    />

                    {/* Desktop Nav */}
                    <ul className="hidden lg:flex gap-10 font-medium text-gray-700">
                        <HashLink smooth scroll={el => {
                            const yOffset = -80;
                            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                        }}
                            to='/#home' duration={500} className="cursor-pointer hover:text-[#E33183] transition-all">Home</HashLink>

                        <HashLink smooth scroll={el => {
                            const yOffset = -80;
                            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                        }} to="/#aboutUs" className="cursor-pointer hover:text-[#E33183] transition-all">About us</HashLink>


                        <Link to='' className="cursor-pointer hover:text-[#E33183] transition-all">FAQ</Link>

                        <HashLink
                            smooth scroll={el => {
                                const yOffset = -80;
                                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }}
                            to='/#ourProcess' className="cursor-pointer hover:text-[#E33183] transition-all">Guide</HashLink>


                        <HashLink smooth
                            scroll={el => {
                                const yOffset = -80;
                                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }}
                            to='/#contactUs' className="cursor-pointer hover:text-[#E33183] transition-all">Contact</HashLink>
                    </ul>

                    {/* Buttons - Hidden on small screens */}
                    <div className="hidden sm:flex gap-5">
                        <button onClick={openRegistrationForm} className="w-[150px]  h-[36px] sm:h-[40px] bg-[#E33183] text-white rounded-full font-medium hover:bg-pink-700">
                            Registration
                        </button>
                        <button onClick={openLoginForm} className="w-[90px]  h-[36px] sm:h-[40px] border border-[#E33183] text-[#E33183] rounded-full font-medium hover:bg-pink-50">
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
                <div className="bg-white w-full shadow-lg xl:hidden h-[470px]  fixed inset-0 z-[50] ">
                    <ul className="flex flex-col items-center gap-4 font-medium text-gray-700 pt-25 cursor-pointer"   >
                        <HashLink smooth scroll={el => {
                            const yOffset = -80;
                            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                        }}
                        onClick={closeMenu}
                            to='/#home' duration={500} className="cursor-pointer hover:text-[#E33183] transition-all" >Home</HashLink>

                        <HashLink smooth scroll={el => {
                            const yOffset = -80;
                            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                        }} 
                        onClick={closeMenu}
                        to="/#aboutUs" className="cursor-pointer hover:text-[#E33183] transition-all">About us</HashLink>


                        <Link to='' className="cursor-pointer hover:text-[#E33183] transition-all">FAQ</Link>

                        <HashLink
                            smooth scroll={el => {
                                const yOffset = -80;
                                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }}
                            onClick={closeMenu}
                            to='/#ourProcess' className="cursor-pointer hover:text-[#E33183] transition-all">Guide</HashLink>


                        <HashLink smooth
                            scroll={el => {
                                const yOffset = -80;
                                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }}
                            onClick={closeMenu}
                            to='/#contactUs' className="cursor-pointer hover:text-[#E33183] transition-all">Contact</HashLink>
                       
                        <div className="sm:hidden flex flex-col gap-4 items-center mt-6">
                            <button onClick={openRegistrationForm} className="w-[150px] h-[39px] bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700">
                                Registration
                            </button>
                            <button onClick={openLoginForm} className="w-[150px] h-[39px] border border-pink-600 text-pink-600 rounded-full font-medium hover:bg-pink-50">
                                Sign In
                            </button>
                        </div>
                    </ul>

                </div>
            )}

            {showRegistration && (
                <Registration
                    onClose={() => setShowRegistration(false)}
                    onSuccess={(email) => {
                        setEmailToVerify(email);
                        setShowRegistration(false);
                        setShowVerifyOtp(true);
                    }}
                />
            )}

            {showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                    onOtpLogin={() => {
                        setShowLogin(false);
                        setShowLoginWithOtp(true);
                    }}
                    onForgotPassword={() => {
                        setShowLogin(false);
                        setShowForgotPassword(true);
                    }}
                    openRegistrationModal={() => setShowRegistration(true)}
                />
            )}

            {showForgotPassword && (
                <ForgotPassword onClose={() => setShowForgotPassword(false)}
                    onSuccess={() => setShowLogin(true)}
                />
            )}


            {showLoginWithOtp && (
                <LoginWithOtp
                    onClose={() => setShowLoginWithOtp(false)}
                    onSendOtp={() => {
                        setShowLoginWithOtp(false);
                        setShowEnterOtp(true);
                    }}
                />
            )}

            {showVerifyOtp && (
                <VerifyOtp
                    onClose={() => setShowVerifyOtp(false)}
                    email={emailToVerify}
                    onVerified={() => {
                        setShowVerifyOtp(false); // close VerifyOtp
                        setShowLogin(true);      // open Login modal
                    }}
                />
            )}




        </>
    )
}

export default Nav
