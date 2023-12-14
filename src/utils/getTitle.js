import React from "react";

const getTitle = (item, index) => {
  if (item?.title !== null) {
    return item?.title;
  } else {
    return `Untitled${index > 0 ? ` ${index}` : ""}`;
  }
};

export default getTitle;
