import React, { useState } from "react";
import SidebarTab from "../tabs/TabList";
import TextTIcon from "@duyank/icons/regular/TextT";
import SquareIcon from "@duyank/icons/regular/Square";
import ImageIcon from "@duyank/icons/regular/Image";
import TextContent from "./sidebar/TextContent";
import ShapeContent from "./sidebar/ShapeContent";
import ImageContent from "./sidebar/ImageContent";
import UploadIcon from "@duyank/icons/regular/Upload";
import UploadContent from "./sidebar/UploadContent";
import FrameContent from "./sidebar/FrameContent";
import { useEditor } from "@lidojs/editor";
import { FaRegChartBar } from "react-icons/fa6";
import VisualContent from "./sidebar/VisualContent";
import { BsBarChart, BsDatabase } from "react-icons/bs";
import DataContent from "./sidebar/DataContent";
import Loading from "@/app/loading";

const tabs = [
  {
    name: "Visual",
    icon: <BsBarChart />,
  },
  {
    name: "Data",
    icon: <BsDatabase />,
  },
  {
    name: "Text",
    icon: <TextTIcon />,
  },
  {
    name: "Shape",
    icon: <SquareIcon />,
  },
  // {
  //   name: "Image",
  //   icon: <ImageIcon />,
  // },

  {
    name: "Upload",
    icon: <UploadIcon />,
  },
];
const Sidebar = ({ dashboardData }) => {
  const { actions } = useEditor();
  const [tab, setTab] = useState(null);
  const sidebarWidth = tab === "Data" ? "calc(100vw - 74px)" : "300px";
  if (!dashboardData) {
    return <Loading />;
  }
  return (
    <div
      style={{
        display: "flex",
        zIndex: 2,
        position: "relative",
        backgroundColor: "#ffffff",
        borderRight: "1px solid rgba(217, 219, 228, 0.6)",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <SidebarTab
          tabs={tabs}
          active={tab}
          onChange={(_, tab) => {
            actions.setSidebar();
            setTab(tab);
          }}
        />
        {tab && (
          <div
            style={{
              width: sidebarWidth,
              "@media (maxWidth: 800px)": {
                width: "100%",
                position: "fixed",
                bottom: 0,
                left: 0,
                top: 0,
                background: "#fff",
              },
            }}
          >
            {tab === "Text" && (
              <TextContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {/* {tab === "Chart Example" && (
              <FrameContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )} */}
            {tab === "Image" && (
              <ImageContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === "Visual" && (
              <VisualContent
                datasetUuid={dashboardData?.file?.uuid}
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === "Data" && (
              <DataContent
                dataTitle={dashboardData?.file?.file}
                datasetUuid={dashboardData?.file?.uuid}
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === "Shape" && (
              <ShapeContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            <UploadContent
              visibility={tab === "Upload"}
              onClose={() => {
                setTab(null);
                actions.setSidebar();
              }}
            />
          </div>
        )}
      </div>
      <div
        style={{
          width: 300,
          position: "absolute",
          overflow: "hidden",
          top: 0,
          left: 73,
          height: "100%",
          pointerEvents: "none",
        }}
        id={"settings"}
      />
    </div>
  );
};

export default Sidebar;
