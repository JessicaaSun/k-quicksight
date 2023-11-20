"use client";
import React, { useState } from "react";
import XIcon from "@duyank/icons/regular/X";
import { useAsync } from "react-use";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { useEditor } from "@lidojs/editor";
import Image from "next/image";

const TemplateContent = ({ onClose }) => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { actions, activePage } = useEditor((state) => ({
    activePage: state.activePage,
  }));

  useAsync(async () => {
    const response = await axios.get("/templates");
    setTemplates(response.data);
    setIsLoading(false);
  }, []);

  const addPage = async (data) => {
    actions.setPage(activePage, data);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflowY: "auto",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          height: 48,
          borderBottom: "1px solid rgba(57,76,96,.15)",
          padding: "0 20px",
        }}
      >
        <p
          style={{
            lineHeight: "48px",
            fontWeight: 600,
            color: "#181C32",
            flexGrow: 1,
          }}
        >
          Templates
        </p>
        <div
          style={{
            fontSize: 20,
            flexShrink: 0,
            width: 32,
            height: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
        >
          <XIcon />
        </div>
      </div>
      <div
        style={{ flexDirection: "column", overflowY: "auto", display: "flex" }}
      >
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gridGap: 8,
            padding: "16px",
          }}
        >
          {isLoading && <div>Loading...</div>}
          {templates.map((item, index) => (
            <div
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => addPage(JSON.parse(item.data))}
            >
              <Image src={item.img} loading="lazy" alt={`Template ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateContent;
