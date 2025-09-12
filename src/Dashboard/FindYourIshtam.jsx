import React from 'react'
import IshttamProfileCards from '../Components/IshttamProfileCards'

function FindYourIshtam() {
    return (
        <div className='pt-10' >
            <div className='flex flex-col  sm:items-start items-center  '>
                <h1 className='text-[22px] text-[#530F29] font-semibold' >Find your ishtam (12)</h1>
                <p className='text-[16px font-semibold text-[#787878]' >we found 12 new profiles matching your preferance</p>
            </div>
            <div className='flex flex-col sm:items-start items-center gap-7 w-full'  >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
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


            </div>
            <div className='flex w-full justify-center pt-10' >
                <button className="border border-[#E33183] text-[#E33183] text-[13px] px-8 py-2 rounded-l-full rounded-r-full  hover:text-black transition">
                    View All
                </button>
            </div>
        </div>
    )
}

export default FindYourIshtam
