import React from 'react'
import IshttamImg from '../assets/ishtamcard.png'
import profilecardimg from '../assets/ishtam-profilecard.jpg'
import { FaCamera } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

function IshttamProfileCards() {
 

    return (
        <div className="rounded-lg overflow-hidden relative shadow-lg w-55">
            {/* Top badges */}
            <div className="absolute top-0 left-0 bg-[#E33183] text-white text-[10px] font-semibold px-2 py-1 rounded">
                PREMIUM
            </div>

            <div className="absolute top-2 right-2 flex gap-2">
                {/* Camera + count */}
                <div className="flex items-center gap-1 bg-black bg-opacity-80 text-white px-2 py-1 rounded-3xl text-[11px]">
                    <FaCamera className="text-xs" />
                    <span>3</span>
                </div>
                {/* Menu icon */}
                <div className="w-6 h-6 flex items-center justify-center bg-black bg-opacity-80 rounded-full">
                    <BsThreeDotsVertical className="text-white text-sm" />
                </div>
            </div>

            {/* Profile image */}
            <img
                src={profilecardimg}
                alt="Profile"
                className="w-full h-72 object-cover"
            />

            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent bg-opacity-20  p-3">
                <div className='flex gap-2 items-center pb-1' >
                    <h3 className="text-sm font-semibold text-white">Esther Ann</h3>
                    <div className='rounded-l-full rounded-r-full bg-[rgba(0,0,0,0.5)] text-white text-[7px] py-1 px-3 ' >4 hrs ago</div>
                </div>
                <p className="text-[10px] font-normal text-[#D4D4D8]">24 yrs, 5'6" | Not Working</p>
                <p className="text-[10px] font-normal text-[#D4D4D8]">Malayalam | Nair | Alappuzha, Kerala</p>

                {/* Buttons */}
                <div className="flex  justify-between mt-2">
                    <button className="border border-white text-white text-[9px] px-3 py-1 rounded-l-full rounded-r-full hover:bg-white hover:text-black transition">
                        View Contact
                    </button>
                    <button className="bg-[#E33183] text-white text-[9px] px-3 py-1 rounded-l-full rounded-r-full hover:bg-pink-600 transition">
                        Connect Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IshttamProfileCards
