import React, { useState } from 'react'
import DoubleHeartsCredentials from '../assets/DoubleHeartsCredentials.png';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5"
import Login from './Login';

function Registration({ onClose }) {
    const [step, setStep] = useState(1);
    const [showLogin, setShowLogin] = useState(false);
    const [showLoginWithOtp, setShowLoginWithOtp] = useState(false);
    

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
                <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-lg gap-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183]"
                    >
                        <IoCloseOutline size={24} />
                    </button>

                    <div className='flex flex-col justify-center items-center' >
                        <img src={DoubleHeartsCredentials} alt="icon" />
                        <h1 className="text-[20px] font-semibold text-[#E33183]">ishtam<span className='text-[#490B22]' >Marry</span></h1>
                    </div>


                    {step === 1 && (

                        <div className='flex flex-col  gap-5' >
                            <div className='flex flex-col justify-start gap-2'>
                                <p className='text-[14px] text-[#490B22] font-medium'>This Profile is for</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {["Myself", "My Son", "My Daughter", "My Brother", "My Sister", "My Friend", "My Relative"].map((label, idx) => (
                                        <label
                                            key={idx}
                                            className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-gray-100 hover:border-[#E33183] hover:bg-pink-50 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name="profileFor"
                                                className="w-4 h-4 accent-[#E33183]"
                                            />
                                            <span className="text-[14px] text-[#490B22]">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col justify-start gap-2'>
                                <p className='text-[14px] text-[#490B22] font-medium'>Gender</p>
                                <div className="flex gap-3">
                                    {["Male", "Female"].map((label, idx) => (
                                        <label
                                            key={idx}
                                            className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 w-30 bg-gray-100 hover:border-[#E33183] hover:bg-pink-50 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name="profileFor"
                                                className="w-4 h-4 accent-[#E33183]"
                                            />
                                            <span className="text-[14px] text-[#490B22]">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => setStep(2)}
                                type="button"
                                className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <form className="flex flex-col sm:gap-6 sm:w-85 w-60 gap-4">

                            <div className='flex flex-col gap-3' >
                                <label className="block text-sm font-medium  text-[#490B22]">
                                    Your Name
                                </label>
                                <div className='flex flex-col gap-3'  >
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px]"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none  text-[14px]"
                                    />
                                </div>
                            </div>


                            <div className='flex flex-col gap-3' >
                                <label className="block text-sm font-medium  text-[#490B22]">
                                    Date of Birth
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="DD"
                                        maxLength="2"
                                        className="w-1/3 border border-gray-300 rounded-lg px-3 py-3 text-center focus:outline-none text-[14px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="MM"
                                        maxLength="2"
                                        className="w-1/3 border border-gray-300 rounded-lg px-3 py-3 text-center focus:outline-none text-[14px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder="YYYY"
                                        maxLength="4"
                                        className="w-1/3 border border-gray-300 rounded-lg px-3 py-3 text-center focus:outline-none text-[14px]"
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-3' >
                                <button onClick={() => setStep(3)}
                                    type="submit"
                                    className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}


                    {step === 3 && (
                        <form className="flex flex-col sm:gap-6 sm:w-85 w-60 gap-4">

                            <div className='flex flex-col gap-3' >

                                {/* Religion selection */}
                                <div className='flex flex-col gap-2'>
                                    <label className="block text-sm font-medium text-[#490B22]">
                                        Your Religion
                                    </label>
                                    <div className="relative w-full">
                                        <details className="w-full" id="religion-dropdown">
                                            <summary className="list-none w-full border border-gray-300 rounded-lg px-3 py-3 text-[14px] text-[#490B22] bg-white shadow-sm cursor-pointer flex justify-between items-center">
                                                <span id="selectedReligion">Select Religion</span>
                                                <svg
                                                    className="w-5 h-5 text-[#490B22] transition-transform duration-200 group-open:rotate-180"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </summary>

                                            <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                {["Religion 1", "Religion 2", "Religion 3"].map((c, i) => (
                                                    <li
                                                        key={i}
                                                        className="px-4 py-2 text-sm text-[#490B22] hover:bg-pink-100 hover:text-pink-700 cursor-pointer"
                                                        onClick={() => {
                                                            document.getElementById("selectedReligion").textContent = c;
                                                            document.getElementById("religion-dropdown").removeAttribute("open");
                                                        }}
                                                    >
                                                        {c}
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </div>
                                </div>

                                {/* Community selection */}
                                <div className='flex flex-col gap-2'>
                                    <label className="block text-sm font-medium text-[#490B22]">
                                        Community
                                    </label>
                                    <div className="relative w-full">
                                        <details className="w-full" id="community-dropdown">
                                            <summary className="list-none w-full border border-gray-300 rounded-lg px-3 py-3 text-[14px] text-[#490B22] bg-white shadow-sm cursor-pointer flex justify-between items-center">
                                                <span id="selectedCommunity">Select Community</span>
                                                <svg
                                                    className="w-5 h-5 text-[#490B22] transition-transform duration-200 group-open:rotate-180"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </summary>

                                            <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                {["Community 1", "Community 2", "Community 3"].map((c, i) => (
                                                    <li
                                                        key={i}
                                                        className="px-4 py-2 text-sm text-[#490B22] hover:bg-pink-100 hover:text-pink-700 cursor-pointer"
                                                        onClick={() => {
                                                            document.getElementById("selectedCommunity").textContent = c;
                                                            document.getElementById("community-dropdown").removeAttribute("open");
                                                        }}
                                                    >
                                                        {c}
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-3' >
                                <button onClick={() => setStep(4)}
                                    type="submit"
                                    className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}


                    {step === 4 && (
                        <form className="flex flex-col sm:gap-6 sm:w-85 w-60 gap-4">

                            <div className='flex flex-col gap-3' >
                                <div>
                                    <label className="block text-sm font-medium  text-[#490B22]">
                                        Email ID
                                    </label>
                                    <div className='flex flex-col gap-3'  >
                                        <input
                                            type="text"
                                            placeholder="Enter Your Email ID"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px]"
                                        />

                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium  text-[#490B22]">
                                        Mobile Number
                                    </label>
                                    <div className='flex flex-col gap-3'  >
                                        <input
                                            type="text"
                                            placeholder="Enter Your Mobile Number"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px]"
                                        />

                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium  text-[#490B22]">
                                        Password
                                    </label>
                                    <div className='flex flex-col gap-3'  >
                                        <input
                                            type="text"
                                            placeholder="Create a strong password"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px]"
                                        />

                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium  text-[#490B22]">
                                        Confirm Password
                                    </label>
                                    <div className='flex flex-col gap-3'  >
                                        <input
                                            type="text"
                                            placeholder="Confirm Your Password"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px]"
                                        />

                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-2 justify-center items-center' >
                                <button onClick={() => setShowLogin(true)} 
                                    type="button"
                                    className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                                >
                                    Submit
                                </button>
                                <p className=' text-[10px] text-[#490B22]' >By creating account, you agree to our <span className='font-semibold' >Privacy Policy</span> and <span className='font-semibold' >T&C</span></p>
                            </div>
                        </form>
                    )}

                </div>

            </div>

            {showLogin && (
                <Login
                    open={showLogin}
                    onClose={() => setShowLogin(false)}
                />
            )}
            

        </>
    )
}

export default Registration
