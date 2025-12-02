import React from 'react'
import { RiFacebookFill } from "react-icons/ri";
import { RiGithubLine } from "react-icons/ri";
import { RiTelegram2Line } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { FaFigma } from "react-icons/fa";
import { HashLink } from 'react-router-hash-link';


function Footer() {
    return (
        <>
            <div className="bg-[#530F29] w-full px-6 py-12">
                {/* Upper Footer */}
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12">
                    {/* Contact Info */}
                    <div className="flex flex-col text-left">
                        <h1 className="text-white font-semibold text-lg">GET IN TOUCH</h1>
                        <div className="pt-4 text-[15px] space-y-1">
                            <p className="text-[#b1b1b1a2]">Address : 
                                Ishtam Matrimony Moonnampadi,<br/>  Malappuram - 676 505</p>
                            <p className="text-[#b1b1b1a2]">Phone : +91 85938 37000</p>
                            <p className="text-[#b1b1b1a2]">Email : info@example.com</p>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col text-left">
                        <h1 className="text-white font-semibold text-lg">Quick Links</h1>
                        <div className="pt-4 text-[15px] space-y-1 flex flex-col">
                            {/*  <p className="text-[#b1b1b1a2]">About Us</p>
                            <p className="text-[#b1b1b1a2]">Contact Us</p>
                            <p className="text-[#b1b1b1a2]">FAQ</p>
                            <p className="text-[#b1b1b1a2]">Guide</p> */}
                            <HashLink smooth to="/#home" className="cursor-pointer hover:text-[#E33183] text-[#b1b1b1a2] transition-all">Home</HashLink>
                            <HashLink smooth to="/#aboutUs" className="cursor-pointer hover:text-[#E33183] text-[#b1b1b1a2] transition-all">About us</HashLink>
                            <HashLink smooth to="/#FAQ" className="cursor-pointer hover:text-[#E33183]  text-[#b1b1b1a2] transition-all">FAQ</HashLink>
                            <HashLink smooth to="/#ourProcess" className="cursor-pointer hover:text-[#E33183] text-[#b1b1b1a2] transition-all">Guide</HashLink>
                            <HashLink smooth to="/#contactUs" className="cursor-pointer hover:text-[#E33183] text-[#b1b1b1a2] transition-all">Contact</HashLink>
                        </div>
                    </div>

                    {/* Support */}
                    

                    {/* Social Media */}
                    <div className="flex flex-col text-left">
                        <h1 className="text-white font-semibold text-lg">SOCIAL MEDIA</h1>
                        <div className="pt-4 text-2xl">
                            <div className="flex items-center gap-4">
                                <RiFacebookFill className="text-[#b1b1b1a2] hover:text-[#E33183] " />
                                <RiGithubLine className="text-[#b1b1b1a2] hover:text-[#E33183] " />
                                <RiTelegram2Line className="text-[#b1b1b1a2] hover:text-[#E33183] " />
                                <RiInstagramLine className="text-[#b1b1b1a2] hover:text-[#E33183] " />

                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/20 my-8"></div>

                {/* Bottom Footer */}
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between text-[#b1b1b1a2] text-[13px] font-light">
                    <div className="flex flex-wrap gap-4">
                        <p>Privacy Policy</p>
                        <p>Terms of Use</p>
                        <p>Sales and Refunds</p>
                        <p>Legal</p>
                        <p>Site Map</p>
                    </div>
                    <p>© 2023–2026 ishtamarry.com</p>
                </div>
            </div>


        </>
    )
}

export default Footer
