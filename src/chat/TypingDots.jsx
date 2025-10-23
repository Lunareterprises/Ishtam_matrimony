import React from 'react';

function TypingDots() {
  return (
    <div className="flex items-center gap-1 mt-1">
      <span className="sm:w-2 sm:h-2 h-1 w-1 bg-gray-400 rounded-full animate-bounceTyping"></span>
      <span className="sm:w-2 sm:h-2 h-1 w-1 bg-gray-400 rounded-full animate-bounceTyping animation-delay-200"></span>
      <span className="sm:w-2 sm:h-2 h-1 w-1 bg-gray-400 rounded-full animate-bounceTyping animation-delay-400"></span>

      <style jsx>{`
        @keyframes bounceTyping {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        .animate-bounceTyping {
          animation: bounceTyping 1s infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

export default TypingDots;
