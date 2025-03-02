import React, { useState } from "react";


const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button
      className="w-full text-left py-4 px-6 focus:outline-none"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">{title}</span>
        <span className={`text-lg transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
    </button>
    <div className={`accordion-content ${isOpen ? "open" : ""}`}>
      <p className="text-gray-800 text-base">{content}</p>
    </div>
  </div>
);

export function AccordionDemo({ items }) {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.question}
          content={item.answer}
          isOpen={openItem === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}