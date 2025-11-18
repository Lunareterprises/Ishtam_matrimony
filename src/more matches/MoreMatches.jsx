import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import DashboardNav from '../Components/DashboardNav'
import DashboardHeader from '../Components/DashboardHeader'
import ChatMessages from '../Components/ChatMessages'
import { getMoreMatcheshApi } from '../Services/allApi'
import IshttamProfileCards from '../Components/IshttamProfileCards'
import DoubleHearts from "../assets/DoubleHearts.png";
import { useAuth } from '../AuthContext/AuthContext'

function MoreMatches() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [moreMatchesData, setMoreMatchesData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { user } = useAuth();
    const token = user?.token

    const getMoreMatches = async (pageNumber = 1) => {
        try {
            setLoading(true);


            const reqHeader = { Authorization: `Bearer ${token}` };
            const reqBody = {
                page: pageNumber,
                limit,
                search: ""
            };

            const result = await getMoreMatcheshApi(reqHeader, reqBody);
            const fetched = result?.data?.updated || [];

            // If less data than limit → no more pages
            if (fetched.length < limit) {
                setHasMore(false);
            }

            // Append new results
            if (pageNumber === 1) {
                setMoreMatchesData(fetched);
            } else {
                setMoreMatchesData(prev => [...prev, ...fetched]);
            }

        } catch (error) {
            console.log("Error fetching more matches", error);
        } finally {
            setLoading(false);
        }
    };

    // Load page 1 initially
    useEffect(() => {
        getMoreMatches(1);
    }, []);

    // Handle "View More"
    const handleViewMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        getMoreMatches(nextPage);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="hidden lg:block w-64">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                <DashboardNav />

                <div className="flex flex-col justify-center">
                    <DashboardHeader />

                    {/* Page content */}
                    <div className="flex w-full md:pl-10 sm:px-0 px-2 py-10 sm:py-20">
                        <div className="max-w-[1000px] w-full px-4 sm:px-10">

                            {/* Title */}
                            <div className="flex flex-col sm:items-start items-center">
                                <h1 className="text-[22px] text-[#530F29] font-semibold">More Matches</h1>
                                <p className="text-[16px] font-semibold text-[#787878]">
                                    Explore More Recommended Profiles
                                </p>
                            </div>

                            {/* Results */}
                            <div className="flex flex-col sm:items-start items-center gap-7 w-full">

                                {moreMatchesData.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
                                        {moreMatchesData.map((item, index) => (
                                            <IshttamProfileCards key={index} item={item} />
                                        ))}
                                    </div>
                                ) : (
                                    !loading && (
                                        <div className="flex flex-col items-center justify-center py-20 w-full">
                                            <img src={DoubleHearts} alt="" className="h-6 mb-2" />
                                            <p className="text-gray-600">No data found</p>
                                        </div>
                                    )
                                )}

                                {/* Loader */}
                                {loading && (
                                    <div className="flex justify-center py-5">
                                        <div className="animate-spin h-8 w-8 border-t-2 border-[#E33183] rounded-full"></div>
                                    </div>
                                )}

                                {/* View More button */}
                                {!loading && hasMore && moreMatchesData.length > 10 && (
                                    <button
                                        onClick={handleViewMore}
                                        className="border border-[#E33183] text-[#E33183] text-[13px] px-8 py-2 rounded-full hover:text-black transition"
                                    >
                                        View More
                                    </button>
                                )}

                            </div>
                        </div>

                        <ChatMessages />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoreMatches;
