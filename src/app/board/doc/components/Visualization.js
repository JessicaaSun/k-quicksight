"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFindHeaderQuery } from "@/store/features/ExploreData/ExploreData";
import { Select } from "antd";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { Button } from "@nextui-org/react";
import { useVisualizeMutation } from "@/store/features/visualization/visualizeApiSlice";

const Visualization = () => {
  const { data: user } = useGetUserQuery();
  const filename = useSelector((state) => state.eda.filename);
  const fileId = useSelector((state) => state.cleanedFileUUID.id);
  const { data: headers } = useFindHeaderQuery({ filename: filename });
  const [visualization] = useVisualizeMutation();
  const [error, setError] = useState("");

  const [chartType, setChartType] = useState("");
  const [xAxis, setXaxis] = useState("");
  const [yAxis, setYaxis] = useState("");

  const handleChartType = (value) => {
    setChartType(value);
  };
  const handleXaxisValue = (value) => {
    setXaxis(value);
  };
  const handleYaxisValue = (value) => {
    setYaxis(value);
  };
  const handleVisualize = async () => {
    let bodyData = {
      chart_name: chartType,
      x_axis: xAxis,
      y_axis: yAxis,
      file: fileId,
      user: user?.data.id,
    };
    const response = await visualization({ data: bodyData });
    setError(response?.error?.data.file[0]);
  };

  return (
    <div className={"grid gap-5"}>
      <p className={"text-red-400"}>File: {error}</p>
      <div className={"flex gap-5 justify-start items-center"}>
        <p>Insert chart types: </p>
        <Select
          size={"large"}
          placeholder={"Select chart types"}
          style={{
            width: "40%",
          }}
          aria-label="Select"
          value={chartType}
          onChange={handleChartType}
          options={[
            {
              value: "bar_chart",
              label: "bar chart",
            },
          ]}
        />
      </div>
      <div className={"flex gap-5 justify-start items-center"}>
        <p>Label x-axis: </p>
        <Select
          size={"large"}
          placeholder={"Select x-axis"}
          style={{
            width: "40%",
          }}
          aria-label="Select"
          onChange={handleXaxisValue}
          options={headers?.header_label}
        />
      </div>
      <div className={"flex gap-5 justify-start items-center"}>
        <p>Label y-axis: </p>
        <Select
          size={"large"}
          placeholder={"Select y-axis"}
          style={{
            width: "40%",
          }}
          aria-label="Select"
          onChange={handleYaxisValue}
          options={headers?.header_label}
        />
      </div>
      <Button variant={"ghost"} color={"primary"} onClick={handleVisualize}>
        Let visualize
      </Button>
      <p className={"text-red-400"}>- Testing graphic</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <a
        target={"_blank"}
        href={
          "http://136.228.158.126:8002/api/v1/files/e060d6d8deb444aba3518c92f7705882.png"
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={"w-full"}
          src={
            "http://136.228.158.126:8002/api/v1/files/e060d6d8deb444aba3518c92f7705882.png/"
          }
          alt={"graph"}
        />
      </a>
    </div>
  );
};

export default Visualization;
