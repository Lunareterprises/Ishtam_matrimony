import React from 'react'
import { RiFacebookFill } from "react-icons/ri";
import { RiGithubLine } from "react-icons/ri";
import { RiTelegram2Line } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { FaFigma } from "react-icons/fa";


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
                            <p className="text-[#b1b1b1a2]">Address: 4521 road xxxxxxx</p>
                            <p className="text-[#b1b1b1a2]">Phone: +881 252 002 892</p>
                            <p className="text-[#b1b1b1a2]">Email: info@example.com</p>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col text-left">
                        <h1 className="text-white font-semibold text-lg">Resources</h1>
                        <div className="pt-4 text-[15px] space-y-1">
                            <p className="text-[#b1b1b1a2]">About Us</p>
                            <p className="text-[#b1b1b1a2]">Contact Us</p>
                            <p className="text-[#b1b1b1a2]">FAQ</p>
                            <p className="text-[#b1b1b1a2]">Guide</p>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col text-left">
                        <h1 className="text-white font-semibold text-lg">Support</h1>
                        <div className="pt-4 text-[15px] space-y-1">
                            <p className="text-[#b1b1b1a2]">Help Center</p>
                            <p className="text-[#b1b1b1a2]">Safety information</p>
                            <p className="text-[#b1b1b1a2]">Cancellation options</p>
                            <p className="text-[#b1b1b1a2]">Our COVID-19 Response</p>
                            <p className="text-[#b1b1b1a2]">FAQs</p>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="flex flex-col text-left">
                        <h1 className="text-white font-semibold text-lg">SOCIAL MEDIA</h1>
                        <div className="pt-4 text-2xl">
                            <div className="flex items-center gap-4">
                                <RiFacebookFill className="text-[#b1b1b1a2]" />
                                <RiGithubLine className="text-[#b1b1b1a2]" />
                                <RiTelegram2Line className="text-[#b1b1b1a2]" />
                                <RiInstagramLine className="text-[#b1b1b1a2]" />
                                <FaFigma className="text-[#b1b1b1a2]" />
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
                    <p>© 2023–2026 ishttamarry.com</p>
                </div>
            </div>


        </>
    )
}

export default Footer
