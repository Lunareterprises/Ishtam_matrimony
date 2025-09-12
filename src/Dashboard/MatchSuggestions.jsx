import React from 'react'
import IshttamProfileCards from '../Components/IshttamProfileCards'

function MatchSuggestions() {
    return (
        <div className='pt-10' >
            <div className='flex flex-col items-center sm:items-start'>
                <h1 className='text-[22px] text-[#530F29] font-semibold' >Match Suggestions (Daiy Matches-6)</h1>
                
            </div>
            <div className='flex items-center flex-col gap-7 w-full'  >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-10">
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                    <IshttamProfileCards />
                </div>

                <div className='flex justify-center' >
                    <button className="border border-[#E33183] text-[#E33183] text-[13px] px-8 py-2 rounded-l-full rounded-r-full  hover:text-black transition">
                        View All
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MatchSuggestions
