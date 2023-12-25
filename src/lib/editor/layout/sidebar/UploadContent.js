/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from "react";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@lidojs/editor";
import { fetchSvgContent } from "@lidojs/utils";
import { useAsync } from "react-use";
import { Spinner } from "@nextui-org/react";
import {
  useGetImagesEditorQuery,
  useUploadImageEditorMutation,
} from "@/store/features/editorImage/EditorImageApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Loading from "@/app/loading";
import axios from "axios";

const UploadContent = ({ visibility, onClose }) => {
  const inputFileRef = useRef(null);
  const { actions } = useEditor();
  const [uploadImage] = useUploadImageEditorMutation();
  const [isLoading, setIsLoading] = useState(true);
  const { data: user } = useGetUserQuery();
  const { data: imagesEditor, isLoading: imagesLoading } =
    useGetImagesEditorQuery({
      userUuid: user?.data?.uuid,
    });

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

  const addSvg = async (url) => {
    const ele = await fetchSvgContent(url);
    const viewBox = ele.getAttribute("viewBox")?.split(" ") || [];
    const width =
      viewBox.length === 4 ? +viewBox[2] : +(ele.getAttribute("width") || 100);
    const height =
      viewBox.length === 4 ? +viewBox[3] : +(ele.getAttribute("height") || 100);
    actions.addSvgLayer(url, { width, height }, ele);
    if (isMobile) {
      onClose();
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const response = await uploadImage({
        data: file,
        userUuid: user?.data?.uuid,
      });
      console.log("res", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflowY: "auto",
        display: visibility ? "flex" : "none",
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
          Upload Images
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
          margin: "16px 16px 0 16px",
          background: "#0346A5",
          borderRadius: 8,
          color: "#fff",
          padding: "8px 16px",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => inputFileRef.current?.click()}
      >
        Upload
      </div>
      <input
        ref={inputFileRef}
        type={"file"}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <div style={{ padding: "16px" }}>
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gridGap: 8,
          }}
        >
          {imagesEditor?.results.map((item, idx) => (
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

export default UploadContent;
