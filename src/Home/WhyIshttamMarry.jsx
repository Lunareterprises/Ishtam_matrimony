import React from 'react'
import WhyChooseUsImg from '../assets/Property 1=Default.png'
import RealStories from './RealStories';




function WhyIshttamMarry() {

  const cardData = [
    {
      title: "100% Human Verified Profiles",
      description:
        "We go beyond bots and algorithms. Every profile is individually reviewed by our team to ensure authenticity and eliminate fake accounts. Your safety and trust are our top priority.",
    },
    {
      title: "Faith-Aligned Matching",
      description:
        "Whether you're looking for a partner who shares your Christian, Hindu, or Muslim faith-or one who honors family values-we help you find someone with spiritual and cultural compatibility, not just surface-level matches.",
    },
    {
      title: "Secure & Private",
      description:
        "Your data is encrypted, protected, and never shared without your consent. Our secure platform ensures safe browsing, confidential chats, and profile control options.",
    },
    {
      title: "Real Stories. Real People.",
      description:
        "Thousands have found their life partners on Ishttan Marry. We're not just a website-we're a bridge to soulful unions and sacred beginnings",
    },
  ];

  return (
    <div >
      <div data-aos="zoom-in" data-aos-duration="1600" className='flex flex-col items-center text-center gap-4' >
        <h1 className="text-3xl font-semibold text-[#490b22] sm:pt-[80px] pt-[60px]">
          Why Choose ishttam Marry
        </h1>
        <p className='max-w-[1200px] text-[18px] sm:text-[20px] px-7 text-[#490b22]' >We understand that marriage is more than just a match — it's a divine connection between families, faith, and futures. Here's why thousands trust ishttam Marry on their journey to find true love:</p>
      </div>

      <div className="relative w-full px-6 pt-7 sm:pt-20">

        {/* Left Floating Image */}
        <img
          src={WhyChooseUsImg}
          alt=""
          className="hidden lg:block md:block  absolute left-0  object-cover z-0 "
        />

        {/* Right Floating Image */}
        <img
          src={WhyChooseUsImg}
          alt=""
          className="hidden lg:block  absolute right-0  object-cover z-0"
        />


        {/* Large Screen Cards */}
        <div className="relative max-w-6xl mx-auto z-10 space-y-6 hidden lg:block">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md p-3 flex items-center gap-4 border border-gray-100 w-full lg:w-[64%]
        ${index === 0 ? 'ml-auto mr-50' : ''}
        ${index === 1 ? 'ml-18' : ''}
        ${index === 2 ? 'ml-auto mr-37 mt-18' : ''}
        ${index === 3 ? 'ml-30' : ''}`}
            >
              <div className="text-green-500 text-xl mt-1">✅</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                <p className="text-[14px] text-gray-600 mt-1">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Medium Screen Cards */}
        <div className="relative max-w-6xl mx-auto z-10 space-y-6 hidden md:block lg:hidden">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md p-3 flex items-center gap-4 border border-gray-100 w-full md:w-[75%]
        ${index === 0 ? 'ml-40 ' : ''}
        ${index === 1 ? 'ml-44' : ''}
        ${index === 2 ? 'ml-16 mt-8' : ''}
        ${index === 3 ? 'ml-20' : ''}`}
            >
              <div className="text-green-500 text-xl mt-1">✅</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                <p className="text-[14px] text-gray-600 mt-1">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* small Screen Cards*/}
        <div className=" flex-col space-y-6 px-4 block md:hidden">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md p-3 flex items-center gap-4 border border-gray-100 `}>
              <div className="text-green-500 text-xl mt-1">✅</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                <p className="text-[14px] text-gray-600 mt-1">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <RealStories/>
    </div>
  )
}

export default WhyIshttamMarry
