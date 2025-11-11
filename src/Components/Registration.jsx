import React, { useState } from 'react'
import DoubleHeartsCredentials from '../assets/DoubleHeartsCredentials.png';
import { IoCloseOutline } from "react-icons/io5"
import { RegistrationApi } from '../Services/allApi';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import { FaChevronDown } from 'react-icons/fa';

function Registration({ onClose, onSuccess }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const [showReligionDropdown, setShowReligionDropdown] = useState(false);
    const [registrationData, setRegistrationData] = useState({
        profile_for: "",
        gender: "",
        firstname: "",
        lastname: "",
        dob: "",
        religion: "",
        community: "",
        email: "",
        mobile: "",
        password: "",
        confirm_password: ""
    });

    const religionData = {
        Hindu: [
            "Ambalavasi",
            "Brahmin - Namboodiri",
            "Chettiar",
            "Dheevara",
            "Ezhava",
            "Ezhuthachan",
            "Maniyani",
            "Menon",
            "Nadar",
            "Nair",
            "Nair - Vaniya",
            "Nair - Vilakkithala",
            "Nambiar",
            "Pillai",
            "Pulaya",
            "Saliya",
            "Thiyya",
        ],
        Christian: [
            "Roman Catholic",
            "Syrian Catholic",
            "Orthodox",
            "Jacobite",
            "Marthoma",
            "Pentecost",
            "CSI",
            "Seventh Day Adventist",
            "Born Again",
        ],
        Muslim: [
            "Sunni",
            "Mappila",
            "Mujahid",
            "Shia",
            "Ahmadiyya",
        ],
        Others: ["Buddhist", "Jain", "No Religion", "Spiritual - Not Religious"],
    };

    // ✅ Step validations
    const validateStep = () => {
        let newErrors = {};
        if (step === 1) {
            if (!registrationData.profile_for) newErrors.profile_for = "Please select profile type";
            if (!registrationData.gender) newErrors.gender = "Please select gender";
        } else if (step === 2) {

            if (!registrationData.firstname) newErrors.firstname = "First name is required";
            if (!registrationData.lastname) newErrors.lastname = "Last name is required";
            if (!registrationData.dob || !/^\d{4}-\d{2}-\d{2}$/.test(registrationData.dob)) {
                newErrors.dob = "Enter a valid DOB (YYYY-MM-DD)";
            } else {
                // ✅ Age validation (must be 18 years or older)
                const today = new Date();
                const dob = new Date(registrationData.dob);
                const age = today.getFullYear() - dob.getFullYear();
                const monthDiff = today.getMonth() - dob.getMonth();
                const dayDiff = today.getDate() - dob.getDate();

                // Adjust if the birthday hasn't occurred yet this year
                const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

                if (actualAge < 18) {
                    newErrors.dob = "Registration is only available for users aged 18 and above.";
                }
            }

        } else if (step === 3) {
            if (!registrationData.religion) newErrors.religion = "Religion is required";
            if (!registrationData.community) newErrors.community = "Community is required";

        } else if (step === 4) {
            if (!registrationData.email || !/\S+@\S+\.\S+/.test(registrationData.email)) {
                newErrors.email = "Enter a valid email";
            }
            if (!registrationData.mobile || !/^\d{10}$/.test(registrationData.mobile)) {
                newErrors.mobile = "Enter a valid 10-digit mobile number";
            }
            if (!registrationData.password || registrationData.password.length < 6) {
                newErrors.password = "Password must be at least 6 characters";
            }
            if (registrationData.password !== registrationData.confirm_password) {
                newErrors.confirm_password = "Passwords do not match";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) {
            setStep(step + 1);
            setErrors({});
        }
    };

    const userRegistration = async (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        setIsSubmitting(true);
        try {
            Swal.fire({
                title: 'Please wait...',
                text: 'Registering your account...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            const result = await RegistrationApi(registrationData);
            console.log("Result of registration :::", result);
            Swal.close();

            if (result?.data?.result === true) {

                await Swal.fire({
                    title: 'Registration Successful!',
                    text: result?.data?.message || 'Your account has been created successfully.',
                    icon: 'success',
                    iconColor: "#E33183",
                    confirmButtonText: 'OK',
                });

                onClose();
                onSuccess(registrationData.email);
            } else {

                await Swal.fire({
                    title: 'Registration Failed',
                    text: result?.data?.message || 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });

                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Registration Error:", error);
            Swal.close();
            await Swal.fire({
                title: 'Error',
                text: error?.response?.data?.message || 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });

            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
            <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-lg gap-6 relative">
                <button onClick={onClose} className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183]">
                    <IoCloseOutline size={24} />
                </button>

                <div className='flex flex-col justify-center items-center' >
                    <img src={DoubleHeartsCredentials} className='h-auto w-9' alt="icon" />
                    <h1 className="text-[20px] font-semibold text-[#E33183]">ishtam<span className='text-[#490B22]' >Marry</span></h1>
                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col justify-start gap-2'>
                            <p className='text-[14px] text-[#490B22] font-medium'>This Profile is for</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {["My Self", "My Son", "My Daughter", "My Brother", "My Sister", "My Friend", "My Relative"].map((label, idx) => (
                                    <label key={idx} className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-gray-100 hover:border-[#E33183] hover:bg-pink-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="profileFor"
                                            value={label}
                                            checked={registrationData.profile_for === label}
                                            onChange={(e) => setRegistrationData({ ...registrationData, profile_for: e.target.value })}
                                            className="w-4 h-4 accent-[#E33183]"
                                        />
                                        <span className="text-[14px] text-[#490B22]">{label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.profile_for && <p className="text-red-500 text-xs">{errors.profile_for}</p>}
                        </div>
                        <div className='flex flex-col justify-start gap-2'>
                            <p className='text-[14px] text-[#490B22] font-medium'>Gender</p>
                            <div className="flex gap-3">
                                {["Male", "Female"].map((label, idx) => (
                                    <label key={idx} className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 w-30 bg-gray-100 hover:border-[#E33183] hover:bg-pink-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={label}
                                            checked={registrationData.gender === label}
                                            onChange={(e) => setRegistrationData({ ...registrationData, gender: e.target.value })}
                                            className="w-4 h-4 accent-[#E33183]"
                                        />
                                        <span className="text-[14px] text-[#490B22]">{label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                        </div>
                        <button onClick={nextStep} type="button" className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700">
                            Continue
                        </button>
                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <form className="flex flex-col sm:gap-6 sm:w-85 w-60 gap-4">
                        <div className='flex flex-col gap-3'>
                            <label className="block text-sm font-medium text-[#490B22]">Your Name</label>
                            <div className='flex flex-col gap-3'>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={registrationData.firstname}
                                    onChange={(e) => {
                                        const onlyLetters = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                        setRegistrationData({ ...registrationData, firstname: onlyLetters });
                                    }}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none text-[14px]"
                                />
                                {errors.firstname && <p className="text-red-500 text-xs ">{errors.firstname}</p>}
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={registrationData.lastname}
                                    onChange={(e) => {
                                        const onlyLetters = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                        setRegistrationData({ ...registrationData, lastname: onlyLetters });
                                    }}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none  text-[14px]"
                                />
                                {errors.lastname && <p className="text-red-500 text-xs ">{errors.lastname}</p>}
                            </div>
                        </div>

                        {/* Date of birth */}
                        <div className='flex flex-col gap-3'>
                            <label className="block text-sm font-medium text-[#490B22]">Date of Birth</label>
                            <input
                                type="date"
                                value={registrationData.dob || ""}
                                onChange={(e) =>
                                    setRegistrationData({
                                        ...registrationData,
                                        dob: e.target.value, // YYYY-MM-DD
                                    })
                                }
                                min="1900-01-01"
                                max={new Date().toISOString().split("T")[0]} // prevent future dates
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] focus:outline-none bg-white shadow-sm hover:shadow-md transition"
                            />
                            {errors.dob && <p className="text-red-500 text-xs pt-1">{errors.dob}</p>}
                        </div>

                        <button onClick={nextStep} type="button" className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700">
                            Continue
                        </button>
                    </form>
                )}


                {/* STEP 3 */}
                {step === 3 && (
                    <form className="flex flex-col sm:gap-6 sm:w-85 w-60 gap-4">
                        <div className="flex flex-col gap-3">
                            {/* Religion */}
                            <div className="flex flex-col gap-2 relative">
                                <label className="block text-sm font-medium text-[#490B22]">Your Religion</label>

                                {/* Wrapper for dropdown */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowReligionDropdown(!showReligionDropdown)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-left text-[#490B22] bg-white flex justify-between items-center"
                                    >
                                        <span>{registrationData.religion || "Select Religion"}</span>
                                        <FaChevronDown className="text-[#490B22] text-sm ml-2" />
                                    </button>

                                    {showReligionDropdown && (
                                        <div className="absolute z-50 mt-1 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white rounded-lg shadow-md">
                                            {Object.keys(religionData).map((religion, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setRegistrationData({
                                                            ...registrationData,
                                                            religion,
                                                            community: "", // Reset community when religion changes
                                                        });
                                                        setShowReligionDropdown(false);
                                                    }}
                                                    className="px-3 py-2 text-[14px] text-[#490B22] hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {religion}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {errors.religion && <p className="text-red-500 text-xs pt-1">{errors.religion}</p>}
                            </div>

                            {/* Community */}
                            <div className="flex flex-col gap-2 relative">
                                <label className="block text-sm font-medium text-[#490B22]">Community</label>

                                {/* Wrapper for dropdown */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        disabled={!registrationData.religion}
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] text-left text-[#490B22] bg-white disabled:bg-gray-100 flex justify-between items-center"
                                    >
                                        <span>{registrationData.community || "Select Community"}</span>
                                        <FaChevronDown className="text-[#490B22] text-sm ml-2" />
                                    </button>

                                    {showDropdown && registrationData.religion && (
                                        <div className="absolute z-50 mt-1 w-full max-h-40 overflow-y-auto border border-gray-300 bg-white rounded-lg shadow-md">
                                            {religionData[registrationData.religion]?.map((community, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => {
                                                        setRegistrationData({ ...registrationData, community });
                                                        setShowDropdown(false);
                                                    }}
                                                    className="px-3 py-2 text-[14px] text-[#490B22] hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {community}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {errors.community && <p className="text-red-500 text-xs pt-1">{errors.community}</p>}
                            </div>

                        </div>

                        <button
                            onClick={nextStep}
                            type="button"
                            className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                        >
                            Continue
                        </button>
                    </form>
                )}


                {/* STEP 4 */}
                {step === 4 && !isSubmitting && (
                    <form className="flex flex-col sm:gap-6 sm:w-85 w-60 gap-4" onSubmit={userRegistration}>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="block text-sm font-medium text-[#490B22]">Email ID</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Email ID"
                                    value={registrationData.email}
                                    onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none text-[14px]"
                                />
                                {errors.email && <p className="text-red-500 text-xs pt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#490B22]">Mobile Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Mobile Number"
                                    value={registrationData.mobile}
                                    onChange={(e) => setRegistrationData({ ...registrationData, mobile: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none text-[14px]"
                                />
                                {errors.mobile && <p className="text-red-500 text-xs  pt-1">{errors.mobile}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#490B22]">Password</label>
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    value={registrationData.password}
                                    onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none text-[14px]"
                                />
                                {errors.password && <p className="text-red-500 text-xs pt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#490B22]">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm Your Password"
                                    value={registrationData.confirm_password}
                                    onChange={(e) => setRegistrationData({ ...registrationData, confirm_password: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none text-[14px]"
                                />
                                {errors.confirm_password && <p className="text-red-500 text-xs pt-1">{errors.confirm_password}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <button type="submit" className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700">
                                Submit
                            </button>
                            <p className="text-[12px] text-[#490B22]">
                                By creating account, you agree to our{" "}
                                <span className="font-semibold">Privacy Policy</span> and{" "}
                                <span className="font-semibold">T&C</span>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Registration;
