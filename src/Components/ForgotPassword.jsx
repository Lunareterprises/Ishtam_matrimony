import React, { useEffect, useRef, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import Swal from 'sweetalert2';
import { resetCredentialsApi, resetPasswordApi, verifyOtpApi } from '../Services/allApi';
import { useNavigate } from 'react-router-dom';

function ForgotPassword({ onClose, onSuccess }) {
    const [forgotEmail, setForgotEmail] = useState({
        email: ""
    });
    const [resetCredentials, setResetCredential] = useState({
        setEmail: "",
        setPasword: ""
    })
    const [step, setStep] = useState(1);

    //step1:- For sending OTP to Email
    const submitEmailID = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                email: forgotEmail.email
            }
            const result = await resetPasswordApi(payload);
            console.log("Api result for reset password :::", result);

            // Extract actual response body
            const response = result?.data;

            if (response?.result === true) {
                await Swal.fire({
                    title: "OTP Sent Successfully!",
                    text: response?.message || "We have sent an OTP to your email.",
                    icon: "success",
                    iconColor: "#E33183",
                    confirmButtonText: "OK",
                });
                // Switch to OTP screen
                setStep(2);
                setOtpDigits(new Array(4).fill(""));
                setCounter(300);
            } else {
                await Swal.fire({
                    title: "OTP Sending Failed",
                    text: response?.message || "Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
        catch (error) {
            console.error("Send OTP error:", error);
            await Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again later.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }


    //For Entering OtP and Timer Display
    const [counter, setCounter] = useState(200);
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);

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


    //step2:- For sending OTP
    const handleResetCredentials = async (e) => {
        e.preventDefault();
        const otp = otpDigits.join("");
        console.log("OTP to send:", otp);
        const payload = {
            email: resetCredentials.setEmail,
            otp: otp,
            password: resetCredentials.setPasword
        };
        try {
            console.log("Inside reset credentials function in frontend");
            const result = await resetCredentialsApi(payload);
            console.log("Password reset result:", result);
            if (result?.data?.result === true) {
                onClose()
                await Swal.fire({
                    title: 'OTP Verification Successful!',
                    text: 'Your Email has been verified successfully.',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
                onSuccess()
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



    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otpDigits[index]) {
                // If current box has a value, just clear it
                const newOtp = [...otpDigits];
                newOtp[index] = "";
                setOtpDigits(newOtp);
            } else if (index > 0) {
                // If empty, move to previous box
                inputRefs.current[index - 1]?.focus();

                const newOtp = [...otpDigits];
                newOtp[index - 1] = "";
                setOtpDigits(newOtp);
            }
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
                            <h1 className="text-[14px]  text-[#490B22] font-semibold">Forgot Password</h1>
                            <h1 className="text-[14px]  text-[#490B22]">We will send you an OTP to reset</h1>
                        </div>

                        <form onSubmit={submitEmailID} className="flex flex-col sm:gap-6 gap-4 sm:w-85 w-60">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-[#490B22]">
                                    Email ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your registered email id"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none sm:text-[14px] text-[13px]"
                                    value={forgotEmail.email}
                                    onChange={(e) => setForgotEmail({ ...forgotEmail, email: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                            >
                                Send OTP
                            </button>

                        </form>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
                    <div className="bg-white sm:px-10 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-lg gap-6 relative">

                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183]"
                        >
                            <IoCloseOutline size={24} />
                        </button>

                        <div className="flex flex-col justify-center items-center gap-2">
                            <h1 className="text-[14px]  text-[#490B22] font-semibold">Login with OTP</h1>
                            <div className="flex flex-col justify-center items-center"  >
                                <h1 className="text-[13px]  text-[#490B22]">OTP has been sent to {forgotEmail.email} </h1>
                            </div>
                        </div>

                        <form onSubmit={handleResetCredentials} className="flex flex-col sm:gap-4 gap-4 sm:w-75 w-60 items-center justify-center">

                            <div className="w-full ">
                                <label className="block text-sm font-medium mb-1 text-[#490B22]">
                                    Email ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Reset your Emai Id"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px]"
                                    value={resetCredentials.setEmail}
                                    onChange={(e) => setResetCredential({ ...resetCredentials, setEmail: e.target.value })}
                                />
                            </div>
                            <div className="w-full ">
                                <label className="block text-sm font-medium mb-1 text-[#490B22]">
                                    Password
                                </label>
                                <input
                                    type="text"
                                    placeholder="Reset your password"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px]"
                                    value={resetCredentials.setPasword}
                                    onChange={(e) => setResetCredential({ ...resetCredentials, setPasword: e.target.value })}
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center gap-4'>
                                <label className="block text-sm font-medium text-[#490B22]">Enter OTP</label>
                                <div className="flex justify-center space-x-3">
                                    {otpDigits.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
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

    )
}

export default ForgotPassword
