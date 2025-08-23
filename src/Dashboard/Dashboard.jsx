import React from 'react'
import Sidebar from '../Components/Sidebar'
import { FaPen } from "react-icons/fa";
import IshttamProfileCards from '../Components/IshttamProfileCards';
import FindYourIshtam from './FindYourIshtam';
import MatchSuggestions from './MatchSuggestions';
import WhoViewedMyProfile from './WhoViewedMyProfile';


function Dashboard() {


    return (

        <div className='flex'  >
            <Sidebar />
            <div className='flex w-full justify-center py-20' >
                <div className='max-w-[970px] '>
                    <div className='flex flex-col lg:flex-row gap-4 w-full'>
                        {/* Main Profile Summary Card (60% width on desktop) */}
                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] w-full lg:w-[60%]">
                            {/* Header */}
                            <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6 bg-[#E331830F]">
                                <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#540D33]">Profile Summary</h2>
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                    <FaPen className="text-white text-[8px] sm:text-[10px]" />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="white px-4 sm:px-7 py-4 sm:py-7 w-full">
                                <div className="grid grid-cols-3 gap-y-2 sm:gap-y-4 text-xs sm:text-sm">
                                    <div className="font-semibold text-[#540D33]">Religion</div>
                                    <div>:</div>
                                    <div>Hindu</div>

                                    <div className="font-semibold text-[#540D33]">Community</div>
                                    <div>:</div>
                                    <div>Namboothiri (Brahmin)</div>
                                </div>
                            </div>
                        </div>

                        {/* Side Cards (40% width on desktop) */}
                        <div className='flex flex-col gap-4 w-full lg:w-[40%]'>
                            {/* Received Interest Card */}
                            <div className="rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7]">
                                <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6 bg-[#E331830F]">
                                    <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#540D33]">Received Interest</h2>
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                        <FaPen className="text-white text-[8px] sm:text-[10px]" />
                                    </div>
                                </div>
                                <div className="bg-white px-4 sm:px-7 py-4 sm:py-4">
                                    <div className="text-center text-[38px] font-semibold text-[#540D33]">10 +</div>
                                </div>
                            </div>

                            {/* Sent Requests Card */}
                            <div className="rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7]">
                                <div className="flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6 bg-[#E331830F]">
                                    <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#540D33]">Sent Requests</h2>
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                        <FaPen className="text-white text-[8px] sm:text-[10px]" />
                                    </div>
                                </div>
                                <div className="bg-white px-4 sm:px-7 py-4 sm:py-4">
                                    <div className="text-center text-[38px] font-semibold text-[#540D33]">100 +</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FindYourIshtam/>
                    <MatchSuggestions/>
                    <WhoViewedMyProfile/>
                </div>
            </div>

        </div>
    )
}

export default Dashboard
