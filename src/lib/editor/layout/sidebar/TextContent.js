/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useAsync } from "react-use";
import axios from "axios";
import { getThumbnail } from "../../utils/thumbnail";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@lidojs/editor";
import Image from "next/image";

const TextContent = ({ onClose }) => {
  const { actions } = useEditor();
  const [texts, setTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useAsync(async () => {
    const response = await axios.get("https://api-gilt-one.vercel.app/texts");
    setTexts(response.data);
    setIsLoading(false);
  }, []);

  const handleAddText = (data) => {
    actions.addLayerTree(data);
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
          Text
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
            gridTemplateColumns: "repeat(3,minmax(0,1fr))",
            gridGap: 8,
            padding: "16px",
          }}
        >
          {isLoading && <div>Loading...</div>}
          {texts.map(({ img, data }, idx) => (
            <div
              key={idx}
              style={{
                cursor: "pointer",
                position: "relative",
                paddingBottom: "100%",
                width: "100%",
              }}
              onClick={() => {handleAddText(JSON.parse(data), console.log("text data:",JSON.parse(data)))}}
            >
              <img
                alt="text"
                src={getThumbnail(img)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextContent;
