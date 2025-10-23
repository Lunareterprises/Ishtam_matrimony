import React, { useEffect, useState } from 'react';
import { FaRegUser, FaTimes } from "react-icons/fa";
import { IoCheckmark, IoCheckmarkDoneSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Socket from '../socket/Socket'; // adjust the path

function MessagePopUp({ isOpen, onClose }) {
    const [messages, setMessages] = useState([]);
    const [typingUsers, setTypingUsers] = useState({});
    const [readMessages, setReadMessages] = useState({});
    const navigate = useNavigate();
    const user_id = sessionStorage.getItem("user_id");

    useEffect(() => {
        if (!user_id) return;

        // Connect socket if not connected
        if (!Socket.connected) {
            Socket.connect();
            Socket.emit("userOnline", { user_id });
        }

        // Request chat list
        Socket.emit("listChats", { user_id });

        // ✅ Chats list
        Socket.on("chats", (data) => {
            setMessages(data);
        });

        // ✅ Online users update
        Socket.on("onlineUsers", (users) => {
            const onlineIds = users.map(u => u.user_id);
            setMessages(prev =>
                prev.map(chat => ({
                    ...chat,
                    partner: {
                        ...chat.partner,
                        isOnline: onlineIds.includes(chat.partner.id)
                    }
                }))
            );
        });

        // ✅ Typing updates
        Socket.on("typing", ({ user_id: typingUserId }) => {
            setTypingUsers(prev => ({ ...prev, [typingUserId]: true }));
        });

        Socket.on("stopTyping", ({ user_id: typingUserId }) => {
            setTypingUsers(prev => {
                const updated = { ...prev };
                delete updated[typingUserId];
                return updated;
            });
        });

        // ✅ Read receipts
        Socket.on("messagesRead", ({ chat_id, reader_id }) => {
            setReadMessages(prev => ({
                ...prev,
                [chat_id]: reader_id,
            }));
        });

        return () => {
            Socket.off("chats");
            Socket.off("onlineUsers");
            Socket.off("typing");
            Socket.off("stopTyping");
            Socket.off("messagesRead");
        };
    }, [user_id]);

    if (!isOpen) return null;

    const navigateToChatWindow = (chat_id, partner) => {
        navigate('/chatWindow', { state: { chat_id, partner } });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
            <div className="bg-white w-[380px] rounded-2xl shadow-2xl overflow-hidden relative animate-scale-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-pink-200 to-pink-100 flex justify-between items-center px-5 py-3 border-b border-gray-300">
                    <h1 className="text-lg font-semibold text-[#540D33]">Messages</h1>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-pink-200 transition">
                        <FaTimes className="text-gray-600" />
                    </button>
                </div>

                {/* Messages List */}
                <div className="max-h-[460px] overflow-y-auto custom-scroll">
                    {messages.length === 0 && (
                        <div className="flex items-center justify-center max-h-[460px]">
                            <p className="text-center text-gray-500 mt-3">No messages</p>
                        </div>
                    )}

                    {messages.map((chat) => {
                        const isTyping = typingUsers[chat.partner.id];
                        const lastMsg = chat.lastMessage;
                        const isSender = String(lastMsg?.sender_id) === String(user_id);
                        const isRead = readMessages[chat.chat_id] === chat.partner.id;

                        return (
                            <div
                                onClick={() => navigateToChatWindow(chat.chat_id, chat.partner)}
                                key={chat.chat_id}
                                className="flex items-center gap-3 px-5 sm:py-3 py-2 border-b border-gray-300 last:border-none hover:bg-[#E331830F] cursor-pointer transition relative"
                            >
                                {/* Profile */}
                                {chat.partner.profile_pic ? (
                                    <div className="relative">
                                        <img
                                            src={`https://lunarsenterprises.com:6050${chat.partner.profile_pic}`}
                                            alt={chat.partner.firstname}
                                            className="w-11 sm:w-12 sm:h-12 h-11 object-cover rounded-full border border-gray-300"
                                        />
                                        <span
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                                chat.partner.isOnline ? "bg-green-500" : "bg-gray-400"
                                            }`}
                                        ></span>
                                    </div>
                                ) : (
                                    <div className="relative flex items-center bg-[#D9D9D9] w-11 h-11 rounded-full border border-gray-300 justify-center">
                                        <FaRegUser className="text-[#797979] text-[15px]" />
                                        <span
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                                chat.partner.isOnline ? "bg-green-500" : "bg-gray-400"
                                            }`}
                                        ></span>
                                    </div>
                                )}

                                {/* Chat Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-sm font-semibold text-[#540D33] truncate">
                                            {chat.partner.firstname} {chat.partner.lastname}
                                        </h2>
                                        {/* Read icon (only if sender) */}
                                        {isSender && lastMsg && (
                                            <div className="ml-2">
                                                {isRead ? (
                                                    <IoCheckmarkDoneSharp className="text-blue-500 text-sm" />
                                                ) : (
                                                    <IoCheckmark className="text-gray-400 text-sm" />
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {isTyping ? (
                                        <p className="text-xs text-pink-500 italic mt-0.5 animate-pulse">Typing...</p>
                                    ) : (
                                        <p className="text-xs text-gray-600 mt-0.5 truncate">
                                            {lastMsg?.message
                                                ? lastMsg.message.split(" ").slice(0, 13).join(" ") + "..."
                                                : "No messages yet"}
                                        </p>
                                    )}
                                </div>

                                {/* Unread Badge */}
                                {chat.unreadCount > 0 && (
                                    <span className="absolute top-2 right-6 bg-pink-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-md">
                                        {chat.unreadCount}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-3 text-center">
                    <button
                        onClick={onClose}
                        className="px-7 py-2 bg-pink-500 text-white font-medium rounded-full hover:bg-pink-600 transition"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Animation & Scrollbar */}
            <style>{`
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.2s ease-out;
                }
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
            `}</style>
        </div>
    );
}

export default MessagePopUp;
