import React, { useState } from 'react'
import { IoCloseOutline, IoEye, IoEyeOff } from 'react-icons/io5';
import DoubleHeartsCredentials from '../assets/DoubleHeartsCredentials.png';
import { sendInterestApi } from '../Services/allApi';
import Swal from 'sweetalert2';

function ConnectNowModal({ onClose, receiver_id }) {
    const [message, setMessage] = useState(
        "Hi, I found your profile interesting and would like to connect with you."
    );
    console.log("Receiver ID:", receiver_id);
    const handleSendInterest = async (e) => {
        e.preventDefault()
        try {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const reqBody = {
                message: message,
                receiver_id: receiver_id
            }
            
            const result = await sendInterestApi(reqHeader, reqBody)
            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Interest send Successfully!',
                    text: 'Here’s to finding your special someone!',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
                 onClose()
            } else {
                Swal.fire({
                    title: 'failed',
                    text: result?.data?.message || 'Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
               
            }
        }
        catch (error) {
            alert(error)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
            <div className="bg-white sm:px-12 px-8 py-8 flex flex-col items-center justify-center rounded-2xl shadow-2xl gap-6 relative">
                <button onClick={onClose}
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

                <form onSubmit={handleSendInterest} className="flex flex-col sm:gap-6 gap-4 sm:w-75 w-65">
                    <div className="flex flex-col items-center justify-center gap-3 w-full">
                        <label className="block text-sm font-medium mb-1 text-[#490B22]">
                            Message
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none text-[14px] resize-none h-28"
                        />
                    </div>
                    <button

                        type="submit"
                        className="w-full bg-[#E33183] text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
                    >
                        Connect Now
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ConnectNowModal
