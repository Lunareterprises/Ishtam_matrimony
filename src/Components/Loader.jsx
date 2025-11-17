import React from 'react'
import DoubleHeartss from '../assets/DoubleHearts.png'

function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-pink-600 z-50">
            {/* Outer spinning ring */}
            <div className="relative w-24 h-24 border-4 border-gray-200 border-t-white rounded-full animate-spin flex items-center justify-center">
                {/* Middle spinning ring */}
                <div className="absolute w-20 h-20 border-3 border-pink-400 border-t-pink-400 rounded-full  flex items-center justify-center">
                    {/* Inner spinning ring */}
                    <div className="absolute w-13 h-13 bg-white rounded-full  flex items-center justify-center">
                        {/* Center Image */}
                        <img
                            src={DoubleHeartss}
                            alt="hearts"
                            className="w-8 h-8 object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader



