import React from 'react'
import DoubleHeartsCredentials from '../assets/DoubleHeartsCredentials.png';
import { IoCloseOutline } from 'react-icons/io5';
import { MdPhone } from "react-icons/md";


function ViewContactModal({ onClose, contactData }) {
    console.log("Contact data in modal", contactData);
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
                <div className="bg-white sm:px-9 px-7 py-8 flex flex-col items-center justify-center rounded-2xl shadow-2xl gap-6 relative">
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

                    <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-md border border-gray-300">
                        <h1 className='text-[#490B22] text-[15px] font-medium' >Email id : {contactData.u_email}</h1>
                        <h1 className='text-[#490B22] text-[15px] font-medium' >Mobile No : {contactData.u_mobile}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewContactModal
