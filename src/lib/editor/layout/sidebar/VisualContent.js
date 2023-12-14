/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { Tooltip } from "@nextui-org/react";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@lidojs/editor";
import { Select } from "antd";
import { chartList } from "../../components/chart-list/ChartList";
import {
  useGetColumnHeaderDataTypeByUuidQuery,
  useVisualizeMutation,
} from "@/store/features/visualization/visualizeApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Loading from "@/app/loading";

const VisualContent = ({ onClose, datasetUuid }) => {
  const [selectedChart, setSelectedChart] = useState(
    chartList[0]?.value || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { actions } = useEditor();
  const [xAxis, setXAxis] = useState(null);
  const [yAxis, setYAxis] = useState(null);

  const { data: user } = useGetUserQuery();
  const [createVisual] = useVisualizeMutation();

  const {
    data: headers,
    refetch: refetchDetail,
    isLoading: isFileDetailLoading,
  } = useGetColumnHeaderDataTypeByUuidQuery({
    uuid: datasetUuid,
  });

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
        file_uuid: datasetUuid,
      };
    } else {
      body = {
        chart_name: selectedChart,
        x_axis: xAxis,
        y_axis: yAxis,
        file_uuid: datasetUuid,
      };
    }

    let responseChart;

    try {
      responseChart = await createVisual({ data: body });
    } finally {
      addImage(responseChart?.data.img, responseChart?.data.img);
    }
  };

  const handleChartClick = (chart) => {
    setSelectedChart(chart?.value);
  };

  const renderChartOptions = () => {
    return chartList.map((chart) => (
      <div
        key={chart.id}
        className={`flex cursor-pointer ${
          selectedChart === chart.value
            ? "border-dashed border-2 p-1 rounded-md border-primary-color"
            : ""
        }`}
      >
        <Tooltip showArrow={true} content={chart.title}>
          <NextImage
            onClick={() => handleChartClick(chart)}
            className="w-[35px] h-[35px]"
            src={chart?.icon}
            alt={chart.title}
            width={35}
            height={35}
          />
        </Tooltip>
      </div>
    ));
  };

  const renderFieldsSelect = () => {
    if (!selectedChart) return null;
    const headersOptions = headers?.data?.all_columns.map((header, index) => ({
      id: index,
      value: header,
      label: header,
    }));
    switch (selectedChart) {
      case "line_chart":
      case "scatter_plot":
      case "column_chart":
      case "histogram":
      case "bar_chart":
      case "area_chart":
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
        return (
          <div className="mb-2">
            <div className="mb-2">
              <p className="ps-2 text-sm text-text-color pb-2 font-semibold">
                Legend
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
                Values
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
      case "heatmap":
      case "bubble_chart":
      case "donut_chart":
      case "waterfall":
      case "kpi":
        return <p>Chart is not available yet. Coming soon!!</p>;
      default:
        return null;
    }
  };

  const addImage = async (thumb, url) => {
    const img = new Image();

    const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}files/${url}`; // Concatenate BASE_URL with the image path

    img.src = fullUrl;
    console.log("url, ", fullUrl); // Log the full URL
    // img.crossOrigin = "anonymous";
    img.onload = () => {
      actions.addImageLayer(
        { thumb, url: fullUrl },
        { width: img.naturalWidth, height: img.naturalHeight }
      );
      if (isMobile) {
        onClose();
      }
    };
  };

  if (!datasetUuid) {
    return <Loading />;
  }
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
          marginTop: 15,
          overflowY: "auto",
          display: "flex",
        }}
      >
        <div className="mb-3">
          <div className="flex mb-3 justify-between">
            <p className="text-text-color font-semibold">Visual Type</p>
          </div>
          <div className="flex mb-2 flex-wrap mt-3 gap-4">
            {renderChartOptions()}
          </div>
        </div>

        <p className="text-text-color mb-3 mt-2 font-semibold">Fields</p>
        <div className="mb-2">{renderFieldsSelect()}</div>
        <div className="flex items-end justify-end">
          <button
            className={
              "rounded-lg font-medium py-1 mt-4 px-5 bg-primary-color text-sm text-white"
            }
            onClick={handleCreateVisual}
          >
            Add Chart
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualContent;
