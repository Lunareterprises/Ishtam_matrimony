import React from 'react'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaQrcode } from "react-icons/fa6";
import { IoArrowBack } from "react-icons/io5";

function SubscriptionPlanCards({ plan, flipped, onFlip, onBack }) {
    return (
        <div className="w-full md:w-72 [perspective:1000px]">
            <div
                className={`relative w-full min-h-[480px] transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
            >
                {/* Front Side */}
                <div className="absolute w-full h-full bg-white rounded-lg border border-[#5A0A1D] shadow-md [backface-visibility:hidden] flex flex-col">
                    <div className="text-center p-5 border-b border-gray-200">
                        <h2 className="inline-block px-4 py-1 font-semibold text-[#5A0A1D] border-1 border-[#5A0A1D] rounded-[8px]">
                            {plan.name}
                        </h2>
                    </div>
                    <div className="text-center py-4">
                        <h3 className="text-[40px] font-medium text-[#5A0A1D]">
                            {plan.price}
                        </h3>
                        <p className="text-[14px] text-gray-500">{plan.duration}</p>
                    </div>
                    <ul className="px-6 space-y-2 text-[13px] flex-1">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <IoIosCheckmarkCircleOutline className="text-green-500 text-xl flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
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
                    <div className="mb-4 flex flex-col items-center">
                        <FaQrcode className="text-5xl text-[#5A0A1D] mb-2" />
                        <p className="text-[#5A0A1D] font-semibold text-center">
                            Scan to Pay for {plan.name} Plan
                        </p>
                    </div>
                    <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                        <FaQrcode className="text-6xl text-[#5A0A1D]" />
                    </div>
                    <button
                        onClick={onBack}
                        className="mt-4 px-4 py-2 rounded-md bg-[#E33183] text-white flex items-center gap-2 hover:bg-pink-700"
                    >
                        <IoArrowBack /> Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPlanCards
