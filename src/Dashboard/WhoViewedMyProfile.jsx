import React, { useEffect, useState } from 'react'
import IshttamProfileCards from '../Components/IshttamProfileCards'
import { listVisitedHistoryApi } from '../Services/allApi';
import { Link, useNavigate } from 'react-router-dom';
import DoubleHearts from '../assets/DoubleHearts.png';
import { useAuth } from '../AuthContext/AuthContext';

function WhoViewedMyProfile() {
    const [whoViewedMyProfile, setWhoViewedMyProfile] = useState([])
    const { user } = useAuth();
    const token = user?.token
    const getWhoViewedMyProfile = async () => {
        try {
            const reqBody = { type: "visited_me" };

            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const result = await listVisitedHistoryApi(reqHeader, reqBody)
            console.log("who viewed my profile data ::", result);
            setWhoViewedMyProfile(result.data.data)
        }
        catch (error) {
            console.log("Error in fetching my match", error);
        }
    }

    useEffect(() => {
        getWhoViewedMyProfile()
    }, [])

    const navigate = useNavigate()

    const navigateToParnerProfile = (id) => {
        navigate(`/partner-profile/${id}`)
    }

    return (
        <div className='pt-10' >
            <div className='flex flex-col  items-center sm:items-start'>
                <h1 className='text-[22px] text-[#530F29] font-semibold' >Who viewed my profile ({whoViewedMyProfile?.length})</h1>
                <p className='text-[16px font-semibold text-[#787878]' >Peoples viewed your your profile in the last 3 days</p>
            </div>
            <div className='flex items-center flex-col gap-7 w-full'  >

                {
                    whoViewedMyProfile?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-10">
                            {whoViewedMyProfile.map((item, index) => (
                                <IshttamProfileCards item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 w-full">
                            <img src={DoubleHearts} alt="" className="h-6 mb-2" />
                            <p className="text-gray-600">No visitors yet</p>
                        </div>
                    )
                }

                {
                    whoViewedMyProfile?.length > 0 &&
                    <Link to='/profile-vists' >
                        <div className='flex justify-center' >
                            <button className="border border-[#E33183] text-[#E33183] text-[13px] px-8 py-2 rounded-l-full rounded-r-full  hover:bg-[#E33183]  hover:text-white transition">
                                View All
                            </button>
                        </div>
                    </Link>
                }

            </div>
        </div>
    )
}

export default WhoViewedMyProfile
