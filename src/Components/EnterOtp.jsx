import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";

function EnterOtp({ onClose }) {

  const [counter, setCounter] = useState(200);  
  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [counter]);

  const handleResend = () => {
    setCounter(200);
  
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
      <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-lg gap-6 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183]"
        >
          <IoCloseOutline size={24} />
        </button>

        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-[14px]  text-[#490B22] font-semibold">Login with OTP</h1>
          <div className="flex flex-col justify-center items-center"  >
            <h1 className="text-[14px]  text-[#490B22]">OTP has been sent to +917306XXXXXX & </h1>
            <h1 className="text-[14px]  text-[#490B22]">XXXXXXXXXXXXX@gmail.com</h1>
          </div>
        </div>

        <form className="flex flex-col sm:gap-6 gap-4 sm:w-85 w-60 items-center justify-center ">
          <div className='flex flex-col items-center justify-center gap-4' >
            <label className="block text-sm font-semibold  text-[#490B22]">
              Enter OTP
            </label>
            <div className="flex justify-center space-x-4 ">
              <input
                type="text"
                maxLength="1"
                className="w-13 h-13 text-center text-[26px] font-semibold text-[#818181] bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-md shadow-md focus:outline-none focus:ring-3 focus:ring-[#E33183] focus:scale-105 transition-all duration-300"
              />
              <input
                type="text"
                maxLength="1"
                className="w-13 h-13 text-center text-[26px] font-semibold text-[#818181] bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-md shadow-md focus:outline-none focus:ring-3 focus:ring-[#E33183] focus:scale-105 transition-all duration-300"
              />
              <input
                type="text"
                maxLength="1"
                className="w-13 h-13 text-center text-[26px] font-semibold text-[#818181] bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-md shadow-md focus:outline-none focus:ring-3 focus:ring-[#E33183] focus:scale-105 transition-all duration-300"
              />
              <input
                type="text"
                maxLength="1"
                className="w-13 h-13 text-center text-[26px] font-semibold text-[#818181] bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-md shadow-md focus:outline-none focus:ring-3 focus:ring-[#E33183] focus:scale-105 transition-all duration-300"
              />

            </div>
          </div>

        </form>
        <div className="text-center text-[#490B22] ">
          {counter > 0 ? (
            <p>
              You can resend OTP in{" "}
              <span className="font-semibold text-[#E33183]">{counter} secs</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-[#E33183] font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnterOtp
