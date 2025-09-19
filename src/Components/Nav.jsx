import React, { useState } from 'react';
import IshtamMarry_Logo from '../assets/Frame 1000008772.png';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import Login from '../Components/Login';
import LoginWithOtp from './LoginWithOtp';
import Registration from './Registration';
import VerifyOtp from './VerifyOtp';
import ForgotPassword from '../Components/ForgotPassword';


function Nav() {

    const [showSidebar, setShowSidebar] = useState(false);

    //for login
    const [showLogin, setShowLogin] = useState(false);
    const [showLoginWithOtp, setShowLoginWithOtp] = useState(false);
    const [showEnterOtp, setShowEnterOtp] = useState(false);
    const [showVerifyOtp, setShowVerifyOtp] = useState(false);
    const [emailToVerify, setEmailToVerify] = useState("");

    //for Registration
    const [showRegistration, setShowRegistration] = useState(false)

    //for forgot password
    const [showForgotPassword, setShowForgotPassword] = useState(false);

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
                        <li className="cursor-pointer">Home</li>
                        <li className="cursor-pointer">About us</li>
                        <li className="cursor-pointer">FAQ</li>
                        <li className="cursor-pointer">Guide</li>
                        <li className="cursor-pointer">Contact</li>
                    </ul>

                    {/* Buttons - Hidden on small screens */}
                    <div className="hidden sm:flex gap-5">
                        <button onClick={() => setShowRegistration(true)} className="w-[150px]  h-[36px] sm:h-[40px] bg-[#E33183] text-white rounded-full font-medium hover:bg-pink-700">
                            Registration
                        </button>
                        <button onClick={() => setShowLogin(true)} className="w-[90px]  h-[36px] sm:h-[40px] border border-[#E33183] text-[#E33183] rounded-full font-medium hover:bg-pink-50">
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
                    <ul className="flex flex-col items-center gap-4 font-medium text-gray-700 pt-25">
                        <li>Home</li>
                        <li>About us</li>
                        <li>FAQ</li>
                        <li>Guide</li>
                        <li>Contact</li>
                        <div className="sm:hidden flex flex-col gap-4 items-center mt-6">
                            <button onClick={() => setShowRegistration(true)} className="w-[150px] h-[39px] bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700">
                                Registration
                            </button>
                            <button onClick={() => setShowLogin(true)} className="w-[150px] h-[39px] border border-pink-600 text-pink-600 rounded-full font-medium hover:bg-pink-50">
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
