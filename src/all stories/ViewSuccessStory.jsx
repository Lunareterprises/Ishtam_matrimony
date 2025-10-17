import React, { useEffect, useRef, useState } from 'react'
import Nav from '../Components/Nav'
import { BsBalloonHeart } from 'react-icons/bs'
import Footer from '../Components/Footer'
import { listAllStoriesApi } from '../Services/allApi'
import { useLocation, useNavigate } from 'react-router-dom'

function ViewSuccessStory() {
  const [successStoriesData, setSuccessStoriesData] = useState([]);
  const [firstPart, setFirstPart] = useState('');
  const [secondPart, setSecondPart] = useState('');
  const imageRef = useRef(null);
  const textContainerRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();
  const { storyData } = location.state || {};
  const story = storyData.ss_story;
  const storyImage = storyData.ss_image;
  console.log("Received story:", storyData);
  const BASE_URL = 'https://lunarsenterprises.com:6050/ishtam_marry'

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
      <div className='pt-20 flex flex-col items-center justify-center'  >
        <div className='sm:max-w-330 px-5 sm:py-10 py-5 w-full '>
          <div className='w-full bg-pink-50 h-auto'>
            <div className=' flex flex-col gap-2 align-text-left'>
              <div className="bg-[#f7f7fb] rounded-lg shadow p-3 xl:p-6">
                {/* Top Section with Image and Initial Content */}
                <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
                  {/* Left Section - Image */}
                  <div className="w-full xl:w-1/2">
                    <img
                      ref={imageRef}
                      src={`https://lunarsenterprises.com:6050${storyData.ss_image}`}
                      /*  src={realStoriesImg3} */
                      alt="Couple"
                      className="w-150 h-100 rounded-md object-cover"
                    />
                  </div>

                  {/* Right Section - Content */}
                  <div className="w-full xl:w-1/2 flex flex-col" ref={textContainerRef}>
                    <div ref={headerRef}>
                      {/* Heading */}
                      <div className='flex sm:pt-5 pt-3 pb-4 items-center text-[#490B22] gap-1'>
                        <h1 className='text-lg sm:text-xl md:text-[22px] font-semibold'>Success Story</h1>
                        <span className='pt-1 text-xl sm:text-2xl md:text-[25px]'><BsBalloonHeart /></span>
                      </div>

                      {/* Names & Wedding Date */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#fff0f5] border border-pink-100 rounded-md py-4 sm:py-5 md:py-7 px-3 sm:px-4 md:px-5 mb-3 md:mb-4">
                        <div>
                          <p className="text-pink-700 font-medium text-sm sm:text-base">
                            {storyData.bride_firstname} {storyData.bride_lastname} <span className="text-gray-500">(ITM{storyData.bride_id})</span>
                          </p>
                          <p className="text-pink-700 font-medium text-sm sm:text-base">
                            {storyData.groom_firstname} {storyData.groom_lastname} <span className="text-gray-500">(ITM{storyData.groom_id})</span>
                          </p>
                        </div>

                        {/* Wedding Date Section */}
                        <div className="mt-2 sm:mt-0 text-left sm:text-right">
                          <p className="text-xs sm:text-sm text-gray-600">Wedding Date</p>
                          <p className="text-gray-600 text-sm">
                            {new Date(storyData.ss_wedding_date).toLocaleDateString('en-US', {
                              weekday: 'long',  // e.g., "Wednesday"
                              year: 'numeric',
                              month: 'long',    // e.g., "October"
                              day: 'numeric'    // e.g., "15"
                            })}
                          </p>
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


        <div className="overflow-hidden w-full sm:py-10 py-5">
          <div className="flex gap-6 animate-marquee">
            {successStoriesData.concat(successStoriesData).map((item, index) => (
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
                  onClick={navigateToStoryView}
                  src={`https://lunarsenterprises.com:6050${item.ss_image}`}
                  alt={item.name}
                  className="object-cover h-60 w-full shadow-md"
                />
                <div className="w-full pt-4">
                  <h2 className="text-xl font-semibold">{item.bride_firstname} & {item.groom_firstname}</h2>
                  <p className="italic text-[16px] break-words"> {item.ss_story.length > 80
                    ? `${item.ss_story.substring(0, 150)}...`
                    : item.ss_story}</p>
                  <h3 onClick={() => navigate('/view-success-story', { state: { storyData: item } })} className="pt-1 underline cursor-pointer">Read more</h3>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
      <Footer />
    </div>
  )
}

export default ViewSuccessStory
