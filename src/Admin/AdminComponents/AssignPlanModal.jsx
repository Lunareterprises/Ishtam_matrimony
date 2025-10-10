import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdCheckCircle } from "react-icons/md";
import DoubleHeartsCredentials from '../../assets/DoubleHeartsCredentials.png';

function AssignPlanModal({ isOpen, onClose, user }) {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        {
            id: 1,
            name: "Basic Plan",
            price: "₹499",
            duration: "per month",
            color: "from-blue-500 to-blue-600",
            features: ["5 Profile Views", "Basic Filters"]
        },
        {
            id: 2,
            name: "Premium Plan",
            price: "₹999",
            duration: "per month",
            color: "from-pink-500 to-purple-600",
            features: ["Unlimited Views", "Priority Support"]
        },
        {
            id: 3,
            name: "Gold Plan",
            price: "₹1,499",
            duration: "per month",
            color: "from-amber-500 to-orange-600",
            features: ["All Premium", "Verified Badge"]
        }
    ];

    if (!isOpen) return null; // <-- modal hidden unless isOpen is true

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center rounded-2xl shadow-2xl gap-6 relative w-full max-w-lg">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183] transition-colors"
                >
                    <RxCross2 size={24} />
                </button>

                {/* Logo / Heading */}
                <div className='flex flex-col justify-center items-center' >
                    <img src={DoubleHeartsCredentials} alt="icon" />
                    <h1 className="text-[20px] font-semibold text-[#E33183]">
                        ishtam<span className='text-[#490B22]'>Marry</span>
                    </h1>
                </div>

                {/* User Info */}
                <div className="text-center">
                    <p className="text-[18px] text-gray-500">Choose a Plan for <span className="font-semibold" >Gokul</span></p>
                </div>

                {/* Plan Selection */}
                <div className="w-full space-y-3">
                   
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${selectedPlan === plan.id
                                    ? "border-[#E33183] bg-pink-50 shadow-lg scale-[1.02]"
                                    : "border-gray-200 hover:border-[#E33183] hover:shadow-md"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 flex items-center gap-3">
                                    
                                    <div>
                                        <h3 className="font-semibold text-[#490B22]">{plan.name}</h3>
                                        <p className="text-xs text-gray-500">
                                            {plan.features.join(" • ")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="font-bold text-[#E33183]">{plan.price}</p>
                                        <p className="text-[10px] text-gray-500">{plan.duration}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlan === plan.id
                                            ? "border-[#E33183] bg-[#E33183]"
                                            : "border-gray-300"
                                        }`}>
                                        {selectedPlan === plan.id && <MdCheckCircle className="text-white text-lg" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full">
                    <button
                        onClick={onClose}
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!selectedPlan}
                        className={`flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300 ${selectedPlan
                                ? "bg-[#E33183] text-white hover:shadow-lg hover:scale-[1.02]"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Assign Plan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AssignPlanModal;
