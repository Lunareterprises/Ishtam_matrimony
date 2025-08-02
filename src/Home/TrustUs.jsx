import React from 'react'
import trustedPeopleImg1 from '../assets/BG (1).png'
import trustedPeopleImg2 from '../assets/BG (2).png'
import trustedPeopleImg3 from '../assets/BG (3).png'
import { MdArrowOutward } from "react-icons/md";

function TrustUs() {

    const trustedPeople = [
        {
            image: trustedPeopleImg3,
            name: 'Albert Flores',
            email: 'albert@gmail.com'
        },
        {
            image: trustedPeopleImg2,
            name: 'Samantha Reed',
            email: 'samantha@example.com'
        },
        {
            image: trustedPeopleImg1,
            name: 'Jordan Lee',
            email: 'jordan@samplemail.com'
        },


    ];

    return (
        <div  className='pb-18' >
            <div className='flex flex-col items-center text-center gap-4' >
                <h1 className="text-3xl font-semibold text-black sm:pt-[80px] pt-[60px]">
                    Over 1000+ people trust us
                </h1>
                <p className='max-w-[900px] text-[18px] sm:text-[20px] px-7 text-black' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 px-7 pt-12">
                {trustedPeople.map((item, index) => (
                    <div
                        key={index}
                        className="w-[290px] sm:w-[350px] md:w-[210px] lg:w-[300px]"
                    >
                        <div className="relative">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-auto rounded-xl"
                            />

                            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent rounded-b-xl"></div>
                            {/* Bottom-left text overlay */}
                            <div className="absolute bottom-4 left-4 text-white z-10">
                                <h2 className="text-sm sm:text-base font-semibold">{item.name}</h2>
                                <p className="text-xs sm:text-sm">{item.email}</p>
                            </div>

                            {/* Bottom-right play icon */}
                            <div className="absolute bottom-4 right-4 z-10 bg-white/20 border border-white rounded-full p-2">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M6 4l10 6-10 6V4z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-center pt-6' >
               
                <button className="border border-transparent font-semibold hover:border-[#490b22] text-[#490b22] h-12 text-[13px] sm:text-[15px]  w-70 sm:w-85 sm:h-14 rounded-full hover:text-[#490b22a7] transition-colors duration-300 flex justify-center items-center gap-1">
                    See all reviews by our customers <span><MdArrowOutward /></span>
                </button>

            </div>


        </div>
    )
}

export default TrustUs
