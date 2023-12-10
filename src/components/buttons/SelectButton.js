import React from "react";

const SelectButton = ({ text, color, clickAction, hover }) => {
  return (
    <button
      onClick={clickAction}
      className={`bg-${color} text-white hover:bg-${hover} rounded-full h-[38px] px-6`}
    >
      {text}
    </button>
  );
};

export default SelectButton;
