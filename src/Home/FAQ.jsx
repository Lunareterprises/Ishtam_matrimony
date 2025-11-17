import React, { useState, useRef } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const faqs = [
    {
      id: 1,
      question: "Alright, but what exactly do you do?",
      answer:
        "As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design.",
    },
    {
      id: 2,
      question:
        "I don't need a brand strategist but I need help executing an upcoming campaign. Can we still work together?",
      answer:
        "Absolutely! We can assist you in executing specific campaigns or projects even if you don't require full brand strategy services.",
    },
    {
      id: 3,
      question: "Are your rates competitive?",
      answer:
        "We offer flexible pricing tailored to your project's scope and budget, ensuring top-quality work at a fair rate.",
    },
    {
      id: 4,
      question: "Why do you have a monthly project cap?",
      answer:
        "We limit the number of projects per month to ensure that every client receives our full focus and attention.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div id="FAQ" className="w-full min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="sm:w-[80%] w-[90%] space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className={`rounded-lg transition-all duration-300 overflow-hidden ${
              activeIndex === index ? "bg-purple-100" : "bg-gray-100"
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
                className={`text-gray-600 text-xl flex-shrink-0 transition-transform duration-300 ${
                  activeIndex === index ? "rotate-90" : ""
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