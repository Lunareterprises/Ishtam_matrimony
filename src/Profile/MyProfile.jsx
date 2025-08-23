import React from 'react'
import Sidebar from '../Components/Sidebar'
import { FaPen } from "react-icons/fa";

function MyProfile() {
    return (
        <div className='flex '>
            <Sidebar />
            <div className='flex w-full justify-center py-20'>

                <div className='w-[700px]' >

                    <div class="flex justify-start my-2 w-full">
                        <div class="relative w-full max-w-[120px] md:max-w-[150px] aspect-square">
                      
                            <svg class="w-full h-full absolute" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" fill="#E6F2FF" stroke="#E6F2FF" stroke-width="8" />
                            </svg>

                         
                            <svg class="w-full h-full absolute" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#F0F0F0" stroke-width="8" />
                            </svg>

                         
                            <svg class="w-full h-full absolute rotate-[-90deg]" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#4094F7" stroke-width="8"
                                    stroke-dasharray="339.292" stroke-dashoffset="186.611" />
                            </svg>

                            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <span class="text-xl md:text-2xl font-bold text-[#4094F7]">45%</span>
                            </div>
                        </div>
                    </div>

                    <div className=' flex flex-col  text-left pt-[50px]' >
                        <h1 className='text-[28px] font-bold'  >WELCOME, CALVIN..!</h1>
                        <p className=' font-semibold' >Your profile is 45% completed, Let’s finish setting up your <br /> profile so we can show it to more matches..!</p>
                    </div>

                    <div className='flex flex-col gap-10 pt-[50px] justify-center' >
                        <div className='bg-[#F5F5F5] flex items-center h-40 w-full rounded-xl '>
                            <div className='flex justify-between w-full items-center  p-5' >
                                <div className='flex items-center gap-4' >
                                    <div className='w-20 h-20 rounded-full bg-[#D9D9D9]' >
                                    </div>
                                    <div className='flex flex-col items-center text-[#540D33]' >
                                        <h1 className='font-semibold' >Calvin Sunny</h1>
                                        <h1 className='font-extralight' >ID : ITM 1001</h1>
                                    </div>
                                </div>

                                <button className='bg-[#E33183] py-2 px-10 rounded-full text-white font-medium ' >
                                    Subscription
                                </button>

                            </div>

                        </div>

                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-6 bg-white">
                                <h2 className="text-lg font-bold text-[#540D33]">BASIC INFO</h2>
                                <div className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                    <FaPen className="text-white text-[10px]" />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-[#F5F5F5] px-7 py-7">
                                <div className="grid grid-cols-3 gap-y-4 text-sm ">
                                    <div className="font-semibold text-[#540D33]">Created by</div>
                                    <div>:</div>
                                    <div>Self</div>

                                    <div className="font-semibold text-[#540D33]">Gender</div>
                                    <div>:</div>
                                    <div>Male</div>

                                    <div className="font-semibold text-[#540D33]">First Name</div>
                                    <div>:</div>
                                    <div>Calvin</div>

                                    <div className="font-semibold text-[#540D33]">Last Name</div>
                                    <div>:</div>
                                    <div>Sunny</div>

                                    <div className="font-semibold text-[#540D33]">DOB</div>
                                    <div>:</div>
                                    <div>16/08/1998</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-6 bg-white">
                                <h2 className="text-lg font-bold text-[#540D33]">RELIGION BACKGROUND</h2>
                                <div className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                    <FaPen className="text-white text-[10px]" />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-[#F5F5F5] px-7 py-7">
                                <div className="grid grid-cols-3 gap-y-4 text-sm ">
                                    <div className="font-semibold text-[#540D33]">Religion</div>
                                    <div>:</div>
                                    <div>Hindu</div>

                                    <div className="font-semibold text-[#540D33]">Community</div>
                                    <div>:</div>
                                    <div>Namboothiri (Brahmin)</div>

                                </div>
                            </div>
                        </div>


                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-6 bg-white">
                                <h2 className="text-lg font-bold text-[#540D33]">FAMILY INFO</h2>
                                <div className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                    <FaPen className="text-white text-[10px]" />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-[#F5F5F5] px-7 py-7">
                                <div className="grid grid-cols-3 gap-y-4 text-sm ">
                                    <div className="font-semibold text-[#540D33]">Father's Details</div>
                                    <div>:</div>
                                    <div>Self</div>

                                    <div className="font-semibold text-[#540D33]">Mother's Details</div>
                                    <div>:</div>
                                    <div>Male</div>

                                    <div className="font-semibold text-[#540D33]">No: of Sisters</div>
                                    <div>:</div>
                                    <div>Calvin</div>

                                    <div className="font-semibold text-[#540D33]">No: of Brothers</div>
                                    <div>:</div>
                                    <div>Sunny</div>

                                    <div className="font-semibold text-[#540D33]">Family Financial Status </div>
                                    <div>:</div>
                                    <div>16/08/1998</div>
                                </div>
                            </div>
                        </div>


                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-6 bg-white">
                                <h2 className="text-lg font-bold text-[#540D33]">LOCATION, EDUCATION & CAREER</h2>
                                <div className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                    <FaPen className="text-white text-[10px]" />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-[#F5F5F5] px-7 py-7">
                                <div className="grid grid-cols-3 gap-y-4 text-sm ">
                                    <div className="font-semibold text-[#540D33]">Country Living in</div>
                                    <div>:</div>
                                    <div>Self</div>

                                    <div className="font-semibold text-[#540D33]">State Living In</div>
                                    <div>:</div>
                                    <div>Male</div>

                                    <div className="font-semibold text-[#540D33]">City Living In</div>
                                    <div>:</div>
                                    <div>Calvin</div>

                                    <div className="font-semibold text-[#540D33]">Zip/Pin code</div>
                                    <div>:</div>
                                    <div>Sunny</div>

                                    <div className="font-semibold text-[#540D33]">Highest Qualification</div>
                                    <div>:</div>
                                    <div>16/08/1998</div>


                                    <div className="font-semibold text-[#540D33]">College Attended</div>
                                    <div>:</div>
                                    <div>Sunny</div>

                                    <div className="font-semibold text-[#540D33]">Working With</div>
                                    <div>:</div>
                                    <div>16/08/1998</div>

                                    <div className="font-semibold text-[#540D33]">Working As</div>
                                    <div>:</div>
                                    <div>Calvin</div>

                                    <div className="font-semibold text-[#540D33]">Employer Name</div>
                                    <div>:</div>
                                    <div>Calvin</div>
                                    <div className="font-semibold text-[#540D33]">Annual Income</div>
                                    <div>:</div>
                                    <div>Calvin</div>
                                </div>
                                <div className='flex justify-center pt-10' >

                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="form-checkbox h-5 w-5 " />
                                        <span className="text-sm text-[#540D33]">Keep this private</span>
                                    </label>


                                </div>
                            </div>
                        </div>


                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-6 bg-white">
                                <h2 className="text-lg font-bold text-[#540D33]">MORE ABOUT MYSELF</h2>
                                <div className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                    <FaPen className="text-white text-[10px]" />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-[#F5F5F5] px-7 py-7">
                                <div className="grid grid-cols-3 gap-y-4 text-sm ">
                                    <div className="font-semibold text-[#540D33]">Diet</div>
                                    <div>:</div>
                                    <div>Self</div>
                                </div>
                            </div>
                        </div>


                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                            {/* Header */}
                            <div className="flex  justify-center px-6 py-6 bg-white">
                                <h2 className="text-3xl font-bold text-[#540D33]">PARTNER PREFERENCE</h2>

                            </div>

                            {/* Body */}
                            <div className="bg-[#F5F5F5] h-30 px-7 py-7">


                            </div>
                        </div>



                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-6 bg-white">
                                <h2 className="text-lg font-bold text-[#540D33]">PARTNER BASIC INFO</h2>
                                <div className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                    <FaPen className="text-white text-[10px]" />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-[#F5F5F5] px-7 py-7">
                                <div className="grid grid-cols-3 gap-y-4 text-sm ">
                                    <div className="font-semibold text-[#540D33]">Age</div>
                                    <div>:</div>
                                    <div>Self</div>

                                    <div className="font-semibold text-[#540D33]">Height</div>
                                    <div>:</div>
                                    <div>Male</div>

                                    <div className="font-semibold text-[#540D33]">Marital Status</div>
                                    <div>:</div>
                                    <div>Calvin</div>

                                    <div className="font-semibold text-[#540D33]">Religion/Community</div>
                                    <div>:</div>
                                    <div>Sunny</div>

                                    <div className="font-semibold text-[#540D33]">Mother Tongue</div>
                                    <div>:</div>
                                    <div>16/08/1998</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-6 bg-white">
                                <h2 className="text-lg font-bold text-[#540D33]">PARTNER LOCATION DETAILS</h2>
                                <div className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                    <FaPen className="text-white text-[10px]" />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-[#F5F5F5] px-7 py-7">
                                <div className="grid grid-cols-3 gap-y-4 text-sm ">
                                    <div className="font-semibold text-[#540D33]">Country Living In</div>
                                    <div>:</div>
                                    <div>Self</div>

                                    <div className="font-semibold text-[#540D33]">State Living In :</div>
                                    <div>:</div>
                                    <div>Male</div>

                                    <div className="font-semibold text-[#540D33]">City/District In</div>
                                    <div>:</div>
                                    <div>Calvin</div>
                                </div>
                            </div>


                        </div>
                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-6 bg-white">
                                <h2 className="text-lg font-bold text-[#540D33]">PARTNER EDUCATION & CAREER</h2>
                                <div className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                    <FaPen className="text-white text-[10px]" />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-[#F5F5F5] px-7 py-7">
                                <div className="grid grid-cols-3 gap-y-4 text-sm ">
                                    <div className="font-semibold text-[#540D33]">Qualification</div>
                                    <div>:</div>
                                    <div>Self</div>

                                    <div className="font-semibold text-[#540D33]">Working with</div>
                                    <div>:</div>
                                    <div>Male</div>

                                    <div className="font-semibold text-[#540D33]">Profession Area</div>
                                    <div>:</div>
                                    <div>Calvin</div>
                                    <div className="font-semibold text-[#540D33]">Working As</div>
                                    <div>:</div>
                                    <div>Male</div>

                                    <div className="font-semibold text-[#540D33]">Annual Income</div>
                                    <div>:</div>
                                    <div>Calvin</div>
                                </div>
                            </div>
                        </div>


                        <div className="bg-white rounded-xl overflow-hidden border-[0.4px] border-[#E4E4E7] ">
                            {/* Header */}
                            <div className="flex justify-between items-center px-6 py-6 bg-white">
                                <h2 className="text-lg font-bold text-[#540D33]">PARTNER OTHER DETAILS</h2>
                                <div className="w-8 h-8 rounded-full bg-[#540D33] flex items-center justify-center cursor-pointer">
                                    <FaPen className="text-white text-[10px]" />
                                </div>
                            </div>

                            {/* Body */}
                            <div className="bg-[#F5F5F5] px-7 py-7">
                                <div className="grid grid-cols-3 gap-y-4 text-sm ">
                                    <div className="font-semibold text-[#540D33]">Profile Managed by</div>
                                    <div>:</div>
                                    <div>Self</div>

                                    <div className="font-semibold text-[#540D33]">Diet</div>
                                    <div>:</div>
                                    <div>Male</div>

                                    <div className="font-semibold text-[#540D33]">Profession Area</div>
                                    <div>:</div>
                                    <div>Calvin</div>
                                    <div className="font-semibold text-[#540D33]">Working As</div>
                                    <div>:</div>
                                    <div>Male</div>

                                    <div className="font-semibold text-[#540D33]">Annual Income</div>
                                    <div>:</div>
                                    <div>Calvin</div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex justify-center' >
                            <button className='bg-[#E33183] py-2 w-[250px] rounded-sm text-white font-medium ' >
                                Save & Update
                            </button>
                        </div>





                    </div>





                </div>

            </div>
        </div >

    )
}

export default MyProfile
