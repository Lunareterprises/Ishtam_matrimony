import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminComponents/AdminNavbar";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

import DoubleHeartsCredentials from "../../assets/DoubleHeartsCredentials.png";
import {
    deleteBannerApi,
    insertBannerApi,
    listAdminBannerApi,
    listBannersApi,
    updateBannerStatusApi,
} from "../../Services/allApi";
import Swal from "sweetalert2";

function BannerSettings() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [banners, setBanners] = useState([]);
    const [bannerPreview, setBannerPreview] = useState([]);
    const [current, setCurrent] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBanner, setNewBanner] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [validate, setValidate] = useState("");


    useEffect(() => {
        if (bannerPreview.length === 0) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % bannerPreview.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [bannerPreview]);

    const handleAddBanner = () => setIsModalOpen(true);

    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 1️⃣ Validate file type
        const validTypes = ["image/jpeg", "image/png"];
        if (!validTypes.includes(file.type)) {
            Swal.fire({
                title: "Invalid File Type",
                text: "Only JPG and PNG formats are allowed.",
                icon: "warning",
                confirmButtonColor: "#E33183",
            });
            e.target.value = ""; // reset input
            return;
        }

        // 2️⃣ Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            Swal.fire({
                title: "File Too Large",
                text: "Please upload an image smaller than 5MB.",
                icon: "warning",
                confirmButtonColor: "#E33183",
            });
            e.target.value = "";
            return;
        }

        // 3️⃣ Validate aspect ratio
        const img = new Image();
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            const ratio = width / height;

            console.log("Image dimensions:", width, height, "Ratio:", ratio.toFixed(2));

            // Example: Allow around 2:1 ratio (e.g., 1.8 to 2.2)
            if (ratio < 1.8 || ratio > 2.2) {
                Swal.fire({
                    title: "Invalid Image Ratio",
                    text: "Please upload an image with a 2:1 ratio (e.g., 1440x720).",
                    icon: "warning",
                    confirmButtonColor: "#E33183",
                });
                e.target.value = "";
                return;
            }

            // ✅ All validations passed
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            setNewBanner(imageUrl);
        };

        // Trigger image loading
        img.src = URL.createObjectURL(file);
    };


    const handleUploadBanner = async () => {
        if (!newBanner) {
            Swal.fire({
                title: "No Image Selected",
                text: "Please select an image before uploading.",
                icon: "warning",
            });
            return;
        }

        await insertBanner();
        setIsModalOpen(false);
        setNewBanner(null);
    };

    // ✅ Upload banner
    const insertBanner = async () => {
        try {
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append("file", selectedFile);
            const token = sessionStorage.getItem("token");
            const reqHeader = { Authorization: `Bearer ${token}` };
            const result = await insertBannerApi(reqHeader, formData);
            console.log(result);

            if (result?.data?.result === true) {
                Swal.fire({
                    title: "Banner Uploaded!",
                    text: "The banner has been uploaded successfully.",
                    icon: "success",
                    iconColor: '#E33183',
                    confirmButtonColor: "#E33183",
                });
                listBanners();
                listAdminBanners();
            }
            else {
                Swal.fire({
                    title: "Failed!",
                    text: result?.data?.message,
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        } catch (error) {
            console.log("Error inserting banner:", error);
            Swal.fire({
                title: "Upload Failed",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonColor: "#E33183",
            });
        }
    };

    // ✅ Public banner list (for preview carousel)
    const listBanners = async () => {
        try {
            const result = await listBannersApi();
            console.log("Result for list banners ::: ", result);

            const bannersFromApi =
                result?.data?.data?.map((item) => ({
                    id: item.b_id,
                    banner: `https://lunarsenterprises.com:6050${item.b_file}`,
                })) || [];
            setBannerPreview(bannersFromApi);
            console.log("listBanners", listBanners);
        } catch (error) {
            console.log("Error fetching banners:", error);
        }
    };

    // ✅ Admin banner list
    const listAdminBanners = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = { Authorization: `Bearer ${token}` };

            const result = await listAdminBannerApi(reqHeader);
            const adminBannerFromApi =
                result?.data?.data?.map((item) => ({
                    id: item.b_id,
                    b_status: item.b_status,
                    banner: `https://lunarsenterprises.com:6050${item.b_file}`,
                })) || [];
            setBanners(adminBannerFromApi);
        } catch (error) {
            console.log("Error listing admin banners:", error);
        }
    };

    // ✅ Delete banner
    const handleDeleteBanner = async (b_id) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "This banner will be permanently deleted.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#E33183",
                cancelButtonColor: "#aaa",
                confirmButtonText: "Yes, delete it!",
            });

            if (!confirm.isConfirmed) return;

            const reqBody = { banner_id: b_id };
            const token = sessionStorage.getItem("token");
            const reqHeader = { Authorization: `Bearer ${token}` };
            const result = await deleteBannerApi(reqHeader, reqBody);
            console.log("Delete for banner ", result);

            if (result?.data?.result === true) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Banner deleted successfully.",
                    icon: "success",
                    iconColor: '#E33183',
                    confirmButtonColor: "#E33183",
                });
                listBanners();
                listAdminBanners();
            } else {
                Swal.fire({
                    title: "Failed!",
                    text: result?.data?.message,
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
                result?.data?.message
            }
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                text: "Something went wrong, please try again!",
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    };

    // ✅ Update banner status
    const updateBannerStatus = async (b_id) => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = { Authorization: `Bearer ${token}` };
            const result = await updateBannerStatusApi(reqHeader, { banner_id: b_id });
            if (result?.data?.result === true) {
                Swal.fire({
                    title: "Updated!",
                    text: "Banner status updated successfully.",
                    icon: "success",
                    iconColor: '#E33183',
                    confirmButtonColor: "#E33183",
                });
                listBanners();
                listAdminBanners();
            }
            else {
                Swal.fire({
                    title: "Failed!",
                    text: result?.data?.message,
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
                result?.data?.message
            }
        } catch (error) {
            Swal.fire({
                title: "Failed!",
                text: "Something went wrong, please try again!",
                icon: 'error',
                confirmButtonText: 'Retry',
            });
            result?.data?.message
        }
    };

    useEffect(() => {
        listBanners();
        listAdminBanners();
    }, []);

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

                            <div className="flex flex-col  items-center justify-center  py-5"  >
                                <h2 className="text-[20px] font-semibold text-center text-gray-800">
                                    Banner Preview
                                </h2>
                                <p className="text-gray-500">
                                    A glimpse of banners gracing your homepage
                                </p>
                            </div>


                            {/* ✅ Carousel Preview */}
                            <div className="flex justify-center px-2">
                                <section className="relative w-full max-w-2xl aspect-[16/9] overflow-hidden rounded-xl shadow-lg group transition-transform duration-300">
                                    {bannerPreview.length > 0 && (
                                        <img
                                            src={bannerPreview[current]?.banner}
                                            alt={`Slide ${current + 1}`}
                                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                                        />
                                    )}
                                </section>
                            </div>

                            {/* ✅ Manage Banners */}
                            <div className="pt-10">
                                <div className="flex flex-col  items-start  py-5" >
                                    <h3 className="text-[18px] font-semibold text-gray-700">
                                        Manage Banners
                                    </h3>
                                    <p className="text-gray-500">
                                        Control which banners appear on your homepage
                                    </p>
                                </div>


                                <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-pink-300">
                                    {/* Add New Banner */}
                                    <div
                                        onClick={handleAddBanner}
                                        className="flex flex-col justify-center items-center w-44 h-28 rounded-2xl border-2 border-dashed border-pink-400 text-pink-500 hover:bg-pink-50 hover:border-pink-500 cursor-pointer transition-all duration-300 flex-shrink-0"
                                    >
                                        <MdAddPhotoAlternate className="text-4xl" />
                                        <p className="text-xs mt-1 font-medium">Add Banner</p>
                                    </div>

                                    {banners.map((banner, index) => (
                                        <div
                                            key={banner.id || index}
                                            onClick={() => setCurrent(index)}
                                            className={`relative group flex-shrink-0 w-44 h-28 rounded-2xl overflow-hidden shadow-md border ${current === index
                                                ? "border-pink-500 ring-2 ring-pink-200"
                                                : "border-gray-200"
                                                } cursor-pointer hover:shadow-lg transition-all duration-300`}
                                        >
                                            <img
                                                src={banner.banner}
                                                alt={`Banner ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                {/* for displaying delete icon for active banners */}

                                                <button
                                                    onClick={() => handleDeleteBanner(banner.id)}
                                                    className="p-2 transition"
                                                >
                                                    <IoTrashBin className="text-white text-lg hover:text-pink-400" />
                                                </button>
                                                {
                                                    banner.b_status === "active" ?
                                                        <button
                                                            onClick={() => updateBannerStatus(banner.id)}
                                                            className="p-2 transition"
                                                        >
                                                            <FaEyeSlash className="text-white text-2xl hover:text-pink-400" />
                                                        </button> :
                                                        <button
                                                            onClick={() => updateBannerStatus(banner.id)}
                                                            className="p-2 transition"
                                                        >
                                                            <FaEye className="text-white text-2xl hover:text-pink-400" />
                                                        </button>
                                                }

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

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

                        <div className="flex flex-col items-center justify-center"  >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                                Upload New Banner
                            </h3>
                        </div>


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
