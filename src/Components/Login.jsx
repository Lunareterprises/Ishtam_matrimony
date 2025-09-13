import React, { useState } from 'react';
import DoubleHeartsCredentials from '../assets/DoubleHeartsCredentials.png';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import ForgotPassword from '../Components/ForgotPassword';

function Login({ onClose, onOtpLogin, onForgotPassword }) {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/myProfile")
  }

  // removed local state, will rely on parent (Nav) instead
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-40 px-4">

        <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-lg gap-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183]"
          >
            <IoCloseOutline size={24} />
          </button>

          <div className='flex flex-col justify-center items-center' >
            <img src={DoubleHeartsCredentials} alt="icon" />
            <h1 className="text-[20px] font-semibold text-[#E33183]">
              ishtam<span className='text-[#490B22]'>Marry</span>
            </h1>
          </div>

          <form className="flex flex-col sm:gap-6 gap-4">

            <div>
              <label className="block text-sm font-medium mb-1 text-[#490B22]">
                Mobile Number / Email ID
              </label>
              <input
                type="text"
                placeholder="Enter your mobile number / email id"
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px]"
              />
            </div>

            <div className='flex flex-col items-center justify-center gap-3'>
              <div className='w-full'>
                <label className="block text-sm font-medium mb-1 text-[#490B22]">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px]"
                />
              </div>

              <div className="flex items-center justify-between text-sm sm:gap-15 gap-3">
                <label className="flex items-center gap-2 text-[#490B22]">
                  <input type="checkbox" className="w-4 h-4" />
                  Remember me
                </label>

                <button
                  onClick={() => {
                    onClose(); 
                    onForgotPassword(); 
                  }}
                  type="button"
                  className="text-[#490B22] hover:underline"
                >
                  Forgot Password?
                </button>

              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <button
                onClick={handleLogin}
                type="submit"
                className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
              >
                Login
              </button>

              <div className="text-center text-[#490B22] text-sm">(OR)</div>

              <div className='flex flex-col items-center gap-2'>
                <button
                  onClick={onOtpLogin}
                  type="button"
                  className="w-full border border-[#E33183] text-[#E33183] py-2 rounded-lg font-semibold hover:bg-pink-50"
                >
                  Login with OTP
                </button>
                <h1 className='text-[13px] text-[#490B22]'>
                  Don’t have an account ? <span className='font-medium'>Create account</span>
                </h1>
              </div>
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

export default Login;
