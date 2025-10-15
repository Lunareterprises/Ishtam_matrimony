import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminComponents/AdminNavbar';
import AdminSidebar from '../AdminComponents/AdminSidebar';
import { getEnquiriesApi } from '../../Services/allApi';

function Enquiries() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [enquiryData, setEnquiryData] = useState([])
    const pendingProfiles = [
        {
            id: "#12567",
            name: "Aarav K.",
            age: 29,
            gender: "Male",
            location: "Bangalore",
            date: "26 Aug 25",
        },
        {
            id: "#12568",
            name: "Aarav K.",
            age: 29,
            gender: "Male",
            location: "Bangalore",
            date: "26 Aug 25",
        },
        {
            id: "#12569",
            name: "Aarav K.",
            age: 29,
            gender: "Male",
            location: "Bangalore",
            date: "26 Aug 25",
        },
    ];


    //for managing timings
    function getTimeAgo(isoDate) {
        const now = new Date();
        const createdAt = new Date(isoDate);
        const diffInSeconds = Math.floor((now - createdAt) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    }


    // for listing enquiries
    const listEnquries = async () => {
        try {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const result = await getEnquiriesApi(reqHeader);
            console.log(result);
            setEnquiryData(result.data.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listEnquries()
    }, [])

    return (
        <div className="flex h-screen bg-pink-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 overflow-y-auto px-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Enquiry Management
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Check and handle all incoming enquiries.
                        </p>

                        <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Pending Profile Approvals
                                </h2>

                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[640px]">
                                    <thead>
                                        <tr className="bg-gray-800 text-white text-sm">
                                            <th className="p-3 rounded-l-lg">S.No</th>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Email</th>
                                            <th className="p-3">Phone</th>
                                            <th  className="p-3" >Enquired At</th>
                                            <th className="p-3">Message</th>

                                        </tr>
                                    </thead>
                                    <tbody className="text-[14px]" >
                                        {enquiryData.map((item, i) => (
                                            <tr
                                                key={i}
                                                className="border-b last:border-b-0 hover:bg-pink-50 transition-colors"
                                            >
                                                <td className="p-3 text-gray-700">
                                                    {item.cu_id}
                                                </td>
                                                <td className="p-3 text-gray-700">{item.cu_name}</td>
                                                <td className="p-3 text-gray-700">{item.cu_phone}</td>
                                                <td className="p-3 text-gray-700">{item.cu_phone}</td>
                                                <td className="p-3 text-gray-700">{getTimeAgo(item.cu_created_at)}</td>
                                                <td className="p-3 text-gray-700">{item.cu_message}</td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Enquiries
