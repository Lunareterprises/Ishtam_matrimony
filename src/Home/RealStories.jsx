import React, { useEffect, useState } from 'react'
import realStoriesImg1 from '../assets/Property 1=Frame 1000008792 (1).png'
import realStoriesImg2 from '../assets/Property 1=Frame 1000008795.png'
import realStoriesImg3 from '../assets/Property 1=Frame 1000008797.png'
import realStoriesImg4 from '../assets/Property 11=Frame 1000008796.png'
import realStoriesImg5 from '../assets/Property 12=Frame 1000008796.png'
import realStoriesImg6 from '../assets/Property 17=Frame 1000008796.png'
import { MdArrowOutward } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { listAllStoriesApi } from '../Services/allApi'



function RealStories() {
    const [successStoriesData, setSuccessStoriesData] = useState([]);

    const fetchSuccessStories = async () => {
        try {
            const result = await listAllStoriesApi();
            setSuccessStoriesData(result.data.data); // ✅ use the array inside
            console.log("consoling success sotories result ::", result.data.data);
        } catch (error) {
            console.log("Error in fetching success stories", error);
        }
    };

    const navigate = useNavigate()
    const navigateToStoryView = () => {
        navigate('/view-success-story')
    }

    useEffect(() => {
        fetchSuccessStories()
    }, [])


    return (
        <div className='flex flex-col items-center sm:py-15 py-10' >
            <div className='flex flex-col items-center text-center gap-4' >
                <h1 className="text-3xl font-semibold text-[#490b22]">
                    💕Real Stories, Real Love
                </h1>
                <p className='max-w-[1200px] text-[18px] sm:text-[20px] px-7 text-[#490b22]' >"Be inspired by the couples who trusted Ishttam Marry to find their faith-filled soulmate."</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 px-7 pb-7 pt-[50px]">
                {
                    successStoriesData?.length > 0 ? (
                        successStoriesData.map((item, index) => (
                            <div
                                key={index}
                                className="w-full sm:max-w-[400px] md:max-w-[380px] lg:max-w-[380px]"
                            >
                                <img
                                    src={`https://lunarsenterprises.com:6050${item.ss_image}`}
                                    alt={item.bride_firstname}
                                    className="w-full h-auto rounded-lg shadow-md "
                                    onClick={() => navigateToStoryView()}
                                />
                                <div className="px-1 pt-4">
                                    <h2 className="text-xl font-semibold">
                                        {item.bride_firstname} & {item.groom_firstname}
                                    </h2>
                                    <p className="italic text-[16px]">"{item.ss_story}"</p>
                                    <h3 onClick={() => navigateToStoryView()} className="pt-2 underline cursor-pointer text-[#5A0A1D]">
                                        Read more
                                    </h3>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No stories found</p>
                    )
                }

            </div>
            <div className='flex justify-center pt-6' >
                <Link to="/all-Success-Stories" >
                    <button className="border border-transparent font-semibold hover:border-[#490b22] text-[#490b22] h-12 text-[13px] sm:text-[15px]  w-70 sm:w-85 sm:h-14 rounded-full hover:text-[#490b22a7] transition-colors duration-300 flex justify-center items-center gap-1">
                        See all stories & add your story<span><MdArrowOutward /></span>
                    </button>
                </Link>
            </div>

        </div>

    )
}

export default RealStories