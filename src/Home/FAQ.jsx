import React, { useState, useRef } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const faqs = [
    {
      id: 1,
      question: "What is Ishtam Marry?",
      answer:
        "Ishtam Marry is a modern matchmaking platform designed to help individuals find their ideal life partner based on compatibility, values, and preferences."
    },
    {
      id: 2,
      question: "Is creating a profile free?",
      answer:
        "Yes! Creating a profile on Ishtam Marry is completely free. You can browse matches, view profiles, and show interest without any charges."
    },
    {
      id: 3,
      question: "How does the matching process work?",
      answer:
        "Our system uses your preferences—such as community, profession, lifestyle, and personal values—to show the most compatible matches for you."
    },
    {
      id: 4,
      question: "Is my information kept private?",
      answer:
        "Absolutely. Your personal information and photos stay protected. Only the details you choose to share will be visible to other members."
    },
    {
      id: 5,
      question: "Can I delete or edit my profile anytime?",
      answer:
        "Yes, you have full control over your account. You can edit your details, update your photos, or delete your profile whenever you want."
    },
    {
      id: 6,
      question: "Do you verify profiles?",
      answer:
        "Yes. We follow a strict verification process to ensure profiles are genuine and trustworthy, helping you match with real, authentic people."
    },
    {
      id: 7,
      question: "How can I contact someone I’m interested in?",
      answer:
        "You can express interest directly from their profile. If they accept, both of you can connect through our secure communication options."
    },
    {
      id: 8,
      question: "Is Ishtam Marry available outside India?",
      answer:
        "Yes! We support global users. NRIs and people living abroad can register and connect with matches from anywhere."
    }
  ];


  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="FAQ" className="w-full min-h-screen flex justify-center items-center bg-gray-50 sm:py-20 py-10 scroll-mt-20">
      <div className="sm:w-[80%] w-[90%] space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className={`rounded-lg transition-all duration-300 overflow-hidden ${activeIndex === index ? "bg-purple-100" : "bg-gray-100"
              }`}
          >
            <div
              className="flex items-center justify-between p-8 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center gap-6">
                <span className="sm:text-4xl text-3xl font-bold text-gray-400">
                  {faq.id.toString().padStart(2, "0")}
                </span>
                <h2 className="text-lg sm:text-[26px] font-semibold text-gray-800">
                  {faq.question}
                </h2>
              </div>
              <div
                className={`text-gray-600 text-xl flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? "rotate-90" : ""
                  }`}
              >
                {activeIndex === index ? <FaTimes /> : <FaPlus />}
              </div>
            </div>

            <div
              ref={(el) => (contentRefs.current[index] = el)}
              style={{
                maxHeight: activeIndex === index
                  ? `${contentRefs.current[index]?.scrollHeight}px`
                  : "0px",
              }}
              className="transition-all duration-500 ease-in-out overflow-hidden"
            >
              <div className="px-15 pb-5 text-gray-600 text-sm sm:text-xl leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;