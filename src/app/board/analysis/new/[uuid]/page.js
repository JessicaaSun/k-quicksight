import React from "react";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import PerformAnalysisButton from "../../components/NewVersion/PerformAnalysis";

const NewAnalysis = ({ params }) => {
  const { uuid } = params;

  return (
    <div className="grid gap-5 mt-5 w-full p-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-primary-color">Analysis</h2>
        </div>
        <div className="flex justify-end items-center">
          <PerformAnalysisButton uuid={uuid} />
        </div>
      </div>

      <FileDetail uuid={uuid} />
    </div>
  );
};

export default NewAnalysis;
