"use client";

import React, { useState } from "react";
import { useAsync } from "react-use";
import axios from "axios";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@lidojs/editor";
import Image from "next/image";
import MyLineChart from "../../tests/Chart";
import { generateChart, lineChart } from "../../tests/htmlChart";

const FrameContent = ({ onClose }) => {
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { actions } = useEditor();

  // useAsync(async () => {
  //     const response = await axios.get('/frames');
  //     setFrames(response.data);
  //     setIsLoading(false);
  // }, []);

  const addShape = () => {
    
    actions.addLayerTree(generateChart());
    if (isMobile) {
      onClose();
    }
  };

  const shapes = [
    {
      type: "rectangle",
      width: 100,
      height: 100,
      icon: <MyLineChart />,
    },
  ];
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
          Frames
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
          {/* {isLoading && <div>Loading...</div>} */}
          {shapes.map((shape) => (
            <div
              key={shape.type}
              style={{
                width: "100%",
                paddingBottom: "100%",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => {
                
                addShape();
              }}
            >
              {shape.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrameContent;
