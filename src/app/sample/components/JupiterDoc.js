import React, { useEffect, useState } from "react";

const JupiterDoc = ({ filename }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchHtmlContent = async () => {
      try {
        const response = await fetch(
          `https://photostad-api.istad.co/api/v1/jupyter/notebook/${filename}/`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch HTML content: ${response.statusText}`
          );
        }
        const content = await response.text();
        setHtmlContent(content);
      } catch (error) {}
    };

    fetchHtmlContent();
  }, [filename]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default JupiterDoc;
