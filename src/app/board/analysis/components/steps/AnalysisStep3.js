import React, { useMemo, useState } from "react";
import { Checkbox, Select, SelectItem } from "@nextui-org/react";

const AnalysisStep3 = ({ headers }) => {
  const [extractedHeaders, setExtractedHeaders] = useState([]);

  const handleHeadersExtracted = (headers) => {
    setExtractedHeaders(headers);
  };
  return (
    <div className={"px-10"}>
      <p className={"text-2xl text-primary-color pt-10 font-bold"}>
        Simple Linear Regression
      </p>
      <div className={"py-9"}>
        <p className={"text-xl text-primary-color pb-2 font-bold"}>Input</p>
        <div className={"flex flex-row gap-5 py-5 border-1 rounded-2xl px-10"}>
          <Select
            label="Select x column"
            variant="bordered"
            placeholder="Select x column"
            aria-label="Select"
            labelPlacement="outside"
          >
            {headers?.map((header, index) => (
              <SelectItem key={index}>{header}</SelectItem>
            ))}
          </Select>
          <Select
            aria-label="Select"
            label="Select x column"
            variant="bordered"
            placeholder="Select x column"
            labelPlacement="outside"
          >
            {headers?.map((header, index) => (
              <SelectItem key={index}>{header}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <p className={"text-xl text-primary-color pb-10 font-bold"}>
          Output Options
        </p>
        <div className={"flex flex-col gap-5"}>
          <Checkbox defaultSelected>Summary table</Checkbox>
          <Checkbox defaultSelected>Line fit plot</Checkbox>
          <Checkbox defaultSelected>Interpretation </Checkbox>
          <Checkbox defaultSelected>Actionable Recommendation </Checkbox>
        </div>
      </div>
    </div>
  );
};

export default AnalysisStep3;
