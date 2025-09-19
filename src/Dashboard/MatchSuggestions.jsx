import React, { useEffect, useState } from 'react'
import IshttamProfileCards from '../Components/IshttamProfileCards'
import { Link, useNavigate } from 'react-router-dom';
import { getTodaysMatchApi } from '../Services/allApi';
import profilecardimg from '../assets/ishtam-profilecard.jpg'
import { FaCamera } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import DoubleHearts from '../assets/DoubleHearts.png'

function MatchSuggestions() {
    const [todaysMatchData, setTodaysMatchData] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setlimit] = useState(12);
    const [search, setSearch] = useState("")
    const navigate = useNavigate()


    //for fetching todays match data
    const getTodaysMatch = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            const reqBody = {
                page: 1,
                limit: limit,
                search: " "
            };
            const result = await getTodaysMatchApi(reqHeader, reqBody)
            console.log("todays match data ::", result);
            setTodaysMatchData(result.data.data)
        }
        catch (error) {
            console.log("Error in fetching todays match", error);
        }
    }

    //for navigating to profile view page with profile id
    const navigateToParnerProfile = (id) => {
        navigate(`/partner-profile/${id}`)
    }

    useEffect(() => {
        getTodaysMatch()
    }, [])


    //for calculating age
    const calculateAge = (dob) => {
        if (!dob) return null;

        const birthDate = new Date(dob);   // "2025-09-17T04:07:10.000Z"
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        // adjust if birthday hasn't happened yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    return (
        <div className='pt-10' >
            <div className='flex flex-col items-center sm:items-start'>
                <h1 className='text-[22px] text-[#530F29] font-semibold' >Match Suggestions (Todays Matches-{todaysMatchData?.length})</h1>

            </div>

            <div className="flex items-center flex-col gap-7 w-full">
                {/* profile cards */}
                {todaysMatchData?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-10 w-full">
                        {todaysMatchData.map((item, index) => (
                           <IshttamProfileCards item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 w-full">
                        <img src={DoubleHearts} alt="" className="h-6 mb-2" />
                        <p className="text-gray-600">No data found</p>
                    </div>
                )}
            </div>


            {todaysMatchData?.length > 0 &&
                <Link to='/todaysMatch'  >
                    <div className='flex justify-center' >
                        <button className="border border-[#E33183] text-[#E33183] text-[13px] px-8 py-2 rounded-l-full rounded-r-full  hover:text-black transition">
                            View All
                        </button>
                    </div>
                </Link>
            }

        </div>
    )
}

export default MatchSuggestions
