"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Sidebar from "./layout/Sidebar";
import EditorContent from "./pages/EditorContent";
import PreviewModal from "./PreviewModal";
import axios from "axios";
import { isArray } from "lodash";
import AppLayerSettings from "./layout/AppLayerSettings";
import { Editor, PageControl } from "@lidojs/editor";
import styled from "styled-components";
import Loading from "@/app/loading";
import { useHandlePreview } from "@/context/EditorPreviewContext";
import HeaderLayout from "./layout/HeaderLayout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  max-height: auto;
`;

const KQSEditor = ({ isSidebarHidden }) => {
  const leftSidebarRef = useRef(null);
  const [viewPortHeight, setViewPortHeight] = useState(0);
  const { handleOnClickPreview, isOpenPreview } = useHandlePreview();

  const getFonts = useCallback(async (query) => {
    const buildParams = (data) => {
      const params = new URLSearchParams();

      Object.entries(data).forEach(([key, value]) => {
        if (isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      });

      return params;
    };

    const res = await axios.get(`https://api-gilt-one.vercel.app/fonts?${buildParams(query)}`);
    return res.data;
  }, []);

  const windowHeight = () => {
    try {
      const height = window?.innerHeight;
      setViewPortHeight(height);
    } catch (error) {
      console.log("-->", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", windowHeight);
      windowHeight();
      return () => {
        window.removeEventListener("resize", windowHeight);
      };
    }
  }, [viewPortHeight]);

  if (viewPortHeight === 0) {
    return <Loading />;
  }

  return (
    <Editor
      config={{
        assetPath: "http://localhost:3000/assets/",
        frame: {
          defaultImage: {
            url: `http://localhost:3000/assets/images/frame-placeholder.png`,
            width: 1200,
            height: 800,
          },
        },
      }}
      getFonts={getFonts}
    >
      <Container
        className={` ${
          isSidebarHidden ? "w-full" : "w-[calc(100vw-255px)]"
        } h-[calc(100vh-64px)] max-h-auto overflow-y-hidden`}
      >
        <HeaderLayout/>
        {isOpenPreview && <PreviewModal onClose={handleOnClickPreview} />}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: "auto",
            overflow: "auto",
            background: "#EBECF0",
            "@media (maxWidth: 900px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          <div
            ref={leftSidebarRef}
            style={{
              display: "flex",
              background: "white",
            }}
          >
            <Sidebar />
          </div>
          <div
            style={{
              flexGrow: 1,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <AppLayerSettings />
            <div
              style={{
                flexGrow: 1,
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <EditorContent />
            </div>
            <div
              style={{
                height: 40,
                background: "#fff",
                borderTop: "1px solid rgba(57,76,96,.15)",
                display: "grid",
                alignItems: "center",
                flexShrink: 0,
                "@media (maxWidth: 900px)": {
                  display: "none",
                },
              }}
            >
              <PageControl />
            </div>
          </div>
        </div>
      </Container>
    </Editor>
  );
};

export default KQSEditor;
