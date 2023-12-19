/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { Tooltip } from "@nextui-org/react";
import { useAsync } from "react-use";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@lidojs/editor";
import { Select } from "antd";
import axios from "axios";
import {
  aggregateCategory,
  aggregateNum,
  chartList,
} from "../../components/chart-list/ChartList";
import {
  useCreateKpiMutation,
  useVisualizeMutation,
} from "@/store/features/visualization/visualizeApiSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Loading from "@/app/loading";
import { useGetColumnHeaderDataTypeByUuidQuery } from "@/store/features/dashboard/dashboardApiSlice";
import { generateCard } from "@/data/textLayoutTreeTxt";

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
  const [createKpiCard] = useCreateKpiMutation();

  const {
    data: headers,
    refetch: refetchDetail,
    isLoading: isFileDetailLoading,
  } = useGetColumnHeaderDataTypeByUuidQuery({
    uuid: datasetUuid,
  });

  const allHeader = headers?.data?.all_columns.map((header, index) => ({
    id: index,
    value: header,
    label: header,
  }));
  const numericFields =
    headers?.data?.numeric_columns.map((header, index) => ({
      id: index,
      value: header,
      label: header,
    })) || [];

  const categoryFields =
    headers?.data?.object_columns.map((header, index) => ({
      id: index,
      value: header,
      label: header,
    })) || [];

  const handleCreateVisual = async () => {
    let body;
    if (selectedChart === "card") {
      body = {
        chart_name: "card",
        type_field:
          numericFields && numericFields.some((field) => field.value === xAxis)
            ? "number"
            : "category",
        fields: [xAxis],
        aggregation: yAxis,
        file_uuid: datasetUuid,
      };

      try {
        const responseCard = await createKpiCard({ data: body });
        if (responseCard) {
          const value = responseCard?.data.data[0]?.value.toFixed(2);
          const message =
            responseCard?.data.data[0]?.message.charAt(0).toUpperCase() +
            responseCard?.data.data[0]?.message.slice(1);
          handleAddCard(responseCard?.data.data[0]?.value.toFixed(2),  responseCard?.data.data[0]?.message.charAt(0).toUpperCase() +
          responseCard?.data.data[0]?.message.slice(1));
        } else {
          console.error("Invalid response from createKpi:", responseCard);
        }
      } catch (error) {
        console.error("Error in createKpi:", error);
      }
    } else {
      body = {
        chart_name: selectedChart,
        x_axis: xAxis,
        y_axis: yAxis,
        file_uuid: datasetUuid,
      };

      const responseChart = await createVisual({ data: body });
      addImage(responseChart?.data?.img, responseChart?.data?.img);
    }
  };

  const handleAddCard = (text, desc) => {
    const cardData = generateCard(text, desc);
    
    actions.addLayerTree(JSON.parse(cardData.data));
    if (isMobile) {
      onClose();
    }
  };

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
                options={allHeader}
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
                options={allHeader}
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
                options={allHeader}
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
                options={allHeader}
              />
            </div>
          </div>
        );
      case "card":
        return (
          <div className="mb-2">
            <div className="mb-2">
              <p className="ps-2 text-sm text-text-color pb-2 font-semibold">
                Field
              </p>
              <Select
                style={{ width: "100%" }}
                placeholder="Select an option"
                onChange={(value) => setXAxis(value)}
                value={xAxis}
                options={allHeader}
              />
            </div>
            <div className="mb-2">
              <p className="ps-2 text-sm text-text-color pb-2 font-semibold">
                Aggregate
              </p>

              <Select
                disabled={!xAxis}
                style={{ width: "100%" }}
                placeholder="Select an option"
                onChange={(value, option) => setYAxis(value)}
                value={yAxis}
              >
                {numericFields &&
                numericFields.some((field) => field.value === xAxis)
                  ? aggregateNum.map((option) => (
                      <Select.Option
                        key={option.id}
                        value={option.value}
                        data-title={option.title}
                      >
                        {option.title}
                      </Select.Option>
                    ))
                  : aggregateCategory.map((option) => (
                      <Select.Option
                        key={option.id}
                        value={option.value}
                        data-title={option.title}
                      >
                        {option.title}
                      </Select.Option>
                    ))}
              </Select>
            </div>
          </div>
        );
      case "heatmap":
      case "bubble_chart":
      case "donut_chart":
      case "waterfall":
        return <p>Chart is not available yet. Coming soon!!</p>;
      default:
        return null;
    }
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
