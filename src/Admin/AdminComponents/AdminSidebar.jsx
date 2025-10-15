import React from "react";
import {
    FaTachometerAlt,
    FaUser,
    FaCreditCard,
    FaUserCog,
    FaSignOutAlt,
    FaHeart,

} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import IshtamMarry_Logo from '../../assets/Frame 1000008772.png';
import { BsTelephoneFill } from "react-icons/bs";
import { MdViewCarousel } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BiHomeHeart } from "react-icons/bi";


function AdminSidebar({ isOpen, setIsOpen }) {

    const navigate = useNavigate()
    const handleLogout = async (e) => {
        e.preventDefault()

        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem("token")
                navigate('/')
            }
        });

    }
    return (
        <>
            {/* ✅ Desktop Sidebar — unchanged */}
            <div className="md:px-5 hidden md:block">
                <aside className="flex flex-col w-59 bg-white shadow-sm py-8 px-4 rounded-xl">
                    <nav className="flex-1">
                        <ul className="space-y-3">
                            {/* <li
                                    key={i}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition ${item.label === "User Safety"
                                            ? "bg-pink-100 text-pink-700 font-medium"
                                            : ""
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </li> */}

                            <Link to='/admin-dashboard'
                                className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition '
                            >
                                <span className="text-lg"><FaTachometerAlt /></span>
                                <span>Dashboard</span>
                            </Link>

                            <Link to="/userManagement"
                                className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition '
                            >
                                <span className="text-lg"><FaUser /></span>
                                <span>User Management</span>
                            </Link>

                            <Link to="/banner-settings"
                                className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition '
                            >
                                <span className="text-lg"><FaImage /></span>
                                <span>Banner Settings</span>
                            </Link>

                            <Link to="/admin-succestories"
                                className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition '
                            >
                                <span className="text-lg"><FaHeart /></span>
                                <span>Success Stories</span>
                            </Link>

                            <Link to='/subscription-management'
                                className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition '
                            >
                                <span className="text-lg"><FaCreditCard /></span>
                                <span>Subscription plans</span>
                            </Link>

                            <Link to="/enquiries"
                                className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition '
                            >
                                <span className="text-lg"><BsTelephoneFill /></span>
                                <span>Enquiries</span>
                            </Link>

                            <Link to='/admin-profile'
                                className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition '
                            >
                                <span className="text-lg"><FaUserCog /></span>
                                <span>Admin Roles</span>
                            </Link>
                            <Link to='/'
                                className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition '
                            >
                                <span className="text-lg"><BiHomeHeart /></span>
                                <span>Back to Home</span>
                            </Link>

                            <Link onClick={handleLogout}
                                className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition '
                            >
                                <span className="text-lg"><FaSignOutAlt /></span>
                                <span>Logout</span>
                            </Link>
                        </ul>
                    </nav>
                </aside>
            </div>

            {/* ✅ Mobile Sidebar Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:hidden`}
            >
                <div className="flex items-center justify-between px-4 py-5 border-b-3 border-gray-200">
                    <img
                        src={IshtamMarry_Logo} alt="logo" className="w-[140px] h-auto"
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-2xl text-gray-600"
                    >
                        <RxCross2 className="text-[23px] text-[#E33183]" />
                    </button>
                </div>

                <nav className="p-4">
                    <ul className="space-y-4">

                        <Link to='/admin-dashboard'
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition ">
                            <span className="text-lg"><FaTachometerAlt /></span>
                            <span>Dashboard</span>
                        </Link>

                        <Link to='/userManagement'
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition ">
                            <span className="text-lg"><FaUser /></span>
                            <span>User Management</span>
                        </Link>

                        <Link to='/banner-settings'
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition ">
                            <span className="text-lg"><FaImage /></span>
                            <span>Banner Settings</span>
                        </Link>

                        <Link to='/admin-succestories'
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition ">
                            <span className="text-lg"><FaHeart /></span>
                            <span>Success Stories</span>
                        </Link>

                        <Link to='/subscription-management'
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition ">
                            <span className="text-lg"><FaCreditCard /></span>
                            <span>Subscription plans</span>
                        </Link>

                        <Link to='/enquiries'
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition ">
                            <span className="text-lg"><BsTelephoneFill /></span>
                            <span>Enquiries</span>
                        </Link>

                        <Link to='/admin-profile'
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition ">
                            <span className="text-lg"><FaUserCog /></span>
                            <span>Admin Roles</span>
                        </Link>
                        <Link to="/"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition ">
                            <span className="text-lg"><BiHomeHeart /></span>
                            <span>Back to Home</span>
                        </Link>

                        <Link onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-pink-100 hover:text-pink-700 cursor-pointer transition ">
                            <span className="text-lg"><FaSignOutAlt /></span>
                            <span>Logout</span>
                        </Link>
                    </ul>
                </nav>
            </div>

            {/* ✅ Background Overlay when open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
}

export default AdminSidebar;
