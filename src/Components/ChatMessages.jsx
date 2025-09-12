import React, { useState } from 'react'
import { HiMiniChatBubbleBottomCenterText } from "react-icons/hi2";
import MessagePopUp from './MessagePopUp'; // Adjust the import path as needed

function ChatMessages() {
    const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false);

    const toggleMessagePopup = () => {
        setIsMessagePopupOpen(!isMessagePopupOpen);
    };

    return (
        <>
            <div className="fixed right-8 bottom-80 z-50">
                <button 
                    onClick={toggleMessagePopup}
                    className="bg-[#E33183] hover:bg-[#d12975] text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                >
                    <HiMiniChatBubbleBottomCenterText className="text-4xl" />
                </button>
            </div>

            {/* Message Popup */}
            <MessagePopUp 
                isOpen={isMessagePopupOpen} 
                onClose={() => setIsMessagePopupOpen(false)} 
            />
        </>
    )
}

export default ChatMessages