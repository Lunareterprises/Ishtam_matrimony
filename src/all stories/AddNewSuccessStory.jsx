import React, { useState } from 'react'
import Nav from '../Components/Nav'
import { BsBalloonHeart } from 'react-icons/bs'
import addStoryImg from '../assets/addStoryImg.png'
import { FiUploadCloud } from "react-icons/fi";
import Footer from '../Components/Footer';
import { addSuccesstoryApi } from '../Services/allApi';
import DoubleHearts from '../assets/DoubleHearts.png';
import Swal from 'sweetalert2';

function AddNewSuccessStory() {
    const [formData, setFormData] = useState({
        groom_id: "",
        bride_id: "",
        wedding_date: "",
        story: "",
        file: null,
        preview: null,
    });

    // Handle change
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "file") {
            const file = files[0];
            setFormData({
                ...formData,
                file: file,
                preview: URL.createObjectURL(file),
            });

        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const submitSuccessStory = async (e) => {
        e.preventDefault();
        console.log("Before building reqBody ::");

        const reqBody = new FormData();
        reqBody.append("groom_id", formData.groom_id);
        reqBody.append("bride_id", formData.bride_id);

        // Convert date properly
        const formattedDate = new Date(formData.wedding_date)
            .toISOString()
            .split("T")[0];
        reqBody.append("wedding_date", formattedDate);

        reqBody.append("story", formData.story);
        if (formData.file) {
            reqBody.append("file", formData.file);
        }

        console.log("Before api call ::");
        try {
            const result = await addSuccesstoryApi(reqBody);

            // ✅ Log the full response object
            console.log("Full API Response :::", result);
            if (result?.data?.result === true) {

                Swal.fire({
                    title: 'Story Submitted!',
                    text: 'Your story has been sent to the Ishtam Marry team for review. It will be displayed on the platform after approval.',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });

                setFormData({
                    groom_id: "",
                    bride_id: "",
                    wedding_date: "",
                    story: "",
                    file: null,
                    preview: null,
                })
            } else {
                Swal.fire({
                    title: 'Failed to submit story',
                    text: result?.data?.message || 'Unable to submit success story. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Failed to submit story',
                text: result?.data?.message || 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
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
                                    Ishtam Matrimony wishes you a lifetime filled with love, joy, and
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

                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
                    <form
                        onSubmit={submitSuccessStory}
                        className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 md:p-10 space-y-6"
                    >
                        <div className='flex flex-col items-center justify-center gap-2' >
                            <img src={DoubleHearts} width={33} alt="" />
                            <h2 className="text-2xl font-bold text-center text-pink-600">
                                Ishtam Marry Success Story
                            </h2>
                        </div>


                        {/* SINGLE ROW - Groom, Bride, Date, Mobile */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-5">
                            {/* Groom ID */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Groom’s ID
                                </label>
                                <input
                                    type="text"
                                    name="groom_id"
                                    placeholder="Enter Groom’s Ishtam ID"
                                    value={formData.groom_id}
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
                                    name="bride_id"
                                    placeholder="Enter Bride’s Ishtam ID"
                                    value={formData.bride_id}
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
                                    name="wedding_date"
                                    value={formData.wedding_date}
                                    onChange={handleChange}
                                    className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Your Story
                            </label>
                            <textarea
                                name="story"
                                placeholder="Share your success story..."
                                value={formData.story}
                                onChange={handleChange}
                                rows={5}
                                className="w-full border text-gray-700 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 resize-none"
                                required
                            />
                        </div>


                        {/* Upload Box */}
                        <div className='flex flex-col items-center justify-center' >
                            <label className="block text-gray-700 font-medium mb-2">
                                Couple Photo
                            </label>

                            {/* Upload Box */}
                            {/* <label className="flex flex-col items-center justify-center sm:w-100 w-full h-40 border-2 border-dashed border-pink-400 rounded-xl cursor-pointer bg-pink-50 hover:bg-pink-100 transition relative overflow-hidden">
                                {formData.file ? (
                                   
                                    <img
                                        src={formData.file}
                                        alt="Couple Preview"
                                        className="max-h-full max-w-full object-contain rounded-lg py-10"
                                    />
                                ) : (
                                   
                                    <>
                                        <FiUploadCloud className="text-pink-500 text-3xl mb-2" />
                                        <span className="text-sm text-gray-600 text-center p-3">
                                            Click or drag & drop to upload couple photo
                                        </span>
                                    </>
                                )}

                               
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
                                                file: URL.createObjectURL(file),
                                            });
                                        }
                                    }}
                                    className="hidden"
                                    required
                                />
                            </label> */}


                            <label className="flex flex-col items-center justify-center sm:w-100 w-full h-40 border-2 border-dashed border-pink-400 rounded-xl cursor-pointer bg-pink-50 hover:bg-pink-100 transition relative overflow-hidden">
                                {formData.preview ? (
                                    <img
                                        onClick={() => navigate('/view-success-story', { state: { storyData: item } })}
                                        src={formData.preview}
                                        alt="Couple Preview"
                                        className="max-h-full max-w-full object-contain rounded-lg py-2"
                                    />
                                ) : (
                                    <>
                                        <FiUploadCloud className="text-pink-500 text-3xl mb-2" />
                                        <span className="text-sm text-gray-600 text-center p-3">
                                            Click or drag & drop to upload couple photo
                                        </span>
                                    </>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setFormData({
                                                ...formData,
                                                file,                        // ✅ keep the real file
                                                preview: URL.createObjectURL(file), // ✅ preview separately
                                            });
                                        }
                                    }}
                                    className="hidden"
                                    required
                                />
                            </label>


                        </div>



                        {/* Checkbox */}
                        <div className="flex items-center space-x-2 py-5">
                            <input
                                type="checkbox"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleChange}
                                className="w-4 h-4 accent-pink-600 border-gray-300 rounded focus:ring-pink-400"
                                required
                            />
                            <span className="text-gray-700 text-sm">
                                I agree that <span className="font-semibold text-pink-600">Ishtam Marry</span> may use
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
