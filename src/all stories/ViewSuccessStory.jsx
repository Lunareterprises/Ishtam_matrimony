import React from 'react'
import Nav from '../Components/Nav'
import { BsBalloonHeart } from 'react-icons/bs'
import realStoriesImg3 from '../assets/Property 1=Frame 1000008797.png'
import realStoriesImg1 from '../assets/Property 1=Frame 1000008792 (1).png'
import realStoriesImg2 from '../assets/Property 1=Frame 1000008795.png'

import realStoriesImg4 from '../assets/Property 11=Frame 1000008796.png'
import realStoriesImg5 from '../assets/Property 12=Frame 1000008796.png'
import realStoriesImg6 from '../assets/Property 17=Frame 1000008796.png'
import Footer from '../Components/Footer'

function ViewSuccessStory() {

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
            <div className="flex flex-col md:flex-row bg-[#f7f7fb] rounded-lg shadow p-4 md:p-6 gap-6">
              {/* Left Section - Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={realStoriesImg3}
                  alt="Couple"
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>

              {/* Right Section - Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                {/* Heading */}
                <div className='flex pb-2 items-center text-[#490B22] gap-1'  >
                  <h1 className='text-[22px] font-semibold'>Success Story</h1>
                  <span className='pt-1 text-[25px]' >< BsBalloonHeart /></span>
                </div>

                {/* Names & Wedding Date */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#fff0f5] border border-pink-100 rounded-md py-7 px-5 mb-4">
                  <div>
                    <p className="text-pink-700 font-medium">
                      Bijil K S <span className="text-gray-500">(CM1046238)</span>
                    </p>
                    <p className="text-pink-700 font-medium">
                      Susanna Wilson <span className="text-gray-500">(CM1023452)</span>
                    </p>
                  </div>

                  {/* Wedding Date Section */}
                  <div className="mt-3 sm:mt-0 text-left sm:text-right">
                    <p className="text-sm text-gray-600">Wedding Date</p>
                    <p className="font-semibold text-gray-800">26 May 2025</p>
                  </div>
                </div>

                {/* Story Text */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  ChavaraMatrimony is a wonderful platform for families to find each
                  other and soul mates to meet and start the journey of life together.
                  Wishing all the very best to Team Chavara!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden w-full sm:py-10 py-5">
          <div className="flex gap-6 animate-marquee">
            {realStories.concat(realStories).map((item, index) => (
              <div
                key={index}
                className="w-full sm:max-w-[400px] md:max-w-[380px] lg:max-w-[380px] flex-shrink-0"
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
      </div>
      <Footer/>
    </div>
  )
}

export default ViewSuccessStory
