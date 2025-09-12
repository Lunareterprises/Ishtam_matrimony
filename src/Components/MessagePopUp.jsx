import React from 'react';
import { FaTimes } from "react-icons/fa";

function MessagePopUp({ isOpen, onClose }) {
    const messages = [
        { name: "Natasha Romanoff", message: "Hello, I came across your profile and was impressed by your back...", img: "https://via.placeholder.com/40" },
        { name: "Pepper Potts", message: "Hi, I found your profile to be interesting and would like to con...", img: "https://via.placeholder.com/40" },
        { name: "Diana Prince", message: "Hi there! I noticed your work in the industry and would love to conne...", img: "https://via.placeholder.com/40" },
        { name: "Barbara Gordon", message: "Greetings! Your profile caught my attention and I would appreciate...", img: "https://via.placeholder.com/40" },
        { name: "Paula Irving", message: "Hi! I found your expertise quite fascinating and would love to co...", img: "https://via.placeholder.com/40" },
       
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
            <div className="bg-white w-[380px] rounded-2xl shadow-2xl overflow-hidden relative animate-scale-in ">

                {/* Header */}
                <div className="bg-gradient-to-r from-pink-200 to-pink-100 flex justify-between items-center px-5 py-3 border-b">
                    <h1 className="text-lg font-semibold text-[#540D33]">Messages</h1>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-pink-200 transition">
                        <FaTimes className="text-gray-600" />
                    </button>
                </div>

                {/* Messages List */}
                <div className="max-h-[460px] overflow-y-auto custom-scroll">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 px-5 sm:py-3 py-2 border-b last:border-none hover:bg-[#E331830F] cursor-pointer transition"
                        >
                            <img src={msg.img} alt={msg.name} className="w-11 h-11 rounded-full border border-gray-300" />
                            <div className="flex-1">
                                <h2 className="text-sm font-semibold text-[#540D33]">{msg.name}</h2>
                                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-3 text-center ">
                    <button
                        
                        className="px-5  text-white font-medium "
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Animation */}
            <style>{`
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.2s ease-out;
                }
                /* Custom scrollbar */
                .custom-scroll::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                    background-color: #e33183;
                    border-radius: 10px;
                }
                .custom-scroll::-webkit-scrollbar-track {
                    background: #f3f3f3;
                }
            `}
            </style>
        </div>
    );
}

export default MessagePopUp;
