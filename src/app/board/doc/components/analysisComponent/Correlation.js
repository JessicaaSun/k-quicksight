import { generateBashURL } from "@/utils/util";
import React from "react";

const Correlation = ({ data, dependentVariable, independentVariable }) => {
  if (!data || typeof data !== "object") {
    return (
      <p className={"text-red-400"}>
        Please input valid columns or click perform button
      </p>
    );
  }
  console.log(data);
  console.log(independentVariable, independentVariable);
  return (
    <div>
      <div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b"> </th>
              {Object.keys(data)
                .filter((key) => key !== "visulaize")
                .map((key) => (
                  <th key={key} className="py-2 px-4 border-b">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(data)
              .filter((key) => key !== "visulaize")
              .map((rowKey) => (
                <tr key={rowKey}>
                  <td className="py-2 px-4 border-b font-semibold">{rowKey}</td>
                  {Object.keys(data[rowKey]).map((colKey) => (
                    <td key={colKey} className="py-2 px-4 border-b">
                      {data[rowKey][colKey]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {data?.visulaize && (
          <img src={generateBashURL(data?.visulaize)} alt="Visualization" />
        )}
      </div>
    </div>
  );
};

export default Correlation;
