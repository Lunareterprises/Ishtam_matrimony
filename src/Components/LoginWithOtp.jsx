import React from 'react';
import DoubleHeartsCredentials from '../assets/DoubleHeartsCredentials.png';
import { IoCloseOutline } from "react-icons/io5";

function LoginWithOtp({ onClose, onSendOtp }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
            <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-lg gap-8 relative">

                <button
                    onClick={onClose  }
                    className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183]"
                >
                    <IoCloseOutline size={24} />
                </button>

                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-[14px]  text-[#490B22] font-semibold">Login with OTP</h1>
                    <h1 className="text-[14px]  text-[#490B22]">We will send you an OTP to login</h1>
                </div>

                <form className="flex flex-col sm:gap-6 gap-4 sm:w-85 w-60">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-[#490B22]">
                            Mobile Number / Email ID
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your mobile number / email id"
                            className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none sm:text-[14px] text-[13px]"
                        />
                    </div>

                   
                        <button onClick={onSendOtp}
                            type="button"
                            className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                        >
                            Send OTP
                        </button>
                    
                </form>
            </div>
        </div>
    );
}

export default LoginWithOtp;
