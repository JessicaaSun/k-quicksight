"use client";
import React, { createContext, useContext, useState } from "react";

const PreviewContext = createContext();

export const PreviewProvider = ({ children }) => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  const handleOnClickPreview = () => {
    setIsOpenPreview((prev) => !prev);
  };

  return (
    <PreviewContext.Provider value={{ isOpenPreview, handleOnClickPreview }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const useHandlePreview = () => {
  return useContext(PreviewContext);
};
