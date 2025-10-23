import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Components/Sidebar';
import { FaRegSmile, FaRegImage, FaRegHeart, FaBars, FaRegUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Socket from '../socket/Socket';
import TypingDots from './TypingDots';
import Swal from 'sweetalert2';
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from 'react-icons/io5';

// ✅ Helper: Format date separator labels
function formatChatDate(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function ChatWindow() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { chat_id, partner } = location.state || {};
    const user_id = sessionStorage.getItem("user_id");
    const [message, setMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isPartnerTyping, setIsPartnerTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [readMessages, setReadMessages] = useState([]);
    const [isPartnerOnline, setIsPartnerOnline] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        Socket.on("onlineUsers", (users) => {
            console.log("users: ", users);
            setOnlineUsers(users);
        });
    }, [onlineUsers]);

    useEffect(() => {
        if (!user_id || !partner?.id) return;
        console.log("partner", partner);

        if (!Socket.connected) {
            Socket.connect();
            Socket.emit("userOnline", { user_id });
            console.log("🔌 Socket connected and userOnline emitted:", user_id);
        }

        Socket.emit("joinRoom", { user_id, receiver_id: partner.id });
        console.log("🚪 Joining chat room with partner:", partner.id);

        Socket.on("joined", ({ chat_id, messages: msgs, isOnline }) => {
            console.log("💬 Joined chat room:", chat_id);
            console.log("📨 Previous messages:", msgs);
            console.log("🟢 Is partner online:", isOnline);
            setIsPartnerOnline(isOnline);
            setMessages(msgs);
            Socket.emit("messageRead", { chat_id, user_id });
        });

        Socket.on("message", (msg) => {
            console.log("✉️ New message received:", msg);
            setMessages(prev => [...prev, msg]);
        });

        Socket.on("typing", ({ user_id: typingUserId }) => {
            console.log(`💭 User ${typingUserId} is typing...`);
            if (String(typingUserId) === String(partner.id)) setIsPartnerTyping(true);
        });
        Socket.on("stopTyping", ({ user_id: typingUserId }) => {
            console.log(`💤 User ${typingUserId} stopped typing`);
            if (String(typingUserId) === String(partner.id)) setIsPartnerTyping(false);
        });

        Socket.on("error", (err) => {
            console.error("❌ Socket error:", err);
            Swal.fire({
                title: 'Oops!',
                text: err?.message || 'An unexpected error occurred in the chat.',
                icon: 'error',
                confirmButtonText: 'ok',
                confirmButtonColor: '#E33183'
            });
        });

        return () => {
            Socket.off("joined");
            Socket.off("message");
            Socket.off("typing");
            Socket.off("stopTyping");
            Socket.off("error");
        };
    }, [user_id, partner?.id]);

    const handleSend = () => {
        if (!message.trim()) return;

        const payload = { chat_id, sender_id: user_id, message };
        console.log("📤 Sending message:", payload);
        Socket.emit("sentMessage", payload);

        setMessage('');
        Socket.emit("stopTyping", { chat_id, user_id });
    };

    const handleTyping = (e) => {
        setMessage(e.target.value);
        Socket.emit("typing", { chat_id, user_id });
        if (e.target.value === '') {
            Socket.emit("stopTyping", { chat_id, user_id });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // ✅ Group messages by date
    const groupedMessages = messages.reduce((groups, msg) => {
        const dateKey = new Date(msg.created_at || msg.time).toDateString();
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(msg);
        return groups;
    }, {});

    return (
        <div className="flex">
            {/* Sidebar - desktop */}
            <div className="hidden lg:block w-64">
                <Sidebar />
            </div>

            {/* Sidebar - mobile drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex">
                    <div className="fixed inset-0" onClick={() => setSidebarOpen(false)} />
                    <div className="relative bg-white z-50 h-full">
                        <Sidebar />
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                <div className="flex h-screen flex-col w-full border-gray-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <button className="xl:hidden" onClick={() => setSidebarOpen(true)}>
                                <FaBars className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-4">
                                {partner.profile_pic ? (
                                    <img
                                        src={`https://lunarsenterprises.com:6050${partner.profile_pic}`}
                                        className="sm:w-13 sm:h-13 w-10 h-10 rounded-full object-cover"
                                        alt=""
                                    />
                                ) : (
                                    <div className="sm:w-13 sm:h-13 w-10 h-10 rounded-full border bg-[#D9D9D9] border-gray-400 flex items-center justify-center">
                                        <FaRegUser className="text-[#797979] text-[15px]" />
                                    </div>
                                )}

                                <div className="flex flex-col items-start justify-center">
                                    <div className="flex gap-1 items-center">
                                        <h2 className="font-semibold sm:text-lg text-sm">
                                            {partner?.firstname} {partner?.lastname}
                                        </h2>
                                        <span className="text-gray-600">|</span>
                                        <h2 className="text-gray-400 text-sm sm:text-lg">
                                            ITM{partner?.id}
                                        </h2>
                                    </div>
                                    {isPartnerOnline && (
                                        <h1 className="text-green-500 font-normal sm:text-[15px] text-sm">
                                            Online
                                        </h1>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 bg-white sticky bottom-0 z-10">
                        <div className="space-y-4 mx-auto">
                            {Object.keys(groupedMessages).map((dateKey) => (
                                <div key={dateKey}>
                                    {/* 🗓️ Date separator */}
                                    <div className="flex justify-center my-4">
                                        <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                                            {formatChatDate(dateKey)}
                                        </span>
                                    </div>

                                    {groupedMessages[dateKey].map((msg) => {
                                        const isSender = String(msg.sender_id) === String(user_id);

                                        return (
                                            <div
                                                key={msg.id}
                                                className={`flex items-end ${isSender ? 'justify-end' : 'justify-start'} gap-2`}
                                            >
                                                {!isSender && partner?.profile_pic && (
                                                    <img
                                                        src={`https://lunarsenterprises.com:6050${partner.profile_pic}`}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                        alt={partner.firstname}
                                                    />
                                                )}

                                                <div className="max-w-xs lg:max-w-md break-words">
                                                    {msg.image ? (
                                                        <div className="rounded-2xl overflow-hidden">
                                                            <img src={msg.image} alt="Shared" className="w-full h-auto" />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={`px-4 py-2 text-sm ${isSender
                                                                ? 'bg-pink-500 text-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-sm'
                                                                : 'bg-gray-100 text-gray-900 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-sm'
                                                                }`}
                                                        >
                                                            {msg.message || msg.content}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-end gap-2">
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {new Date(msg.created_at || msg.time).toLocaleTimeString('en-US', {
                                                                hour: 'numeric',
                                                                minute: '2-digit',
                                                                timeZone: 'Asia/Kolkata'
                                                            })}
                                                        </p>

                                                        {isSender && (
                                                            readMessages.includes(chat_id) ? (
                                                                <p className="text-blue-500">
                                                                    <IoCheckmarkDoneSharp />
                                                                </p>
                                                            ) : (
                                                                <p className="text-gray-400">
                                                                    <IoCheckmarkSharp />
                                                                </p>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}

                            {isPartnerTyping && (
                                <div className="flex items-end gap-2">
                                    {!partner?.profile_pic ? (
                                        <div className="w-8 h-8 rounded-full border bg-[#D9D9D9] border-gray-400 flex items-center justify-center">
                                            <FaRegUser className="text-[#797979] text-[15px]" />
                                        </div>
                                    ) : (
                                        <img
                                            src={`https://lunarsenterprises.com:6050${partner.profile_pic}`}
                                            className="w-8 h-8 rounded-full object-cover"
                                            alt={partner.firstname}
                                        />
                                    )}
                                    <div className="bg-gray-100 px-4 py-2 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-sm max-w-xs lg:max-w-md">
                                        <TypingDots />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Message Input Area */}
                    <div className="border-t border-gray-200 px-4 py-4 bg-white">
                        <div className="flex items-center gap-2 max-w-2xl mx-auto">
                            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-4">
                                <input
                                    type="text"
                                    placeholder="Message..."
                                    value={message}
                                    onChange={handleTyping}
                                    onKeyPress={handleKeyPress}
                                    className="flex-1 bg-transparent outline-none text-sm"
                                />
                            </div>

                            {message.trim() ? (
                                <button
                                    onClick={handleSend}
                                    className="text-[15px] font-semibold text-[#E33183] hover:text-[#8a0040] transition"
                                >
                                    Send
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;
