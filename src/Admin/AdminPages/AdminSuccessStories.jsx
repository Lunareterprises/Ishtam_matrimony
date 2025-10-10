import React, { useState } from 'react'
import AdminSidebar from '../AdminComponents/AdminSidebar'
import AdminNavbar from '../AdminComponents/AdminNavbar'
import realStoriesImg1 from '../../assets/Property 1=Frame 1000008792 (1).png'
import realStoriesImg2 from '../../assets/Property 1=Frame 1000008795.png'
import realStoriesImg3 from '../../assets/Property 1=Frame 1000008797.png'
import realStoriesImg4 from '../../assets/Property 11=Frame 1000008796.png'
import realStoriesImg5 from '../../assets/Property 12=Frame 1000008796.png'
import realStoriesImg6 from '../../assets/Property 17=Frame 1000008796.png'
import { Link } from 'react-router-dom'


function AdminSuccessStories() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        <div className="flex h-screen bg-pink-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 overflow-y-auto px-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Success Stories
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Manage and showcase happy couple stories.
                        </p>

                        <div className='flex justify-start items-start' >
                            <div className="flex flex-wrap gap-6 py-2">
                                {realStories.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-full sm:max-w-[400px] md:max-w-[380px] lg:max-w-[320px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                    >
                                        <div className="relative overflow-hidden group">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-4 right-4 bg-[#E33183] text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-lg">
                                                PENDING
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">{item.name}</h2>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3 italic">
                                                {item.story}
                                            </p>
                                            <Link to='/admin-successStoryView' >
                                                <button className="text-left text-pink-600 hover:text-pink-700 font-semibold text-sm transition-colors flex items-center pb-2 gap-2">
                                                    Read Full Story →
                                                </button>
                                            </Link>

                                            <div className='flex flex-col gap-3 pt-4 border-t border-gray-200'>
                                                <div className='flex gap-3 w-full'>
                                                    <button className="flex-1 bg-[#E33183] hover:bg-pink-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                                                        Approve
                                                    </button>
                                                    <button className="flex-1 bg-gray-400 hover:bg-gray-500  text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    )
}

export default AdminSuccessStories
