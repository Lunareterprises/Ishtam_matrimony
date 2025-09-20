import React, { useState } from 'react'
import Nav from '../Components/Nav'
import { BsBalloonHeart } from 'react-icons/bs'
import addStoryImg from '../assets/addStoryImg.png'
import { FiUploadCloud } from "react-icons/fi";
import Footer from '../Components/Footer';

function AddNewSuccessStory() {
    const [formData, setFormData] = useState({
        groomName: "",
        brideName: "",
        weddingDate: "",
        email: "",
        mobile: "",
        story: "",
        couplePhoto: null,
        consent: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Form submitted!");
    };

    return (
        <div>
            <Nav />
            <div className='pt-20'  >
                <div className='w-full bg-pink-50 h-auto' >
                    <div className='sm:px-35 px-10 flex flex-col gap-2 align-text-left py-10'  >
                        <div className="flex flex-col sm:flex-row justify-between items-center ">
                            {/* Left Section - Text */}
                            <div className="max-w-[900px]  text-[#490B22]">
                                <div className="flex items-center gap-2 mb-4">
                                    <h1 className="text-2xl font-semibold">Add your Success Story</h1>
                                    <span className="text-3xl">
                                        <BsBalloonHeart />
                                    </span>
                                </div>

                                <p className="text-base leading-relaxed">
                                    Ishttam Matrimony wishes you a lifetime filled with love, joy, and
                                    togetherness. We invite you to share your wedding story and experiences
                                    with us, so your journey can inspire, guide, and bring hope to countless
                                    others seeking their perfect life partner.
                                </p>
                            </div>
                            <img
                                src={addStoryImg}
                                alt="Add Your Story"
                                className="w-[200px] md:w-[230px] h-auto"
                            />

                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 md:p-10 space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-center text-pink-600">
                            Ishttam Marry Success Story
                        </h2>

                        {/* SINGLE ROW - Groom, Bride, Date, Mobile */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Groom ID */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Groom’s ID
                                </label>
                                <input
                                    type="text"
                                    name="groomId"
                                    placeholder="Enter Groom’s Ishttam ID"
                                    value={formData.groomId}
                                    onChange={handleChange}
                                    className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
                                    required
                                />
                            </div>

                            {/* Bride ID */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Bride’s ID
                                </label>
                                <input
                                    type="text"
                                    name="brideId"
                                    placeholder="Enter Bride’s Ishttam ID"
                                    value={formData.brideId}
                                    onChange={handleChange}
                                    className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
                                    required
                                />
                            </div>

                            {/* Wedding Date */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Wedding Date
                                </label>
                                <input
                                    type="date"
                                    name="weddingDate"
                                    value={formData.weddingDate}
                                    onChange={handleChange}
                                    className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
                                    required
                                />
                            </div>
                        </div>


                        {/* Upload Box */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Couple Photo
                            </label>

                            {/* Upload Box */}
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-pink-400 rounded-xl cursor-pointer bg-pink-50 hover:bg-pink-100 transition relative overflow-hidden">
                                {formData.couplePhotoPreview ? (
                                    // ✅ Show image INSIDE box but not stretched
                                    <img
                                        src={formData.couplePhotoPreview}
                                        alt="Couple Preview"
                                        className="max-h-full max-w-full object-contain rounded-lg py-10"
                                    />
                                ) : (
                                    // Default view
                                    <>
                                        <FiUploadCloud className="text-pink-500 text-3xl mb-2" />
                                        <span className="text-sm text-gray-600">
                                            Click or drag & drop to upload couple photo
                                        </span>
                                    </>
                                )}

                                {/* File input */}
                                <input
                                    type="file"
                                    name="couplePhoto"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setFormData({
                                                ...formData,
                                                couplePhoto: file,
                                                couplePhotoPreview: URL.createObjectURL(file),
                                            });
                                        }
                                    }}
                                    className="hidden"
                                    required
                                />
                            </label>
                        </div>



                        {/* Checkbox */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                                className="w-4 h-4 accent-pink-600 border-gray-300 rounded focus:ring-pink-400"
                                required
                            />
                            <span className="text-gray-700 text-sm">
                                I agree that <span className="font-semibold text-pink-600">Ishttam Marry</span> may use
                                my wedding photos for promotional activities.
                            </span>
                        </div>


                        <div className='flex items-center justify-center'  >
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className=" px-5 py-2 bg-pink-600 text-white font-medium  rounded-lg hover:bg-pink-700 transition"
                            >
                                Submit Your Success Story
                            </button>
                        </div>

                    </form>
                </div>


            </div>
            <Footer />
        </div>
    )
}

export default AddNewSuccessStory
