import React from 'react'
import Nav from '../Components/Nav'
import { BsBalloonHeart } from "react-icons/bs";
import realStoriesImg1 from '../assets/Property 1=Frame 1000008792 (1).png'
import realStoriesImg2 from '../assets/Property 1=Frame 1000008795.png'
import realStoriesImg3 from '../assets/Property 1=Frame 1000008797.png'
import realStoriesImg4 from '../assets/Property 11=Frame 1000008796.png'
import realStoriesImg5 from '../assets/Property 12=Frame 1000008796.png'
import realStoriesImg6 from '../assets/Property 17=Frame 1000008796.png'
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

function AllSuccessStories() {
    const realStories = [
        {
            image: realStoriesImg1,
            name: 'Anita & Joseph',
            story: 'Through Ishttam Marry. I found a partner who shares my faith and values. We felt spiritually connected from the first meeting.'
        },
        {
            image: realStoriesImg2,
            name: 'Sarah & Michael',
            story: '"Ishttam Marry introduced me to my soulmate. Our shared beliefs and goals have strengthened our relationship immensely."'
        },
        {
            image: realStoriesImg3,
            name: 'Maria & David',
            story: '"Finding love through Ishttan Marry was a blessing. We not only bonded over our traditions but also built a future together."'
        },
        {
            image: realStoriesImg4,
            name: 'Anita & Joseph',
            story: 'Through Ishttam Marry. I found a partner who shares my faith and values. We felt spiritually connected from the first meeting.'
        },
        {
            image: realStoriesImg5,
            name: 'Sarah & Michael',
            story: '"Ishttam Marry introduced me to my soulmate. Our shared beliefs and goals have strengthened our relationship immensely."'
        },
        {
            image: realStoriesImg6,
            name: 'Maria & David',
            story: '"Finding love through Ishttan Marry was a blessing. We not only bonded over our traditions but also built a future together."'
        },

    ];

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
                    {realStories.map((item, index) => (
                        <div
                            key={index}
                            className="w-full sm:max-w-[400px] md:max-w-[380px] lg:max-w-[380px]"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-auto"
                            />
                            <div className="px-1 pt-4">
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="italic text-[16px]">"{item.story}"</p>
                                <h3 className="pt-1 underline">Read more</h3>
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
