import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminComponents/AdminNavbar";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import BannerImage1 from "../../assets/Property 1=Default (1).png";
import BannerImage2 from "../../assets/Property 1=Default (2).png";
import BannerImage3 from "../../assets/Property 1=Default (3).png";
import BannerImage4 from "../../assets/Property 1=Default (4).png";
import BannerImage5 from "../../assets/Property 1=Default (5).png";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import DoubleHeartsCredentials from '../../assets/DoubleHeartsCredentials.png';

function BannerSettings() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [banners, setBanners] = useState([
        BannerImage1,
        BannerImage2,
        BannerImage3,
        BannerImage4,
        BannerImage5,
    ]);

    const [current, setCurrent] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBanner, setNewBanner] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const handleDeleteBanner = (index) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            const updated = banners.filter((_, i) => i !== index);
            setBanners(updated);
        }
    };

    const handleAddBanner = () => setIsModalOpen(true);

    const handleUploadBanner = () => {
        if (newBanner) {
            setBanners((prev) => [...prev, newBanner]);
            setIsModalOpen(false);
            setNewBanner(null);
        } else {
            alert("Please select an image first!");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewBanner(imageUrl);
        }
    };

    return (
        <div className="flex h-screen bg-pink-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 overflow-y-auto px-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Banner Settings
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Customize landing page banners to keep your site fresh.
                        </p>

                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-8 mb-10 border border-gray-100">
                            <h2 className="text-[20px] font-semibold text-center text-gray-800 mb-6">
                                Banner Preview
                            </h2>

                          
                            {/* Preview Section - Fixed Responsive */}
                            <div className="flex justify-center px-2">
                                <section className="relative w-full max-w-2xl aspect-[16/9] overflow-hidden rounded-xl shadow-lg group transition-transform duration-300 hover:scale-[1.02]">
                                    <img
                                        src={banners[current]}
                                        alt={`Slide ${current + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                                    />

                                    <div className="relative z-10 flex flex-col gap-2 sm:gap-3 md:gap-4 items-center justify-center text-center h-full bg-black/10 px-4 sm:px-6 md:px-8">
                                        <h1 className="text-white text-xs sm:text-base md:text-xl lg:text-2xl font-bold leading-tight">
                                            Find Your Ishtam –<br />
                                            <span className="text-white text-[10px] sm:text-sm md:text-base lg:text-lg font-light">
                                                A Match Made in Heart & Heaven
                                            </span>
                                        </h1>

                                        <p className="text-white italic text-[8px] sm:text-xs md:text-sm max-w-[90%] sm:max-w-xs md:max-w-sm">
                                            Begin your journey with trusted matches, family values, and soulful connections.
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-1 sm:mt-2">
                                            <button className="bg-pink-600 text-white text-[8px] sm:text-[10px] md:text-xs lg:text-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full font-semibold hover:bg-pink-700 transition whitespace-nowrap">
                                                JOIN ISHTAM MARRY
                                            </button>
                                            <button className="border border-white text-white text-[8px] sm:text-[10px] md:text-xs lg:text-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full hover:bg-white hover:text-pink-600 transition whitespace-nowrap">
                                                FREE REGISTRATION
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Thumbnail Manager */}
                            <div className="pt-10">
                                <h3 className="text-[18px] font-semibold text-gray-700 mb-3">
                                    Manage Banners
                                </h3>

                                <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-pink-300">
                                    {/* Add New Banner */}
                                    <div
                                        onClick={handleAddBanner}
                                        className="flex flex-col justify-center items-center w-44 h-28 rounded-2xl border-2 border-dashed border-pink-400 text-pink-500 hover:bg-pink-50 hover:border-pink-500 cursor-pointer transition-all duration-300 flex-shrink-0"
                                    >
                                        <span className="text-4xl font-bold leading-none">
                                            <MdAddPhotoAlternate />
                                        </span>
                                        <p className="text-xs mt-1 font-medium">Add Banner</p>
                                    </div>

                                    {banners.map((banner, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setCurrent(index)}
                                            className={`relative group flex-shrink-0 w-44 h-28 rounded-2xl overflow-hidden shadow-md border ${current === index
                                                ? "border-pink-500 ring-2 ring-pink-200"
                                                : "border-gray-200"
                                                } cursor-pointer hover:shadow-lg transition-all duration-300`}
                                        >
                                            <img
                                                src={banner}
                                                alt={`Banner ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteBanner(index);
                                                }}
                                                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            >
                                                <IoTrashBin className="text-white text-lg hover:text-pink-400 transition" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* Modal for Adding Banner */}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 px-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center rounded-2xl shadow-2xl gap-6 relative w-full max-w-lg">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183] transition-colors"
                        >
                            ✕
                        </button>

                        {/* Logo / Heading */}
                        <div className="flex flex-col justify-center items-center">
                            <img
                                src={DoubleHeartsCredentials}
                                alt="icon"
                                className="w-12 mb-1"
                            />
                            <h1 className="text-[20px] font-semibold text-[#E33183]">
                                ishtam<span className="text-[#490B22]">Marry</span>
                            </h1>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                            Upload New Banner
                        </h3>

                        {/* Image Preview */}
                        {newBanner ? (
                            <img
                                src={newBanner}
                                alt="Preview"
                                className="w-full h-40 object-cover rounded-lg shadow-md border mb-4"
                            />
                        ) : (
                            <div className="w-full h-40 rounded-lg border-2 border-dashed border-pink-300 flex flex-col items-center justify-center text-gray-400 mb-4 hover:border-pink-500 transition">
                                <span className="text-sm">No image selected</span>
                            </div>
                        )}

                        {/* File Input */}
                        <label className="w-full cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="w-full text-center py-3 rounded-lg border-2 border-dashed border-pink-400 text-pink-500 hover:bg-pink-50 hover:border-pink-500 transition">
                                Click to Select Image
                            </div>
                        </label>

                        {/* Action Buttons */}
                        <div className="flex gap-3 w-full pt-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUploadBanner}
                                disabled={!newBanner}
                                className={`flex-1 py-2.5 rounded-lg font-semibold transition-all duration-300 ${newBanner
                                    ? "bg-[#E33183] text-white hover:shadow-lg hover:scale-[1.02]"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Upload Banner
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default BannerSettings;
