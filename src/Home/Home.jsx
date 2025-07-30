import React, { useEffect, useState } from 'react';
import BannerImage1 from '../assets/Property 1=Default (1).png';
import BannerImage2 from '../assets/Property 1=Default (2).png';
import BannerImage3 from '../assets/Property 1=Default (3).png';
import BannerImage4 from '../assets/Property 1=Default (4).png';
import BannerImage5 from '../assets/Property 1=Default (5).png';

function Home() {
  const banners = [
    BannerImage1,
    BannerImage2,
    BannerImage3,
    BannerImage4,
    BannerImage5,
  ];

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <>
      <section className="relative w-full h-[80vh] sm:h-[90vh] overflow-hidden">

        {/* Banner Images */}
        <img
          src={banners[current]}
          alt={`Slide ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        />

        {/* Banner Text */}
        <div className="relative z-10 flex flex-col gap-5 items-center justify-center text-center h-full bg-black/10 px-4">
          <h1 className="text-white text-3xl sm:text-5xl font-bold leading-tight">
            Find Your ishtam –<br />
            <span className="text-white">A Match Made in Heart & Heaven</span>
          </h1>
          <p className="text-white italic sm:text-lg ">
            Begin your journey with trusted matches, family values, and soulful connections
          </p>

          {/* Banner Buttons */}
          <div className=" flex flex-col gap-4">
            <button className="bg-pink-600 text-white w-60 h-13 rounded-full font-semibold hover:bg-pink-700 transition">
              JOIN ISHTTAM MARRY
            </button>
            <button className="border border-white text-white w-60 h-13 rounded-full hover:bg-white hover:text-pink-600 transition">
              FREE REGISTRATION
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
