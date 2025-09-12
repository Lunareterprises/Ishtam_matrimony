import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5"
import { verifyOtpApi } from '../Services/allApi';
import Swal from 'sweetalert2';

function VerifyOtp({ onClose, onVerified, email = "" }) {
    const [counter, setCounter] = useState(300);
    const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
    const inputRefs = useRef([]); // ✅ refs for inputs

    // Countdown timer
    useEffect(() => {
        if (counter > 0) {
            const timer = setInterval(() => {
                setCounter(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [counter]);

    const handleResend = () => {
        setCounter(300);
    };

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^\d?$/.test(value)) { // only single digit
            const newOtp = [...otpDigits];
            newOtp[index] = value;
            setOtpDigits(newOtp);

            // ✅ auto-focus next input
            if (value && index < otpDigits.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
            // ✅ auto-focus previous input on backspace
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const otp = otpDigits.join(""); 
        console.log("OTP to send:", otp);

        const OtpData = {
            email: email,
            token: otp,
            is_login: false
        };

        try {
            const result = await verifyOtpApi(OtpData);
            console.log("OTP verification result:", result);

            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'OTP Verification Successful!',
                    text: 'Your Email has been verified successfully.',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });

                if (typeof onClose === "function") onClose();
                if (typeof onVerified === "function") onVerified();
            } else {
                Swal.fire({
                    title: 'Invalid OTP',
                    text: result?.data?.message || 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
            <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-lg gap-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183]"
                >
                    <IoCloseOutline size={24} />
                </button>

                <div className="flex flex-col justify-center items-center gap-1">
                    <h1 className="text-[16px] text-[#490B22] font-semibold">Verify Your Email</h1>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-[13px] text-[#490B22]">OTP has been sent to {email}</h1>
                    </div>
                </div>

                <form onSubmit={handleVerifyOTP} className="flex flex-col sm:gap-6 gap-4 sm:w-85 w-60 items-center justify-center">
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <label className="block text-sm font-semibold text-[#490B22]">Enter OTP</label>
                        <div className="flex justify-center space-x-4">
                            {otpDigits.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)} // ✅ store ref
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)} // ✅ backspace support
                                    className="w-13 h-13 text-center text-[26px] font-semibold text-[#818181] bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-md shadow-md focus:outline-none focus:ring-3 focus:ring-[#E33183] focus:scale-105 transition-all duration-300"
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                    >
                        Verify OTP
                    </button>
                </form>

                <div className="text-center text-[#490B22]">
                    {counter > 0 ? (
                        <p>
                            You can resend OTP in{" "}
                            <span className="font-semibold text-[#E33183]">
                                {String(Math.floor(counter / 60)).padStart(2, '0')}:
                                {String(counter % 60).padStart(2, '0')}
                            </span>
                        </p>
                    ) : (
                        <button
                            onClick={handleResend}
                            className="text-[#E33183] font-semibold hover:underline"
                        >
                            Resend OTP
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp;
