import React from 'react'
import vector from '../assets/Vector.png'
import vector2 from '../assets/Vector-(2).png'
import TropicalLeaf1 from '../assets/image29.png'
import TropicalLeaf2 from '../assets/image31.png'
import processImg3 from '../assets/undraw_connection_ts3f 1.png'
import processImg1 from '../assets/undraw_email-consent_j36b 1 (1).png'
import processImg2 from '../assets/undraw_file-search_cbur (1) 1.png'
import processImg4 from '../assets/undraw_wedding_qt3q 1.png'
import processImg from '../assets/processImg.png'

function OurProcess() {
    return (
        <>
            <div id='ourProcess' className='bg-[#F5F5F5] pb-56 scroll-mt-20 hidden lg:block' >
                <div className='flex flex-col items-center text-center gap-4' >
                    <h1 className="text-3xl font-semibold text-[#490b22] sm:pt-[80px] pt-[60px]">
                        Our Process
                    </h1>
                    <p className='max-w-[1200px] text-[18px] sm:text-[20px] px-7 text-[#490b22]' >"From registration to relationship-see how we help you find your Ishttan."</p>
                </div>


                <div className="flex justify-between text-[#490b22] items-start sm:pt-20 pt-14 relative z-10">
                    {/* Left Leaf */}
                    <div className='pt-70' >
                        <img src={TropicalLeaf1} alt="Leaf Left" />
                    </div>

                    {/* Center Zigzag Vector with Process Steps */}
                    <div className=" relative flex justify-center items-center">
                        <img src={vector} alt="Zigzag Vector" className='pt-45' />

                        {/* Process Steps on Zigzag Path */}
                        <div className="absolute inset-0 flex flex-col">
                            {/* step 1 */}
                            <div className="absolute left-[-30px] sm:top-[20px] top-[70px]">
                                <div className='pb-6 text-center' >
                                    <h1 className='sm:text-[20px] text-[13px]  font-semibold' >Register Your Profile</h1>
                                    <p className='sm:text-[19px] text-[12px]'>Simple, fast, and free.</p>
                                </div>
                                <img src={processImg1} className='sm:w-[175px] w-[70px] h-auto' alt="Step 1" />
                            </div>

                            {/* step 2 */}
                            <div className="absolute sm:right-0 right-[-20px] top-[160px]  flex flex-col items-center text-right">
                                <div className='pb-6' >
                                    <h1 className=" sm:text-[20px] text-[13px]  font-semibold" >Match Preferences</h1>
                                    <p className="sm:text-[19px] text-[12px]" >Filter by faith, location, values.</p>
                                </div>
                                <img src={processImg2} className='sm:w-[175px] w-[90px] h-auto' alt="Step 2" />
                            </div>

                            {/* step 3 */}
                            <div className="absolute sm:right-0 right-[-20px] top-[360px] sm:top-[500px]  flex flex-col items-center sm:text-right text-left">
                                <div className="pb-6 sm:pr-7 pr-1">
                                    <h1 className="sm:text-[20px] text-[13px]  font-semibold">Connect Securely</h1>
                                    <p className="sm:text-[19px] text-[12px]">Safe chat & family involvement.</p>
                                </div>
                                <img src={processImg3} className='sm:w-[175px] w-[100px] h-auto' alt="Step 3" />
                            </div>

                            {/* step 4 */}
                            <div className="absolute sm:left-[-220px] left-[-100px] top-[440px] sm:top-[730px] flex flex-col items-center">
                                <div className='pb-6 text-left' >
                                    <h1 className='sm:text-[20px] text-[13px]  font-semibold' >Meet & Marry</h1>
                                    <p className='sm:text-[19px] text-[12px]'>Celebrate love, the traditional way.</p>
                                </div>
                                <img src={processImg4} className='sm:w-[175px] w-[80px] h-auto' alt="Step 4" />
                            </div>
                        </div>



                    </div>

                    {/* Right Leaf */}
                    <div className='pt-140' >
                        <img src={TropicalLeaf2} alt="Leaf Right" />
                    </div>
                </div>
            </div>


            {/* small screen design*/}
            <div className='bg-[#F5F5F5]  block sm:hidden py-10 ' >

                <div className='flex flex-col items-center text-center gap-4 px-7' >
                    <h1 className="text-3xl font-semibold text-[#490b22] ">
                        Our Process
                    </h1>
                    <p className=' text-[16px] text-[#490b22]' >"From registration to relationship-see how we help you find your Ishttan."</p>
                </div>

                <img src={processImg} alt="" className='px-3 pt-10' />
            </div>



            {/* medium screen design */}
            <div className="bg-[#F5F5F5] hidden sm:block lg:hidden py-10">
                <div className="flex flex-col items-center text-center gap-4 px-7">
                    <h1 className="text-3xl font-semibold text-[#490b22]">
                        Our Process
                    </h1>
                    <p className="text-[16px] text-[#490b22]">
                        "From registration to relationship—see how we help you find your Ishttan."
                    </p>
                </div>
                <div className='flex w-full items-center pt-5 justify-center' >
                    <img src={processImg} alt="" className="px-3 pt-10 w-140 h-auto" />
                </div>
            </div>


        </>
    )
}

export default OurProcess
