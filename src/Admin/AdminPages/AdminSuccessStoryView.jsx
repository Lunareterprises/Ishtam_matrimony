import React, { useState, useRef, useEffect } from 'react'
import { BsBalloonHeart } from 'react-icons/bs'
import realStoriesImg3 from '../../assets/Property 1=Frame 1000008797.png'
import AdminSidebar from '../AdminComponents/AdminSidebar';
import AdminNavbar from '../AdminComponents/AdminNavbar';

function AdminSuccessStoryView() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [firstPart, setFirstPart] = useState('');
    const [secondPart, setSecondPart] = useState('');
    const imageRef = useRef(null);
    const textContainerRef = useRef(null);
    const headerRef = useRef(null);

    // Your story data - replace with dynamic data from props or API
    const story = `ChavaraMatrimony is a wonderful platform for families to find each other and soul mates to meet and start the journey of life together. Wishing all the very best to Team Chavara! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, cupiditate? Porro in optio dolorem modi, necessitatibus voluptates amet totam repudiandae accusantium excepturi esse non dolor itaque aliquid, distinctio iusto obcaecati! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed beatae labore sunt adipisci expedita atque explicabo! Dolor, doloremque. Labore quia quod rem animi quidem autem ipsam, sunt molestiae itaque officiis! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias ut beatae ex officiis corrupti earum. A repellat vel quam nihil similique natus modi. Iusto modi vero reprehenderit culpa velit mollitia? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nulla omnis facilis quae tenetur quisquam quibusdam fuga debitis nisi, officia, ipsam magnam rem beatae! Expedita debitis rem molestiae animi maxime.`;

    useEffect(() => {
        const calculateTextSplit = () => {
            if (window.innerWidth < 1280) {
                setFirstPart(story);
                setSecondPart('');
                return;
            }

            if (!imageRef.current || !textContainerRef.current || !headerRef.current) return;

            const imageHeight = imageRef.current.offsetHeight;
            const headerHeight = headerRef.current.offsetHeight;

            // slightly increase available height (fills more words)
            const availableHeight = imageHeight - headerHeight + 3; // add 20px buffer for extra text

            // Binary search to find best split point
            let low = 0;
            let high = story.length;
            let bestSplit = story.length;

            // Create test element
            const testEl = document.createElement('p');
            const style = getComputedStyle(textContainerRef.current);
            Object.assign(testEl.style, {
                position: 'absolute',
                visibility: 'hidden',
                width: `${textContainerRef.current.offsetWidth}px`,
                lineHeight: style.lineHeight,
                fontSize: style.fontSize,
                fontFamily: style.fontFamily,
                whiteSpace: 'normal',
                wordBreak: 'break-word'
            });
            document.body.appendChild(testEl);

            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                testEl.textContent = story.substring(0, mid);

                if (testEl.offsetHeight <= availableHeight) {
                    low = mid + 1;
                } else {
                    bestSplit = mid - 1;
                    high = mid - 1;
                }
            }

            // Split at nearest space before overflow
            const lastSpace = story.lastIndexOf(' ', bestSplit);
            const splitIndex = lastSpace > 0 ? lastSpace : bestSplit;

            document.body.removeChild(testEl);

            setFirstPart(story.substring(0, splitIndex).trim());
            setSecondPart(story.substring(splitIndex).trim());
        };

        const img = imageRef.current;
        if (img?.complete) {
            calculateTextSplit();
        } else {
            img?.addEventListener('load', calculateTextSplit);
        }

        window.addEventListener('resize', calculateTextSplit);

        return () => {
            img?.removeEventListener('load', calculateTextSplit);
            window.removeEventListener('resize', calculateTextSplit);
        };
    }, [story]);



    return (
        <div className="flex h-screen bg-pink-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 overflow-y-auto px-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Success story View
                        </h1>
                        <p className="text-gray-500 ">
                            Review the story and ensure it meets guidelines before deciding
                        </p>
                        <div className='py-10 w-full flex justify-start items-start'>
                            <div className='w-full bg-pink-50 h-auto'>
                                <div className=' flex flex-col gap-2 align-text-left'>
                                    <div className="bg-[#f7f7fb] rounded-lg shadow p-3 xl:p-6">
                                        {/* Top Section with Image and Initial Content */}
                                        <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
                                            {/* Left Section - Image */}
                                            <div className="w-full xl:w-1/2">
                                                <img
                                                    ref={imageRef}
                                                    src={realStoriesImg3}
                                                    alt="Couple"
                                                    className="w-full h-auto rounded-md object-cover"
                                                />
                                            </div>

                                            {/* Right Section - Content */}
                                            <div className="w-full xl:w-1/2 flex flex-col" ref={textContainerRef}>
                                                <div ref={headerRef}>
                                                    {/* Heading */}
                                                    <div className='flex sm:pt-8 pt-3 pb-4 items-center text-[#490B22] gap-1'>
                                                        <h1 className='text-lg sm:text-xl md:text-[22px] font-semibold'>Success Story</h1>
                                                        <span className='pt-1 text-xl sm:text-2xl md:text-[25px]'><BsBalloonHeart /></span>
                                                    </div>

                                                    {/* Names & Wedding Date */}
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#fff0f5] border border-pink-100 rounded-md py-4 sm:py-5 md:py-7 px-3 sm:px-4 md:px-5 mb-3 md:mb-4">
                                                        <div>
                                                            <p className="text-pink-700 font-medium text-sm sm:text-base">
                                                                Bijil K S <span className="text-gray-500">(CM1046238)</span>
                                                            </p>
                                                            <p className="text-pink-700 font-medium text-sm sm:text-base">
                                                                Susanna Wilson <span className="text-gray-500">(CM1023452)</span>
                                                            </p>
                                                        </div>

                                                        {/* Wedding Date Section */}
                                                        <div className="mt-2 sm:mt-0 text-left sm:text-right">
                                                            <p className="text-xs sm:text-sm text-gray-600">Wedding Date</p>
                                                            <p className="font-semibold text-sm sm:text-base text-gray-800">26 May 2025</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Story Text - First Part (dynamically calculated) */}
                                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                                    {firstPart}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Continuation of Story Text - Below the two columns */}
                                        {secondPart && (
                                            <div className="xl:pt-2 pt-0">
                                                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                                    {secondPart}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AdminSuccessStoryView