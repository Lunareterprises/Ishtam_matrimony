import React, { useState } from 'react'
import HomeContactImg from '../assets/PexelsPhotobyTrungNguyen.png'
import { FcRating } from "react-icons/fc";
import HappyClient1 from '../assets/Ellipse 71.png'
import HappyClient2 from '../assets/Ellipse 72.png'
import HappyClient3 from '../assets/Ellipse 73.png'
import HappyClient4 from '../assets/Ellipse 74.png'
import HappyClient5 from '../assets/Ellipse 75.png'
import flowerImg from '../assets/image27.png'
import Swal from 'sweetalert2';
import { sendEnquiryRequestApi } from '../Services/allApi';


function HomeContactSection() {
    const happyClients = [
        { img: HappyClient1 },
        { img: HappyClient2 },
        { img: HappyClient3 },
        { img: HappyClient4 },
        { img: HappyClient5 }
    ]
    const [countryCode, setCountryCode] = useState("+91");
    const [contactFormData, setContactFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });



    const submitContactForm = async (e) => {
        e.preventDefault();
        try {
            console.log("inside send enquiry request::");
            // API call
            const result = await sendEnquiryRequestApi(contactFormData);
            console.log("result :: ", result);

            Swal.close(); // close loading

            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Enquiry Sent!',
                    text: 'Thank you for reaching out. We will get back to you shortly.',
                    icon: 'success',
                    iconColor: "#E33183",
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#E33183"
                });
                setContactFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });
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
                text: error?.response?.data?.message || 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };




    return (

        <div id='contactUs' className="relative w-full overflow-hidden">
            {/* Background Image */}

            <img
                src={HomeContactImg}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="relative z-10 px-4 sm:px-6 md:px-12 py-16 md:py-24 ">

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-10">

                    {/* Left Content (Text & Ratings) */}
                    <div className="w-full md:flex-[3] md:w-3/5 text-white p-6">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                            Meet Your ishttam with Purpose
                        </h1>
                        <p className="text-base sm:text-lg font-light italic mb-4">
                            At Ishttam Marry, we don’t just match profiles – we align lives, beliefs,
                            and families. With us, marriage isn’t just a ritual – it’s a meaningful journey.
                        </p>

                        {/* Avatars and Ratings */}
                        <div className="flex items-center justify-center gap-3 mt-4">
                            {/* Avatars */}
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

                            {/* Stars & Rating */}
                            <div className="flex items-center gap-1 text-2xl ml-3">
                                <FcRating /><FcRating /><FcRating /><FcRating /><FcRating />
                                <span className="ml-2 text-sm">4.5 / 5</span>
                            </div>

                        </div>
                        {/* Decorative Element */}
                        <div className="pt-7 flex justify-center">
                            <img src={flowerImg} alt="Flower Decoration" className="w-32 md:w-60" />
                        </div>

                    </div>

                    {/* Right Content (Form) */}
                    <form className="w-full md:flex-[2] md:w-2/5 rounded-lg p-6 space-y-4  mx-auto">
                        <div>
                            <label className="block mb-1 font-medium text-white">Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full p-2 rounded-md bg-white border border-transparent focus:outline-none"
                                value={contactFormData.name}
                                onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-white ">Email</label>
                            <input
                                type="email"
                                placeholder="you@company.com"
                                className="w-full p-2 rounded-md bg-white border border-transparent focus:outline-none"
                                value={contactFormData.email}
                                onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-white">Phone number</label>
                            <div className="flex gap-2">
                                <select
                                    className="border rounded-md px-2 py-1 bg-white border-transparent focus:outline-none text-gray-400"
                                    value={countryCode}
                                    onChange={(e) => {
                                        setCountryCode(e.target.value);
                                        setContactFormData({
                                            ...contactFormData,
                                            phone: `${e.target.value} ${contactFormData.phone.split(" ").slice(1).join(" ")}`,
                                        });
                                    }}
                                >
                                    <option value="+1">US (+1)</option>
                                    <option value="+91">IN (+91)</option>
                                </select>

                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    className="w-full p-2 border rounded-md bg-white border-transparent focus:outline-none"
                                    value={contactFormData.phone.replace(countryCode + " ", "")}
                                    onChange={(e) =>
                                        setContactFormData({
                                            ...contactFormData,
                                            phone: `${countryCode} ${e.target.value}`,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-white">What's on your mind....</label>
                            <textarea
                                className="w-full p-2 border rounded-md bg-white border-transparent focus:outline-none"
                                rows="4"
                                value={contactFormData.message}
                                onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                            ></textarea>
                        </div>
                        <button
                            onClick={submitContactForm}
                            type="submit"
                            className="w-[50%] bg-[#E33183] text-white font-semibold py-2 rounded-full hover:bg-pink-700 transition mx-auto block"
                        >
                            SUBMIT ↗
                        </button>

                    </form>
                </div>
            </div>
            
        </div>

    )
}

export default HomeContactSection
