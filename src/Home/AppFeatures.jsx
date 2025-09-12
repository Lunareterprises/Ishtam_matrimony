import React from "react";
import AppFeaturesBg from "../assets/Herosection(4).png";
import mobileImg from "../assets/mobile.png"

function AppFeatures() {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Background Image */}
            <img
                src={AppFeaturesBg}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay (so content is visible on top of bg) */}
            <div className="absolute inset-0 "></div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-15 py-12 md:py-20 text-white">

                {/* LEFT CONTENT */}
                <div className="w-full md:w-1/2 space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                        ISHTTAM MARRY APP — <br /> LOVE IN YOUR POCKET
                    </h1>
                    <h2 className="text-lg font-semibold">
                        MEET YOUR SOULMATE ANYTIME, ANYWHERE.
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed">
                        Your search for a life partner doesn’t need to wait until you're at
                        your computer. With the Ishttam Marry mobile app, finding love is as
                        easy as a swipe, tap, and chat—whether you're at work, traveling, or
                        relaxing at home.
                    </p>

                    {/* APP STORE BUTTONS */}
                    <div className="mt-6 space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-wide">
                            Download the App & Start Your Journey
                        </p>
                        <div className="flex items-center gap-4 ">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Google Play"
                                className="h-12"
                            />
                            <img
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="App Store"
                                className="h-12"
                            />
                        </div>
                    </div>
                </div>

                {/* Phone Image */}
                <div className="flex flex-col items-end"  >
                    <img
                        src={mobileImg}
                        alt="App Screenshot"
                        className="max-w-xs md:max-w-sm drop-shadow-2xl translate-y-0 md:translate-y-20"
                    />
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6">


                    {/* Features Section */}
                    <div  className="flex flex-col  justify-center" >
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <span role="img" aria-label="key">🔑</span>
                            APP FEATURES YOU'LL LOVE:
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-2 rounded-md text-sm bg-[#FF000085]">Instant Profile Search</span>
                            <span className="px-3 py-2 rounded-md text-sm bg-[#2600FF85]">Private & Safe Chat</span>
                            <span className="px-3 py-2 rounded-md text-sm bg-[#FF00DD85]">Real-Time Notifications</span>
                            <span className="px-3 py-2 rounded-md text-sm bg-[#2FFF0085]">Verified Matches Only</span>
                            <span className="px-3 py-2 rounded-md text-sm bg-[#00EAFF85]">Family Access Option</span>
                            <span className="px-3 py-2 rounded-md text-sm bg-[#FFDD0085]">Horoscope Match Alerts</span>
                        </div>
                    </div>

                    {/* Bottom Text */}
                    <div className="flex flex-col" >
                        <h1 className="font-semibold text-[20px]" >START, SWIPE, CONNECT – IT’S THAT SIMPLE.</h1>
                        <p className="text-sm md:text-base leading-relaxed">
                            Finding your ishttam has never been more effortless. Whether you’re
                            searching for love or letting love find you, the Ishttam Marry app
                            makes your journey beautifully seamless.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AppFeatures;

