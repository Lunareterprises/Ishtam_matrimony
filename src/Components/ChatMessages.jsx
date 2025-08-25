import React from 'react'
import { HiMiniChatBubbleBottomCenterText } from "react-icons/hi2";


function ChatMessages() {
    return (
    
            <div className="fixed right-8 bottom-80 z-50">
                <button className="bg-[#E33183]  text-white p-3 rounded-full shadow-lg flex items-center justify-center">
                    <HiMiniChatBubbleBottomCenterText className="text-4xl" />
                </button>
            </div>
        
    )
}

export default ChatMessages
