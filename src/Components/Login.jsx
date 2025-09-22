import React, { useState } from 'react';
import DoubleHeartsCredentials from '../assets/DoubleHeartsCredentials.png';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import ForgotPassword from '../Components/ForgotPassword';
import { userLoginApi } from '../Services/allApi';
import Swal from 'sweetalert2';
import { IoEye, IoEyeOff } from "react-icons/io5";

function Login({ onClose, onOtpLogin, onForgotPassword, openRegistrationModal }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    emailOrMobile: "",
    password: ""
  })

  const [errors, setErrors] = useState({}); // <-- add this state

  const validateLoginData = () => {
    let newErrors = {};

    // Email or mobile check
    if (!loginData.emailOrMobile) {
      newErrors.emailOrMobile = "Email or mobile is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.emailOrMobile) && !/^\d{10}$/.test(loginData.emailOrMobile)) {
      newErrors.emailOrMobile = "Enter a valid email or 10-digit mobile number";
    }

    // Password check
    if (!loginData.password) {
      newErrors.password = "Enter the password";
    }
    setErrors(newErrors); // update state

    // if newErrors is empty → valid
    return Object.keys(newErrors).length === 0;
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLoginData()) return;
    console.log("login Data ::", loginData);
    try {
      const result = await userLoginApi(loginData);
      console.log("Login result ::", result);
      if (result?.data?.result === true) {
        sessionStorage.setItem("token", result.data.data.token)
        sessionStorage.setItem("profilePic", result.data.data.profile_pic)
        sessionStorage.setItem("user_id", result.data.data.user_id)
        sessionStorage.setItem("email",result.data.data.email)
        sessionStorage.setItem("name",result.data.data.name)
  

        onClose()
        await Swal.fire({
          title: 'Login Successful!',
          text: 'Here’s to finding your special someone!',
          icon: 'success',
          iconColor: '#E33183',
          confirmButtonText: 'OK',
        });
        navigate("/myProfile");
      } else {
        Swal.fire({
          title: 'Login failed',
          text: result?.data?.message || 'Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    }
    catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }


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

          <form onSubmit={handleLogin} className="flex flex-col sm:gap-6 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#490B22]">
                Mobile Number / Email ID
              </label>
              <input
                value={loginData.emailOrMobile}
                onChange={(e) => setLoginData({ ...loginData, emailOrMobile: e.target.value })}
                type="text"
                placeholder="Enter your mobile number / email id"
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px]"
              />
              {errors.emailOrMobile && <p className="text-red-500 text-xs pt-1">{errors.emailOrMobile}</p>}
            </div>

            <div className='flex flex-col items-center justify-center gap-3'>

              <div className="w-full relative">
                <label className="block text-sm font-medium mb-1 text-[#490B22]">
                  Password
                </label>
                <input
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  value={loginData.password}
                  type={showPassword ? "text" : "password"}  // 👈 toggle based on state
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px] pr-10"
                />
                {errors.password && <p className="text-red-500 text-xs pt-1">{errors.password}</p>}

                {/* Eye Icon */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-[#E33183]"
                >
                  {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </span>
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
                  Don’t have an account ? <span onClick={() => { onClose(); openRegistrationModal() }} type="button" className='hover:underline cursor-pointer font-medium'>Create account</span>
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
