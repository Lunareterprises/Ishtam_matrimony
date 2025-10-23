import React, { useEffect, useState } from 'react'
import IshttamProfileCards from '../Components/IshttamProfileCards'
import { Link, useNavigate } from 'react-router-dom';
import { getMyMatchesApi } from '../Services/allApi';
import profilecardimg from '../assets/ishtam-profilecard.jpg'
import { FaCamera } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import DoubleHearts from '../assets/DoubleHearts.png'

function FindYourIshtam() {
    const [myMatchData, setMyMatchData] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setlimit] = useState(12);
    const [search, setSearch] = useState("")


    //for fetching my match data
    const getMyMatch = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            const reqBody = {
                page: 1,
                limit: limit,
                search: search
            };
            const result = await getMyMatchesApi(reqHeader, reqBody)
            console.log("match data ::", result);
            setMyMatchData(result.data.updated)
            console.log("my match data length:",myMatchData.length);
            
        }
        catch (error) {
            console.log("Error in fetching my match", error);
        }
    }

    useEffect(() => {
        getMyMatch()
    }, [])

    const navigate = useNavigate()
    
    const navigateToParnerProfile = (id) => {
        navigate(`/partner-profile/${id}`)
    }


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
            <div className='flex flex-col  sm:items-start items-center  '>
                <h1 className='text-[22px] text-[#530F29] font-semibold' >Find your ishtam ({myMatchData?.length})</h1>
                <p className='text-[16px font-semibold text-[#787878]' >we found {myMatchData?.length} new profiles matching your preferance</p>
            </div>
            <div className='flex flex-col sm:items-start items-center gap-7 w-full'  >
                {
                    myMatchData?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
                            {myMatchData.map((item, index) => (
                                <IshttamProfileCards item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 w-full">
                            <img src={DoubleHearts} alt="" className="h-6 mb-2" />
                            <p className="text-gray-600">No data found</p>
                        </div>
                    )
                }


            </div>


            {myMatchData?.length > 0 &&
                <Link to='/myMatch'>
                    <div className='flex w-full justify-center pt-10' >
                        <button className="border border-[#E33183] text-[#E33183] text-[13px] px-8 py-2 rounded-l-full rounded-r-full hover:bg-[#E33183]  hover:text-white transition">
                            View All
                        </button>
                    </div>
                </Link>
            }
        </div>
    )
}

export default FindYourIshtam
