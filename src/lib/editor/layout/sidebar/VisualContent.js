/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useAsync } from "react-use";
import axios from "axios";
import { getThumbnail } from "../../utils/thumbnail";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@lidojs/editor";
import { Select } from "antd";

const VisualContent = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const options = [
    {
      id: 1,
      value: "line",
      label: "Line Chart",
    },
    {
      id: 2,
      value: "pie",
      label: "Pie Chart",
    },
    {
      id: 3,
      value: "bar",
      label: "Bar Chart",
    },
  ];
  useAsync(async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/files/view/images/"
    );
    setImages(response.data);
    setIsLoading(false);
  }, []);

  const { actions } = useEditor();

  const addImage = async (thumb, url) => {
    const img = new Image();
    img.src = url;
    await img.decode();

    actions.addImageLayer(
      { thumb, url },
      { width: img.width, height: img.height }
    );

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
          Charts
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
        className="mx-5"
        style={{
          flexDirection: "column",
          marginTop: 20,
          overflowY: "auto",
          display: "flex",
        }}
      >
        <div className="mb-3">
          <p className="text-text-color pb-2 font-semibold text-sm">
            Visual Type
          </p>
          <Select
            style={{ width: "100%" }}
            placeholder="Select an option"
            onChange={console.log("hi")}
            options={options}
          />
        </div>

        <p className="text-text-color mb-3 font-semibold text-sm">Fields</p>
        <div className="mb-2">
          <div className="ps-2 text-sm text-text-color pb-2 font-semibold">
            Legend
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Select an option"
            onChange={console.log("hi")}
            options={options}
          />
        </div>
        <div className="mb-2">
          <p className="ps-2 text-sm text-text-color pb-2 font-semibold">
            Values
          </p>
          <Select
            style={{ width: "100%" }}
            placeholder="Select an option"
            onChange={console.log("hi")}
            options={options}
          />
        </div>
        <div className="mb-2">
          <p className="ps-2 text-sm   text-text-color pb-2 font-semibold">
            Tooltip
          </p>
          <Select
            style={{ width: "100%" }}
            placeholder="Select an option"
            onChange={console.log("hi")}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default VisualContent;
