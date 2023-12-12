import React from "react";

const SelectButton = ({ text, color, rounded, icon, clickAction, hover }) => {
  return (
    <button
      onClick={clickAction}
      className={`bg-${color} hover:bg-hover-primary rounded-${rounded} text-white  hover:bg-${hover} h-[36px] px-6`}
    >
      <span className="flex justify-center items-center gap-2">
        {icon} {text}
      </span>
    </button>
  );
};

export default SelectButton;
