// DropDown.js

import React, { useState } from "react";

function DropDown({ options, selected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ label: "All", value: "" });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    selected(option.value); // Call the selected function with the option value
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div>
      <div>
        <button className="bg-blue-300 rounded-[20px] px-6 py-2" onClick={toggleDropdown}>{selectedOption.label}</button>
      </div>
      <div>
        {isOpen && (
          <ul>
            {options.map((option, index) => (
              <li
                className="bg-blue-200 cursor-pointer m-1 rounded-[10px] border-b border-gray-300 text-center"
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DropDown;
