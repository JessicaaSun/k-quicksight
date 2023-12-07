import React, { createContext, useContext, useState } from "react";

const VisualizeFileContext = createContext();

export const VisualizeFileProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const setFile = (file) => {
    setSelectedFile(file);
  };

  return (
    <VisualizeFileContext.Provider value={{ selectedFile, setFile }}>
      {children}
    </VisualizeFileContext.Provider>
  );
};

export const useVisualizeFileContext = () => {
  return useContext(VisualizeFileContext);
};
