import React from 'react'
import realStoriesImg1 from '../assets/Property 1=Frame 1000008792 (1).png'
import realStoriesImg2 from '../assets/Property 1=Frame 1000008795.png'
import realStoriesImg3 from '../assets/Property 1=Frame 1000008797.png'
import realStoriesImg4 from '../assets/Property 11=Frame 1000008796.png'
import realStoriesImg5 from '../assets/Property 12=Frame 1000008796.png'
import realStoriesImg6 from '../assets/Property 17=Frame 1000008796.png'



function RealStories() {

    const realStories = [
        {
            image: realStoriesImg1,
            name: 'Anita & Joseph',
            story: 'Through Ishttam Marry. I found a partner who shares my faith and values. We felt spiritually connected from the first meeting.'
        },
        {
            image: realStoriesImg2,
            name: 'Sarah & Michael',
            story: 'Ishttam Marry introduced me to my soulmate. Our shared beliefs and goals have strengthened our relationship immensely.'
        },
        {
            image: realStoriesImg3,
            name: 'Maria & David',
            story: 'Finding love through Ishttan Marry was a blessing. We not only bonded over our traditions but also built a future together.'
        },
        {
            image: realStoriesImg4,
            name: 'Anita & Joseph',
            story: 'Through Ishttam Marry. I found a partner who shares my faith and values. We felt spiritually connected from the first meeting.'
        },
        {
            image: realStoriesImg5,
            name: 'Sarah & Michael',
            story: 'Ishttam Marry introduced me to my soulmate. Our shared beliefs and goals have strengthened our relationship immensely.'
        },
        {
            image: realStoriesImg6,
            name: 'Maria & David',
            story: 'Finding love through Ishttan Marry was a blessing. We not only bonded over our traditions but also built a future together.'
        },

    ];


    return (
        <div className='flex flex-col items-center pb-6' >
            <div className='flex flex-col items-center text-center gap-4' >
                <h1 className="text-3xl font-semibold text-[#490b22] sm:pt-[100px] pt-[60px]">
                    💕Real Stories, Real Love
                </h1>
                <p className='max-w-[1200px] text-[18px] sm:text-[20px] px-7 text-[#490b22]' >"Be inspired by the couples who trusted Ishttam Marry to find their faith-filled soulmate."</p>
            </div>
            <div className='pt-[50px]' >
            </div>

            <div className="flex flex-wrap justify-center gap-6 px-7 pb-7">
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
                            <h3 className="pt-2 underline">Read more</h3>
                        </div>
                    </div>
                ))}
            </div>


        </div>

    )
}

export default RealStories