import React, { useState } from 'react';
import HomeContactImg from '../assets/PexelsPhotobyTrungNguyen.png';
import { FcRating } from "react-icons/fc";
import HappyClient1 from '../assets/Ellipse 71.png';
import HappyClient2 from '../assets/Ellipse 72.png';
import HappyClient3 from '../assets/Ellipse 73.png';
import HappyClient4 from '../assets/Ellipse 74.png';
import HappyClient5 from '../assets/Ellipse 75.png';
import flowerImg from '../assets/image27.png';
import Swal from 'sweetalert2';
import { sendEnquiryRequestApi } from '../Services/allApi';

function HomeContactSection() {
    const happyClients = [
        { img: HappyClient1 },
        { img: HappyClient2 },
        { img: HappyClient3 },
        { img: HappyClient4 },
        { img: HappyClient5 }
    ];

    const [countryCode, setCountryCode] = useState("+91");
    const [contactFormData, setContactFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [errors, setErrors] = useState({});

    // ✅ Inline validation logic
    const validateForm = () => {
        const { name, email, phone, message } = contactFormData;
        const newErrors = {};

        if (!name.trim()) newErrors.name = "Please enter your name.";
        else if (!/^[A-Za-z\s]+$/.test(name))
            newErrors.name = "Name should contain only letters.";

        if (!email.trim()) newErrors.email = "Please enter your email.";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
            newErrors.email = "Enter a valid email address.";

        if (!phone) {
            newErrors.phone = "Please enter your phone number.";
        } else {
            if (countryCode === "+91") {
                if (phone.length !== 10)
                    newErrors.phone = "Indian phone number must be exactly 10 digits.";
            } else if (phone.length < 7 || phone.length > 15) {
                newErrors.phone = "Phone number should be between 7 to 15 digits.";
            }
        }

        if (!message.trim()) newErrors.message = "Please enter a message.";
        else if (message.trim().length < 5)
            newErrors.message = "Message should be at least 5 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // ✅ Submit handler
    const submitContactForm = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            Swal.fire({
                title: 'Sending...',
                text: 'Please wait a moment.',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            // Combine country code and phone before sending to backend
            const payload = {
                ...contactFormData,
                phone: `${countryCode} ${contactFormData.phone}`,
            };

            const result = await sendEnquiryRequestApi(payload);
            Swal.close();

            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Enquiry Sent!',
                    text: 'Thank you for reaching out. We will get back to you shortly.',
                    icon: 'success',
                    iconColor: "#E33183",
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#E33183"
                });
                setContactFormData({ name: "", email: "", phone: "", message: "" });
                setErrors({});
            } else {
                await Swal.fire({
                    title: 'Enquiry Not Delivered',
                    text: result?.data?.message || 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.close();
            await Swal.fire({
                title: 'Error',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div id='contactUs' className="relative w-full overflow-hidden scroll-mt-20">
            <img
                src={HomeContactImg}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-10 px-4 sm:px-6 md:px-12 py-16 md:py-24">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-10">

                    {/* Left Content */}
                    <div className="w-full md:flex-[3] md:w-3/5 text-white p-6">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                            Meet Your ishtam with Purpose
                        </h1>
                        <p className="text-base sm:text-lg font-light italic mb-4">
                            At Ishtam Marry, we don’t just match profiles – we align lives, beliefs,
                            and families. With us, marriage isn’t just a ritual – it’s a meaningful journey.
                        </p>

                        <div className="flex items-center justify-center gap-3 mt-4">
                            <div className="flex -space-x-3">
                                {happyClients.map((client, idx) => (
                                    <img
                                        key={idx}
                                        src={client.img}
                                        alt={`user-${idx}`}
                                        className="w-13 h-13 rounded-full border-2 border-white"
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-1 text-2xl ml-3">
                                <FcRating /><FcRating /><FcRating /><FcRating /><FcRating />
                                <span className="ml-2 text-sm">4.5 / 5</span>
                            </div>
                        </div>

                        <div className="pt-7 flex justify-center">
                            <img src={flowerImg} alt="Flower Decoration" className="w-32 md:w-60" />
                        </div>
                    </div>

                    {/* Right Content (Form) */}
                    <form onSubmit={submitContactForm} className="w-full md:flex-[2] md:w-2/5 rounded-lg p-6 space-y-4 mx-auto">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-medium text-white">Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className={`w-full p-2 rounded-md bg-white border ${errors.name ? 'border-red-500' : 'border-transparent'} focus:outline-none`}
                                value={contactFormData.name}
                                onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 font-medium text-white">Email</label>
                            <input
                                type="email"
                                placeholder="you@company.com"
                                className={`w-full p-2 rounded-md bg-white border ${errors.email ? 'border-red-500' : 'border-transparent'} focus:outline-none`}
                                value={contactFormData.email}
                                onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block mb-1 font-medium text-white">Phone number</label>
                            <div className="flex gap-2">
                                <select
                                    className="border rounded-md px-2 py-1 bg-white border-transparent focus:outline-none text-gray-400"
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                >
                                    <option value="+1">US (+1)</option>
                                    <option value="+91">IN (+91)</option>
                                </select>

                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    className={`w-full p-2 border rounded-md bg-white border-transparent focus:outline-none ${errors.phone ? 'border-red-500' : ''}`}
                                    value={contactFormData.phone}
                                    onChange={(e) => {
                                        const onlyNums = e.target.value.replace(/\D/g, "");
                                        setContactFormData({
                                            ...contactFormData,
                                            phone: onlyNums,
                                        });
                                    }}
                                />
                            </div>
                            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block mb-1 font-medium text-white">What's on your mind...</label>
                            <textarea
                                className={`w-full p-2 border rounded-md bg-white ${errors.message ? 'border-red-500' : 'border-transparent'} focus:outline-none`}
                                rows="4"
                                value={contactFormData.message}
                                onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                            ></textarea>
                            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-[50%] bg-[#E33183] text-white font-semibold py-2 rounded-full hover:bg-pink-700 transition mx-auto block"
                        >
                            SUBMIT ↗
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HomeContactSection;
