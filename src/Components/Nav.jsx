// Nav.jsx (fixed)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IshtamMarry_Logo from '../assets/Frame 1000008772.png';
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

import Login from '../Components/Login';
import LoginWithOtp from './LoginWithOtp';
import Registration from './Registration';
import VerifyOtp from './VerifyOtp';
import ForgotPassword from '../Components/ForgotPassword';
import { HashLink } from 'react-router-hash-link';

function Nav() {
    const navigate = useNavigate();

    const [activeModal, setActiveModal] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [emailToVerify, setEmailToVerify] = useState("");

    const openLoginForm = () => {
        const token = sessionStorage.getItem("token");
        if (token) navigate("/dashboard");
        else {
            setActiveModal("login");
            setShowSidebar(false);
        }
    };

    const openRegistrationForm = () => {
        setActiveModal("registration");
        setShowSidebar(false);
    };

    return (
        <>
            {/* NAVBAR: make it top-only (not full-screen) */}
            <nav className="fixed inset-x-0 top-0 z-[9999] bg-white h-[80px] flex items-center justify-center shadow">
                <div className="w-[90%] flex items-center justify-between">
                    {/* Logo */}
                    <img src={IshtamMarry_Logo} alt="logo" className="w-[160px] sm:w-[200px] h-auto" />

                    {/* Desktop Nav */}
                    <ul className="hidden lg:flex gap-10 font-medium text-gray-700">
                        <HashLink smooth to="/#home" className="cursor-pointer hover:text-[#E33183] transition-all">Home</HashLink>
                        <HashLink smooth to="/#aboutUs" className="cursor-pointer hover:text-[#E33183] transition-all">About us</HashLink>
                        <HashLink smooth to="/#FAQ" className="cursor-pointer hover:text-[#E33183] transition-all">FAQ</HashLink>
                        <HashLink smooth to="/#ourProcess" className="cursor-pointer hover:text-[#E33183] transition-all">Guide</HashLink>
                        <HashLink smooth to="/#contactUs" className="cursor-pointer hover:text-[#E33183] transition-all">Contact</HashLink>
                    </ul>

                    {/* Buttons - Hidden on small screens */}
                    <div className="hidden sm:flex gap-5">
                        <button onClick={openRegistrationForm} className="w-[150px] h-[36px] sm:h-[40px] bg-[#E33183] text-white rounded-full font-medium hover:bg-pink-700">
                            Registration
                        </button>
                        <button onClick={openLoginForm} className="w-[90px] h-[36px] sm:h-[40px] border border-[#E33183] text-[#E33183] rounded-full font-medium hover:bg-pink-50">
                            Sign In
                        </button>
                    </div>

                    {/* Hamburger icon (mobile) */}
                    <div className="block lg:hidden" onClick={() => setShowSidebar(prev => !prev)}>
                        {showSidebar ? <RxCross2 className="text-3xl text-pink-600" /> : <HiMiniBars3BottomRight className="text-3xl text-pink-600" />}
                    </div>
                </div>
            </nav>

            {/* MOBILE DROPDOWN: always mounted, toggle height + opacity for smooth animation */}
            <div
                className={`fixed left-0 right-0 top-[80px] z-[9998] bg-white shadow-lg xl:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${showSidebar ? 'max-h-[470px] opacity-100' : 'max-h-0 opacity-0'}
        `}
            >
                <ul className="flex flex-col items-center gap-4 font-medium text-gray-700 py-15">
                    <HashLink smooth scroll={el => {
                        const yOffset = -80;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }} to="/#home" onClick={() => setShowSidebar(false)} className="cursor-pointer hover:text-[#E33183] transition-all">Home</HashLink>
                    <HashLink scroll={el => {
                        const yOffset = -80;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }} smooth to="/#aboutUs" onClick={() => setShowSidebar(false)} className="cursor-pointer hover:text-[#E33183] transition-all">About us</HashLink>
                    <HashLink scroll={el => {
                        const yOffset = -80;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }} smooth to="/#FAQ" onClick={() => setShowSidebar(false)} className="cursor-pointer hover:text-[#E33183] transition-all">FAQ</HashLink>
                    <HashLink scroll={el => {
                        const yOffset = -80;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }} smooth to="/#ourProcess" onClick={() => setShowSidebar(false)} className="cursor-pointer hover:text-[#E33183] transition-all">Guide</HashLink>
                    <HashLink scroll={el => {
                        const yOffset = -80;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }} smooth to="/#contactUs" onClick={() => setShowSidebar(false)} className="cursor-pointer hover:text-[#E33183] transition-all">Contact</HashLink>

                    <div className="sm:hidden flex flex-col gap-4 items-center mt-6">
                        <button onClick={() => { setActiveModal("registration"); setShowSidebar(false); }} className="w-[150px] h-[39px] bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700">
                            Registration
                        </button>
                        <button onClick={() => { setActiveModal("login"); setShowSidebar(false); }} className="w-[150px] h-[39px] border border-pink-600 text-pink-600 rounded-full font-medium hover:bg-pink-50">
                            Sign In
                        </button>
                    </div>
                </ul>
            </div>

            {/* Modals - only ONE can show at a time because we check activeModal */}
            {activeModal === "registration" && (
                <Registration onClose={() => setActiveModal(null)} onSuccess={(email) => { setEmailToVerify(email); setActiveModal("verify"); }} />
            )}

            {activeModal === "login" && (
                <Login onClose={() => setActiveModal(null)} onOtpLogin={() => setActiveModal("loginWithOtp")} onForgotPassword={() => setActiveModal("forgot")} openRegistrationModal={() => setActiveModal("registration")} />
            )}

            {activeModal === "forgot" && <ForgotPassword onClose={() => setActiveModal(null)} onSuccess={() => setActiveModal("login")} />}

            {activeModal === "loginWithOtp" && <LoginWithOtp onClose={() => setActiveModal(null)} onSendOtp={() => setActiveModal("enterOtp")} />}

            {(activeModal === "enterOtp" || activeModal === "verify") && (
                <VerifyOtp onClose={() => setActiveModal(null)} email={emailToVerify} onVerified={() => { setActiveModal("login"); }} />
            )}
        </>
    );
}

export default Nav;
