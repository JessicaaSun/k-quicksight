/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { useAsync } from "react-use";
import axios from "axios";
import NextImage from "next/image";
import { getThumbnail } from "../../utils/thumbnail";
import { Tooltip } from "@nextui-org/react";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@lidojs/editor";
import { Select } from "antd";
import { Button } from "@nextui-org/react";
import { chartList } from "../../components/chart-list/ChartList";
import { useGetFileDetailQuery } from "@/store/features/files/allFileByuserId";
import { useVisualizeMutation } from "@/store/features/visualization/visualizeApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useFindHeaderQuery } from "@/store/features/ExploreData/ExploreData";

const VisualContent = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { actions } = useEditor();
  const [xAxis, setXAxis] = useState(null);
  const [yAxis, setYAxis] = useState(null);

  const { data: user } = useGetUserQuery();
  const [createVisual] = useVisualizeMutation();

  const {
    data: fileDetail,
    refetch: refetchDetail,
    isLoading: isFileDetailLoading,
  } = useGetFileDetailQuery({
    uuid: "28453108-020d-4fff-89c4-9aafd4ea8358",
    size: 100,
    page: 1,
  });

  const headers = fileDetail?.headers;

  const pieType = ["pie_chart", "donut_chart"];

  const handleCreateVisual = async () => {
    if (!selectedChart) {
      console.error("selectedChart is null or undefined");
      return;
    }

    let body;
    if (pieType.some((type) => selectedChart.startsWith(type))) {
      body = {
        chart_name: selectedChart,
        x_axis: xAxis,
        y_axis: yAxis,
        file: 100,
        user: user?.data.id,
      };
    } else {
      body = {
        chart_name: selectedChart,
        x_axis: xAxis,
        y_axis: yAxis,
        file: 100,
        user: user?.data.id,
      };
    }

    console.log("select chart: ", selectedChart);
    let responseChart;

    try {
      responseChart = await createVisual({ data: body });
    } finally {
      console.log("select chart: ", selectedChart);
      console.log(responseChart?.data.visual?.pie_chart);
      addImage(
        
        responseChart?.data.visual?.pie_chart,
        responseChart?.data.visual?.pie_chart
      );
    }
  };
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

  const handleChartClick = (chart) => {
    setSelectedChart(chart?.value);
  };

  const renderChartOptions = () => {
    return chartList.map((chart) => (
      <div key={chart.id} className="flex cursor-pointer">
        <Tooltip showArrow={true} content={chart.title}>
          <NextImage
            onClick={() => handleChartClick(chart)}
            className="w-[30px] h-[30px]"
            src={chart?.icon}
            alt={chart.title}
            width={30}
            height={30}
          />
        </Tooltip>
      </div>
    ));
  };

  const renderFieldsSelect = () => {
    if (!selectedChart) return null;
    const headersOptions = headers?.map((header, index) => ({
      id: index,
      value: header,
      label: header,
    }));
    switch (selectedChart) {
      case "line_chart":
      case "scatter_plot":
      case "column_chart":
      case "bar_chart":
      case "heatmap":
      case "bubble_chart":
        return (
          <>
            <div className="mb-2">
              <p className="ps-2 text-sm text-text-color pb-2 font-semibold">
                X Axis
              </p>
              <Select
                style={{ width: "100%" }}
                placeholder="Select an option"
                onChange={(value) => setXAxis(value)}
                value={xAxis}
                options={headersOptions}
              />
            </div>
            <div className="mb-2">
              <p className="ps-2 text-sm text-text-color pb-2 font-semibold">
                Y Axis
              </p>
              <Select
                style={{ width: "100%" }}
                placeholder="Select an option"
                onChange={(value) => setYAxis(value)}
                value={yAxis}
                options={headersOptions}
              />
            </div>
          </>
        );
      case "pie_chart":
      case "donut_chart":
        return (
          <div className="mb-2">
            <p className="ps-2 text-sm text-text-color pb-2 font-semibold">
              Count
            </p>
            <div className="mb-2">
              <p className="ps-2 text-sm text-text-color pb-2 font-semibold">
                X Axis
              </p>
              <Select
                style={{ width: "100%" }}
                placeholder="Select an option"
                onChange={(value) => setXAxis(value)}
                value={xAxis}
                options={headersOptions}
              />
            </div>
            <div className="mb-2">
              <p className="ps-2 text-sm text-text-color pb-2 font-semibold">
                Y Axis
              </p>
              <Select
                style={{ width: "100%" }}
                placeholder="Select an option"
                onChange={(value) => setYAxis(value)}
                value={yAxis}
                options={headersOptions}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // useAsync(async () => {
  //   const response = await axios.get(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}files/view/images/`
  //   );
  //   setImages(response.data);
  //   setIsLoading(false);
  // }, []);

  const addImage = async (thumb, url) => {
    const img = new Image();

    img.src = url;
    // img.crossOrigin = "anonymous";
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
          <div className="flex mb-3 justify-between">
            <p className="text-text-color font-semibold">Visual Type</p>
            <div>
              <button
                className={
                  "rounded-lg py-1 px-5 bg-primary-color text-sm text-white"
                }
                onClick={handleCreateVisual}
              >
                Add Chart
              </button>
            </div>
          </div>
          <div className="flex mb-2 flex-wrap mt-3 gap-4">
            {renderChartOptions()}
          </div>
        </div>

        <p className="text-text-color mb-3 mt-2 font-semibold">Fields</p>
        <div className="mb-2">{renderFieldsSelect()}</div>
      </div>
    </div>
  );
};

export default VisualContent;
