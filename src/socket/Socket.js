import { io } from "socket.io-client";

const Socket = io("https://lunarsenterprises.com:6050", {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false, // we’ll connect manually
});

Socket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});

Socket.on("disconnect", (reason) => {
  console.log("🔴 Socket disconnected:", reason);
});

export default Socket;
