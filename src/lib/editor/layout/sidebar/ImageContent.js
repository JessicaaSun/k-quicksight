/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useAsync } from "react-use";
import axios from "axios";
import { getThumbnail } from "../../utils/thumbnail";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@lidojs/editor";

const ImageContent = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useAsync(async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}files/view/images/`
    );
    setImages(response.data);
    setIsLoading(false);
  }, []);

  const { actions } = useEditor();

  const addImage = async (thumb, url) => {
    const img = new Image();

    img.src = url;
    img.onload = () => {
      actions.addImageLayer(
        { thumb, url },
        { width: img.naturalWidth, height: img.naturalHeight }
      );
      if (isMobile) {
        onClose();
      }
    };
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
          Images
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
            padding: "16px",
            gridGap: 8,
          }}
        >
          {isLoading && <div>Loading...</div>}
          {images.map((item, idx) => (
            <div
              key={idx}
              style={{
                cursor: "pointer",
                position: "relative",
                paddingBottom: "100%",
                width: "100%",
              }}
              onClick={() => {
                addImage(item.img, item.img);
                console.log(item.img);
              }}
            >
              <img
                src={item.img}
                loading="lazy"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
                width={100}
                height={100}
                alt="Thumbnail"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageContent;
