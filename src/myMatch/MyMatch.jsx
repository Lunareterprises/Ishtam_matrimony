import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import DashboardNav from "../Components/DashboardNav";
import ChatMessages from "../Components/ChatMessages";
import { FaSearch } from "react-icons/fa";
import { PiSlidersBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { getMyMatchesApi } from "../Services/allApi";
import DoubleHearts from "../assets/DoubleHearts.png";
import IshttamProfileCards from "../Components/IshttamProfileCards";
import MyMatchHeader from "./MyMatchHeader";

function MyMatch() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myMatchData, setMyMatchData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Fetch my matches
  const getMyMatch = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const reqBody = {
        page,
        limit,
        search: search.trim(),
      };
      const result = await getMyMatchesApi(reqHeader, reqBody);
      console.log("my match data ::", result);
      setMyMatchData(result?.data?.updated || []);
    } catch (error) {
      console.log("Error in fetching my match", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch data initially & when search changes (with debounce)
  useEffect(() => {
    const delay = setTimeout(() => {
      getMyMatch();
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const navigateToPartnerProfile = (id) => {
    navigate(`/partner-profile/${id}`);
  };

  return (
    <div className="flex">
      {/* Sidebar - desktop */}
      <div className="hidden lg:block w-64">
        <Sidebar />
      </div>

      {/* Sidebar - mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 " onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-white z-50 h-full ">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <DashboardNav />

        <div className="flex flex-col justify-center">
          {/* ✅ Search Header (desktop) */}
          <MyMatchHeader onSearch={(value) => setSearch(value)} />

          {/* Page content */}
          <div className="flex w-full md:pl-10 sm:px-0 px-2 py-10 sm:py-20">
            <div className="max-w-[1000px] w-full px-4 sm:px-10">
              {/* ✅ Mobile search bar */}
              <div className="flex px-10 lg:hidden items-center justify-center gap-3 pt-18 pb-8 w-full">
                <div className="relative w-full ">
                  <input
                    type="text"
                    placeholder="Search Profile ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-full border border-[#E4E4E7] pl-12 pr-4 py-2 text-[#787878] placeholder-gray-400 focus:outline-none"
                  />
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
               {/*  <div className="w-10 h-10 border border-[#E4E4E7] rounded-md flex items-center justify-center">
                  <PiSlidersBold className="text-xl text-[#787878]" />
                </div> */}
              </div>

              {/* ✅ Title and Count */}
              <div className="pt-10">
                <div className="flex flex-col sm:items-start items-center">
                  <h1 className="text-[22px] text-[#530F29] font-semibold">
                    My Match
                  </h1>
                  <p className="text-[16px] font-semibold text-[#787878] text-center">
                    We found {myMatchData?.length} new profiles matching your preference
                  </p>
                </div>

                {/* ✅ Results */}
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#E33183]"></div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:items-start items-center gap-7 w-full">
                    {myMatchData?.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
                        {myMatchData.map((item, index) => (
                          <IshttamProfileCards
                            key={index}
                            item={item}
                            onClick={() => navigateToPartnerProfile(item.id)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 w-full">
                        <img src={DoubleHearts} alt="" className="h-6 mb-2" />
                        <p className="text-gray-600">No data found</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ✅ View More button (pagination ready) */}
                {myMatchData.length > 10 && !loading && (
                  <div className="flex w-full justify-center pt-10">
                    <button
                      onClick={() => setPage((prev) => prev + 1)}
                      className="border border-[#E33183] text-[#E33183] text-[13px] px-8 py-2 rounded-full hover:text-black transition"
                    >
                      View more
                    </button>
                  </div>
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

export default MyMatch;
