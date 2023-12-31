import React from "react";
import Descriptive_statistic from "@/app/board/doc/components/analysisComponent/Descriptive_statistic";
import { generateBashURL } from "@/utils/util";

const MultipleLinear = ({ data, headers }) => {
  if (!data || typeof data !== "object") {
    return (
      <p className={"text-red-400"}>
        Please input valid columns or click perform button
      </p>
    );
  }

  const coefficientArray = Object.keys(data?.coefficient).map((key) => ({
    key,
    value: data?.coefficient[key],
  }));
  const modelEvaluation = Object.keys(data?.evaluate_model).map((key) => ({
    key,
    value: data?.evaluate_model[key],
  }));
  return (
    <div className="overflow-x-scroll">
      <div className="p-4">
        <p className={"text-lg text-primary-color font-semibold mb-3"}>
          Descriptive statistic:{" "}
        </p>
        <Descriptive_statistic
          headers={headers}
          data={data?.descriptive_statistics}
        />
        <p className={"text-lg text-primary-color font-semibold mb-3 mt-5"}>
          Regression Statistics:{" "}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border">
            <tbody>
              <tr>
                <td className="text-description-color border p-2">
                  Multiple R:
                </td>
                <td className="border p-2">
                  {data?.regression_statistics.multiple_r}
                </td>
              </tr>
              <tr>
                <td className="text-description-color border p-2">
                  Adjusted R Squared:
                </td>
                <td className="border p-2">
                  {data?.regression_statistics.adjusted_r_squared}
                </td>
              </tr>
              <tr>
                <td className="text-description-color border p-2">
                  F Statistic:
                </td>
                <td className="border p-2">
                  {data?.regression_statistics.f_statistic}
                </td>
              </tr>
              <tr>
                <td className="text-description-color border p-2">P Value:</td>
                <td className="border p-2">
                  {data?.regression_statistics.p_value}
                </td>
              </tr>
              <tr>
                <td className="text-description-color border p-2">
                  Observations:
                </td>
                <td className="border p-2">
                  {data?.regression_statistics.observations}
                </td>
              </tr>
              <tr>
                <td className="text-description-color border p-2">
                  Standard Error:
                </td>
                <td className="border p-2">
                  {data?.regression_statistics.standard_error}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <p className={"text-lg text-primary-color font-semibold mb-3 mt-5"}>
            Coefficient Table:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <tbody>
                {coefficientArray?.map((item) => (
                  <tr key={item?.key}>
                    <td className="text-description-color border p-2">
                      {item?.key}
                    </td>
                    <td className="border p-2">{item?.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <p className={"text-lg text-primary-color font-semibold mb-3 mt-5"}>
            Model Evaluation:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <tbody>
                {modelEvaluation?.map((item) => (
                  <tr key={item?.key}>
                    <td className="text-description-color border p-2">
                      {item?.key}
                    </td>
                    <td className="border p-2">{item?.value}</td>
                  </tr>
                ))}
                <tr>
                  <td className=" border p-2">Intercept:</td>
                  <td className="border p-2">{data?.intercept}</td>
                </tr>
                <tr>
                  <td className=" border p-2">Kurtosis:</td>
                  <td className="border p-2">{data?.kurtosis}</td>
                </tr>
                <tr>
                  <td className=" border p-2">Skew:</td>
                  <td className="border p-2">{data?.skew}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={"grid grid-cols-2"}>
          {data?.visualizes?.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <img
              key={index}
              src={generateBashURL(item)}
              alt={"visualize image"}
            />
          ))}
        </div>

        {/*<p className={'text-lg text-primary-color my-3'}>Coefficient summary table: </p>*/}
        {/*<div className="overflow-x-auto">*/}
        {/*    <table className="w-full border" id="coefficientTable">*/}
        {/*        <thead>*/}
        {/*        <tr>*/}
        {/*            {coefficientData?.header?.map((header, index) => (*/}
        {/*                <th key={index} className="border p-2">{header}</th>*/}
        {/*            ))}*/}
        {/*        </tr>*/}
        {/*        </thead>*/}
        {/*        <tbody>*/}
        {/*        {Object.keys(coefficientData).map((key, rowIndex) => {*/}
        {/*            if (key !== 'header') {*/}
        {/*                const rowData = coefficientData[key];*/}
        {/*                return (*/}
        {/*                    <tr key={rowIndex}>*/}
        {/*                        <th className="border p-2">{rowData[0]}</th>*/}
        {/*                        {rowData.slice(1).map((value, columnIndex) => (*/}
        {/*                            <td key={columnIndex} className="border p-2">{value}</td>*/}
        {/*                        ))}*/}
        {/*                    </tr>*/}
        {/*                );*/}
        {/*            }*/}
        {/*            return null;*/}
        {/*        })}*/}
        {/*        </tbody>*/}
        {/*    </table>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default MultipleLinear;
