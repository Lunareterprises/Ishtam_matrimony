import React from 'react'
import aboutImg from "../assets/Group1171276261.png"

function AboutUs() {
    return (
        <div id='aboutUs' className='sm:py-15 py-5' >
            <div className='flex flex-col md:flex-row w-full sm:px-15 px-6 gap-15 items-center' >
                <div className='w-full md:w-6/10 flex flex-col gap-3' >
                    <div className='flex w-full sm:justify-start justify-center' >
                        <h1 className='text-3xl font-semibold text-[#490b22]' >About Us</h1>
                    </div>

                    <div>
                        <p>
                            Ishttan Marry is a trusted matrimonial platform designed to bring together hearts, families, and traditions.
                            With a thoughtful blend of modern technology and cultural values, we make the journey of finding your life partner simple, safe, and meaningful.
                        </p>

                        <p className="mt-4">
                            Our platform goes beyond just creating profiles we focus on building real connections.
                            Whether you seek compatibility in values, lifestyle, or shared dreams, Ishttan Marry ensures personalized matches that truly matter.
                            Every detail is handled with care, from profile verification to intelligent matchmaking, giving you the confidence that your search is genuine and secure.
                        </p>

                        <p className="mt-4">
                            We understand that marriage is not just about two individuals, but about uniting families and creating lasting bonds.
                            That’s why our approach combines trust, respect, and commitment, helping you meet someone who complements not only your personality but also your aspirations for the future.
                        </p>
                    </div>

                </div>
                <div className='w-full md:w-4/10' >
                    <img src={aboutImg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default AboutUs
