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
import { Textarea } from "@nextui-org/react";
import { generateText } from "@/data/textLayoutTreeTxt";
const TextContent = ({ onClose }) => {
  const { actions } = useEditor();
  const [texts, setTexts] = useState([]);
  const [textInput, setTextInput] = useState();
  const [dataText, setDataText] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useAsync(async () => {
    const response = await axios.get("https://api-gilt-one.vercel.app/texts");
    setTexts(response.data);
    setIsLoading(false);
  }, []);

  const handleChangeText = (e) => {
    // const newText = e.target.value.replace(/<br\s*\/?>/g, "\n");
    setTextInput(e.target.value);
    setDataText(generateText(e.target.value));
  };
  const handleSetNewLine = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTextInput((prevText) => prevText + "<br>");
    }
  };

  const handleAddText = (data) => {
    actions.addLayerTree(data);
    if (isMobile) {
      onClose();
    }
    setTextInput("");
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
        style={{
          flexDirection: "column",
          overflowY: "auto",
          display: "flex",
          margin: "16px",
        }}
      >
        <div>
          <Textarea
            placeholder="Enter your Text"
            value={textInput}
            onChange={handleChangeText}
            onKeyDown={handleSetNewLine}
          />
        </div>
        <div
          className="h-[30px] w-full"
          onClick={() => {
            handleAddText(JSON.parse(dataText.data));
          }}
        >
          <button className="h-full w-full mt-3 rounded-lg text-sm font-semibold bg-primary-color text-white">
            Add Text
          </button>
        </div>
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(3,minmax(0,1fr))",
            gridGap: 8,
            padding: "16px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TextContent;
