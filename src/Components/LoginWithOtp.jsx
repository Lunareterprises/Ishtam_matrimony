import React, { useEffect, useRef, useState } from 'react';
import DoubleHeartsCredentials from '../assets/DoubleHeartsCredentials.png';
import { IoCloseOutline } from "react-icons/io5";
import { loginWithOtpApi, verifyOtpApi } from '../Services/allApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function LoginWithOtp({ onClose, onSendOtp }) {
    const [step, setStep] = useState(1);
    const inputRefs = useRef([]);
    const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
    const [logWithEmailOrMobile, setLogWithEmailOrMobile] = useState({
        emailOrMobile: "",
    })
    //For Entering OtP and Timer Display
    const [counter, setCounter] = useState(200);
    const navigate = useNavigate()
    
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

    //step1:-Function for sending email or mobile 
    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                emailOrMobile: logWithEmailOrMobile.emailOrMobile,
            };
            const result = await loginWithOtpApi(payload);
            console.log("Send OTP result:", result);

            if (result?.data?.result === true) {
                await Swal.fire({
                    title: "OTP Sent Successfully!",
                    text: result?.data?.message || "We have sent an OTP to your email/phone.",
                    icon: "success",
                    iconColor: "#E33183",
                    confirmButtonText: "OK",
                });
                // Switch to OTP screen
                setStep(2);
                setOtpDigits(new Array(4).fill(""));
                setCounter(300); // restart 5 min timer
            } else {
                await Swal.fire({
                    title: "OTP Sending Failed",
                    text: result?.data?.message || "Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Send OTP error:", error);
            await Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    //step2:- For sending OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const otp = otpDigits.join("");
        console.log("OTP to send:", otp);
        const OtpData = {
            email: logWithEmailOrMobile.emailOrMobile,
            token: otp,
            is_login: true
        };
        try {
            console.log("Inside verify OTP function in frontend");
            const result = await verifyOtpApi(OtpData);
            console.log("OTP verification result:", result);
            if (result?.data?.result === true) {
                sessionStorage.setItem("token",result.data.data.token)
                await Swal.fire({
                    title: 'OTP Verification Successful!',
                    text: 'Your Email has been verified successfully.',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });

                //for closing the modal
                if (typeof onClose === "function") onClose();
                if (typeof onVerified === "function") onVerified();
                navigate("/myProfile");

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
        <>
            {step === 1 && (
                <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
                    <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-lg gap-8 relative">

                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183]"
                        >
                            <IoCloseOutline size={24} />
                        </button>

                        <div className="flex flex-col justify-center items-center gap-2">
                            <img src={DoubleHeartsCredentials} className='w-8 h-auto' alt="" />
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
                                    value={logWithEmailOrMobile.emailOrMobile}
                                    onChange={(e) => setLogWithEmailOrMobile({ ...logWithEmailOrMobile, emailOrMobile: e.target.value })}
                                />
                            </div>


                            <button onClick={handleSendOtp}
                                type="button"
                                className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                            >
                                Send OTP
                            </button>

                        </form>
                    </div>
                </div>
            )}

            {/* Enter OTP */}
            {step === 2 && (
                <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
                    <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-lg gap-6 relative">

                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183]"
                        >
                            <IoCloseOutline size={24} />
                        </button>

                        <div className="flex flex-col justify-center items-center gap-2">
                            <h1 className="text-[14px]  text-[#490B22] font-semibold">Login with OTP</h1>
                            <div className="flex flex-col justify-center items-center"  >
                                <h1 className="text-[14px]  text-[#490B22]">OTP has been sent to {logWithEmailOrMobile.emailOrMobile} </h1>
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
            )}
        </>
    );
}

export default LoginWithOtp;
