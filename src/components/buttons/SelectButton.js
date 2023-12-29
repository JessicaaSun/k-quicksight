import React from "react";

const SelectButton = ({ text, disabled, color,height, rounded, icon, clickAction, hover }) => {
  return (
    <button
      onClick={clickAction}
      disabled={disabled}
      className={`bg-${color} hover:bg-hover-primary rounded-${rounded} text-white  hover:bg-${hover} h-[${height}] px-6`}
    >
      <span className="flex justify-center text-sm font-medium items-center gap-2">
        {icon} {text}
      </span>
    </button>
  );
};

export default SelectButton;
