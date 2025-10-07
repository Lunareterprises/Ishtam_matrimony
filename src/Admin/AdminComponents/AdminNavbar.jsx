import React, { useState } from "react";

function AdminNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex items-center justify-center py-5 px-5" >
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm h-22 w-full  px-8 rounded-2xl mb-6 border border-white/70 transition-all">
                {/* Left: Logo & Search */}
                <div className="flex items-center gap-4 md:gap-6 w-full">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-red-400 rounded-lg flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800 leading-tight">
                                Athmasakhi
                            </h1>
                            <p className="text-xs text-gray-500 -mt-1">matrimony</p>
                        </div>
                    </div>

                    {/* Search bar (hidden on small screens) */}
                    <div className="relative flex-1 max-w-xl ml-4 hidden md:block">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full rounded-full border border-gray-200 pl-6 pr-12 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer">
                            🔍
                        </div>
                    </div>
                </div>

                {/* Right: Notification + Avatar + Mobile Menu */}
                <div className="flex items-center gap-4 sm:gap-6">
                    {/* Mobile search icon (visible only on small screens) */}
                    <button className="md:hidden text-gray-600 hover:text-gray-900 transition text-xl">
                        🔍
                    </button>

                    {/* Notification icon */}
                    <div className="relative">
                        <button className="w-5 h-5 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100 transition">
                            🔔
                        </button>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                            2
                        </span>
                    </div>

                    {/* Profile avatar */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="Admin avatar"
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200"
                        />
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-gray-700">Admin</p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                        <button className="text-gray-600 hover:text-gray-900 transition text-sm">
                            ▼
                        </button>
                    </div>

                    {/* Dropdown (optional small menu for profile) */}
                    {menuOpen && (
                        <div className="absolute top-20 right-6 bg-white shadow-lg rounded-xl border p-3 text-sm z-50 w-40">
                            <p className="py-1 hover:bg-gray-100 rounded-md px-3 cursor-pointer">
                                Profile
                            </p>
                            <p className="py-1 hover:bg-gray-100 rounded-md px-3 cursor-pointer">
                                Settings
                            </p>
                            <p className="py-1 hover:bg-gray-100 rounded-md px-3 cursor-pointer text-red-600">
                                Logout
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;
