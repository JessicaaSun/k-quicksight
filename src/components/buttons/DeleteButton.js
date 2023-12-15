import React from "react";

const DeleteButtonComponent = ({
  text,
  rounded,
  icon,
  paddingX,
  color,
  clickAction,
  hover,
}) => {
  return (
    <button
      onClick={clickAction}
      className={`bg-${color} hover:bg-hover-danger text-white hover:bg-[${hover}] rounded-${rounded} h-[36px] px-${paddingX}`}
    >
      <span className="flex justify-center items-center gap-2">
        {icon} {text}
      </span>
    </button>
  );
};

export default DeleteButtonComponent;
