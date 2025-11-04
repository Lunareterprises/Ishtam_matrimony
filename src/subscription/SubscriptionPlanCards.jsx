import React from 'react'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaQrcode } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";
import { BsQrCode } from 'react-icons/bs';
import { LuIndianRupee } from 'react-icons/lu';

function SubscriptionPlanCards({ plan, flipped, onFlip, onBack }) {
    console.log("plan data :::", plan);

    return (
        <div className="w-full md:w-72 [perspective:1000px]">
            <div
                className={`relative w-full min-h-[400px] transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
            >
                {/* Front Side */}
                <div className="absolute w-full h-full bg-white rounded-lg border border-[#5A0A1D] shadow-md [backface-visibility:hidden] flex flex-col">
                    <div className="text-center p-5 border-b border-gray-200">
                        <h2 className="inline-block px-4 py-1 font-semibold text-[#5A0A1D] border-1 border-[#5A0A1D] rounded-[8px]">
                            {plan.p_name}
                        </h2>
                    </div>
                    <div className="text-center py-6">
                        <div className='flex items-center justify-center' >
                            <LuIndianRupee className="text-[32px] text-[#5A0A1D]" />
                            <h3 className="text-[40px] font-medium text-[#5A0A1D]">
                                {plan.p_price}
                            </h3>
                        </div>
                        <p className="text-[17px] text-gray-500">{plan.p_duration} months</p>
                    </div>
                    <ul className="px-6 flex flex-col items-center space-y-2 text-[15px] flex-1">
                        <li className="flex items-center gap-2">
                            <IoIosCheckmarkCircleOutline className="text-[#E33183] text-xl flex-shrink-0" />
                            {plan.p_contact_limit} Contacts Limits
                        </li>
                    </ul>

                    <div className="pt-6 pb-10 px-6">
                        <button
                            onClick={onFlip}
                            className="w-full py-2 rounded-md font-semibold bg-[#E33183] text-white transition-colors hover:bg-pink-700 flex items-center justify-center gap-2"
                        >
                            <FaQrcode /> Choose Plan
                        </button>
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-white rounded-lg border border-[#5A0A1D] shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center p-6">

                    <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                        <BsQrCode className="text-9xl text-[#2e2e2e]" />
                    </div>
                    <div className="mb-4 flex flex-col items-center">
                        <h1 className='text-xl text-gray-700  font-semibold '  >Scan to pay</h1>
                        <p className="text-gray-400 text-sm font-medium text-center">
                            Scan this QR to complete the payment
                        </p>
                    </div>
                    <button
                        onClick={onBack}
                        className="mt-4 px-4 py-2 rounded-md bg-[#E33183] text-white flex items-center gap-2 hover:bg-pink-700"
                    >
                        <IoArrowBack /> Back to plan
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPlanCards
