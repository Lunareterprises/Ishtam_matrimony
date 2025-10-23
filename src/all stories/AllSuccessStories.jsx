import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { BsBalloonHeart } from "react-icons/bs";
import realStoriesImg1 from '../assets/Property 1=Frame 1000008792 (1).png'
import realStoriesImg2 from '../assets/Property 1=Frame 1000008795.png'
import realStoriesImg3 from '../assets/Property 1=Frame 1000008797.png'
import realStoriesImg4 from '../assets/Property 11=Frame 1000008796.png'
import realStoriesImg5 from '../assets/Property 12=Frame 1000008796.png'
import realStoriesImg6 from '../assets/Property 17=Frame 1000008796.png'
import Footer from '../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { listAllStoriesApi } from '../Services/allApi';

function AllSuccessStories() {


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
        <div>
            <Nav />
            <div className='pt-20'  >
                <div className='w-full bg-pink-50 h-auto' >
                    <div className='sm:px-35 px-10 flex flex-col gap-2 align-text-left py-10'  >
                        <div className='flex items-center text-[#490B22] gap-1'  >
                            <h1 className='text-[20px]  font-medium'>Every Match is a Story</h1>
                            <span className='pt-1 text-[25px]' >< BsBalloonHeart /></span>
                        </div>

                        <div className='flex flex-col gap-3' >
                            <p>On Ishttam Matrimony, every connection is the beginning of something beautiful.
                                From the first conversation to a lifetime of memories, each couple writes their
                                own unique chapter of love and companionship.
                            </p>

                            <p>Some weddings are small and simple, while others are grand and colorful.
                                Yet, no matter how they are celebrated, the happiness they bring is beyond measure. These journeys remind us that finding the
                                right partner is not just about matching profiles, but about discovering someone who truly complements your life, someone who makes every day brighter.
                                Tell us your story, Your experience can inspire and guide others who are waiting to find their perfect partner through Ishttam Matrimony.
                            </p>

                        </div>

                        <Link to="/add-New-success-Story" >
                            <div className='pt-2 w-full flex sm:justify-start justify-center'  >
                                <button className="py-2 px-4 text-[14px] bg-pink-600 text-white rounded-md font-medium hover:bg-pink-700">
                                    Add your Story
                                </button>
                            </div>
                        </Link>

                    </div>
                </div>

                <div className="flex flex-wrap justify-between w-full gap-y-6 sm:px-35 px-10 sm:py-20 py-10">
                    {successStoriesData.map((item, index) => (
                        <div
                            key={index}
                            className="
          flex-shrink-0 
          w-[85%] max-w-[280px]   /* 👈 cap size on small screens */
          sm:max-w-[400px] 
          md:max-w-[350px] 
          lg:max-w-[350px] overflow-hidden
        "
                        >
                            <img
                               onClick={() => navigate('/view-success-story', { state: { storyData: item } })}
                                src={`https://lunarsenterprises.com:6050${item.ss_image}`}
                                alt={item.name}
                                className="object-cover h-60 w-full shadow-md"
                            />
                            <div className="w-full pt-4">
                                <h2 className="text-xl font-semibold">{item.bride_firstname} & {item.groom_firstname}</h2>
                                <p className="italic text-[16px] break-words"> {item.ss_story.length > 80
                                    ? `${item.ss_story.substring(0, 150)}...`
                                    : item.ss_story}</p>
                                <h3 onClick={() => navigate('/view-success-story', { state: { storyData: item } })}
                                    className="pt-1 underline cursor-pointer">Read more</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllSuccessStories
