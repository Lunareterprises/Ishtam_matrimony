import React, { useState } from 'react';
import { MdCheckCircleOutline, MdQrCode2 } from 'react-icons/md';


function AdminSubscriptionPlanCards({ plan }) {
    const [flipped, setFlipped] = useState(false);
    




    return (
        <div className="w-full md:w-72 h-[450px] pt-13" style={{ perspective: '1000px' }}>
            <div
                className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front Side */}
                <div
                    className="absolute w-full h-full rounded-lg border-2 border-[#5A0A1D] shadow-lg bg-white text-gray-800"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                    }}
                >
                    <div className="text-center p-5 border-b border-gray-200">
                        <h2 className="inline-block px-4 py-1 font-semibold text-[#5A0A1D] border border-[#5A0A1D] rounded-lg">
                            {plan.name}
                        </h2>
                    </div>

                    <div className="text-center py-4">
                        <h3 className="text-[40px] font-medium text-[#5A0A1D]">{plan.price}</h3>
                        <p className="text-[14px] text-gray-500">{plan.duration}</p>
                    </div>

                    <ul className="px-6 space-y-2 text-[13px]">
                        {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <MdCheckCircleOutline className="text-green-500 text-xl flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <button
                            onClick={() => setFlipped(true)}
                            className="w-full py-2 rounded-md font-semibold bg-[#5A0A1D] text-white transition-colors hover:bg-[#7a1331]"
                        >
                            Choose Plan
                        </button>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className="absolute w-full h-full rounded-lg border-2 border-[#5A0A1D] shadow-lg bg-white flex items-center justify-center"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <div className="flex flex-col items-center justify-center p-6">
                        <div className="border-4 border-gray-300 p-4 rounded-lg mb-4">
                            <MdQrCode2 className="text-gray-600 text-[120px]" />
                        </div>
                        <p className="text-lg font-medium text-gray-700 mb-2">Scan to Pay</p>
                        <p className="text-sm text-gray-500 mb-6 text-center">
                            Scan this QR code to complete your payment
                        </p>
                        <button
                            onClick={() => setFlipped(false)}
                            className="px-6 py-2 bg-[#5A0A1D] text-white rounded-lg hover:bg-[#7a1331] transition-colors"
                        >
                            Back to Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Demo component with sample data
function Demo() {
    const samplePlan = {
        name: "Premium Plan",
        price: "₹999",
        duration: "per month",
        features: [
            "Unlimited profile views",
            "Direct messaging",
            "Priority support",
            "Advanced search filters",
            "Profile verification badge"
        ]
    };

    return (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
            <AdminSubscriptionPlanCards plan={samplePlan} />
        </div>
    );
}

export default Demo;