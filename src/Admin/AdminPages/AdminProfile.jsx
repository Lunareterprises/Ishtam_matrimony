import React, { useState } from 'react'
import AdminNavbar from '../AdminComponents/AdminNavbar';
import AdminSidebar from '../AdminComponents/AdminSidebar';

function AdminProfile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-pink-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 overflow-y-auto px-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Admin Profile Management
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Keep your admin profile up to date by managing your details and settings.
                        </p>

                        <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Pending Profile Approvals
                                </h2>

                            </div>

                            <div className="overflow-x-auto">

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile
