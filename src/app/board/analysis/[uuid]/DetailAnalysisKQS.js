"use client";
import React, { useEffect, useState } from "react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import {
  useGetFileDetailQuery,
  useGetFileOverviewQuery,
} from "@/store/features/files/allFileByuserId";
import { FcIdea } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setFileAccurate } from "@/store/features/files/filesDetail";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import { Spinner, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import AnalysisStep3 from "@/app/board/analysis/components/steps/AnalysisStep3";
import {
  useAnalysisDetailsQuery,
  useCreateRecommendationMutation,
} from "@/store/features/analysis/analysisApiSlice";
import SimpleLinear from "@/app/board/doc/components/analysisComponent/SimpleLinear";
import MultipleLinear from "@/app/board/doc/components/analysisComponent/MultipleLinear";
import { useFindHeaderQuery } from "@/store/features/ExploreData/ExploreData";
import Correlation from "@/app/board/doc/components/analysisComponent/Correlation";
import Descriptive_statistic from "@/app/board/doc/components/analysisComponent/Descriptive_statistic";
import RecommendCard from "@/app/board/components/cards/RecommendCard";

const AnalysisDetailKQS = ({ uuid }) => {
  const { data: analysisDetail } = useAnalysisDetailsQuery({
    analysisUUID: uuid,
  });

  const { data: fileDetail, isLoading: detailLoading } = useGetFileDetailQuery({
    uuid: analysisDetail?.file.uuid,
    size: 100,
    page: 1,
  });

  const { data: headers } = useFindHeaderQuery({
    filename: analysisDetail?.file?.filename,
  });

  return (
    <div className="p-10">
      <div className={"flex flex-row w-full justify-between"}>
        <div className={"flex flex-col"}>
          <div className={"flex flex-row"}>
            <p className={"text-primary-color font-semibold text-3xl"}>
              {analysisDetail?.title || "Untitled Analysis"}
            </p>
          </div>
        </div>
      </div>

      <div className={"pt-6"}>
        {detailLoading ? (
          <div className="flex justify-center items-center">
            <Spinner size={"md"} />
          </div>
        ) : (
          <>
            {fileDetail ? (
              <FileDetail
                showHeader={true}
                dataFile={fileDetail?.results}
                uuid={analysisDetail?.file.uuid}
                headers={fileDetail?.headers}
                isLoading={detailLoading}
                size={30}
              />
            ) : (
              <div>
                <p className="text-red-400 text-xl text-center font-medium">
                  Dataset might be deleted
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-10">
        <p className="text-xl text-primary-color capitalize  font-semibold dark:text-third-color">
          {analysisDetail?.model_name.replace(/_/g, " ")}
        </p>

        {analysisDetail?.model_name.includes("simple_linear_regression") ? (
          <SimpleLinear data={analysisDetail?.analysis_data} />
        ) : analysisDetail?.model_name.includes(
            "multiple_linear_regression"
          ) ? (
          <MultipleLinear
            data={analysisDetail?.analysis_data}
            headers={headers?.header_numeric}
          />
        ) : analysisDetail?.model_name.includes("covariance") ||
          analysisDetail?.model_name.includes("correlation") ? (
          <Correlation data={analysisDetail?.analysis_data} />
        ) : analysisDetail?.model_name.includes("descriptive") ? (
          <Descriptive_statistic
            data={analysisDetail?.analysis_data}
            headers={headers?.header_numeric}
          />
        ) : null}

        <RecommendCard recommendResult={analysisDetail?.recommneded} />
      </div>
    </div>
  );
};

export default AnalysisDetailKQS;
