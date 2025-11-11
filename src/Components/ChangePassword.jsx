import React, { useState } from 'react'
import { IoCloseOutline, IoEye, IoEyeOff } from 'react-icons/io5';
import DoubleHeartsCredentials from '../assets/DoubleHeartsCredentials.png';
import { changePasswordApi } from '../Services/allApi';
import Swal from 'sweetalert2';

function ChangePassword({ onClose }) {
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState({
        password: ""
    })

    const handleChangPassword = async (e) => {
        e.preventDefault()
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            console.log("inside send enquiry request::");
            // API call
            const result = await changePasswordApi(newPassword, reqHeader);
            console.log("result :: ", result);
            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Password Changed!',
                    text: 'Your password has been updated successfully.',
                    icon: 'success',
                    iconColor: "#E33183",
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#E33183"
                });
                onClose()
            } else {
                await Swal.fire({
                    title: 'Change Failed!',
                    text: result?.data?.message || 'Unable to change your password. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#E33183'
                });
            }
        } catch (error) {
            await Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again later.',
                icon: 'error',
                confirmButtonColor: '#E33183'
            });
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
            <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-2xl gap-6 relative">
                <button onClick={onClose}
                    className="absolute top-5 right-5 text-[#490B22] hover:text-[#E33183]"
                >
                    <IoCloseOutline size={24} />
                </button>

                <div className='flex flex-col justify-center items-center' >
                    <img src={DoubleHeartsCredentials} className='w-8 h-auto' alt="icon" />
                    <h1 className="text-[20px] font-semibold text-[#E33183]">
                        ishtam<span className='text-[#490B22]'>Marry</span>
                    </h1>
                </div>

                <form className="flex flex-col sm:gap-6 gap-4 sm:w-75 w-65">
                    <div className='flex flex-col items-center justify-center gap-3'>

                        <div className="w-full relative">
                            <label className="block text-sm font-medium mb-1 text-[#490B22]">
                               New Password
                            </label>
                            <input
                                value={newPassword.password}
                                onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your new password"
                                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px] pr-10"
                            />


                            {/* Eye Icon */}
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-10 cursor-pointer text-gray-500 hover:text-[#E33183]"
                            >
                                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                            </span>
                        </div>
                    </div>
                    <button onClick={handleChangPassword}
                        type="submit"
                        className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                    >
                        Change Password
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ChangePassword
