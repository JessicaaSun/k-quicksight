"use client";
import React, { useEffect, useState } from "react";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import {
  useGetFileDetailQuery,
  useGetFileOverviewQuery,
} from "@/store/features/files/allFileByuserId";
import { useDispatch } from "react-redux";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import { Spinner, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import AnalysisStep3 from "@/app/board/analysis/components/steps/AnalysisStep3";
import { useAnalysisDetailsQuery } from "@/store/features/analysis/analysisApiSlice";
import SimpleLinear from "@/app/board/doc/components/analysisComponent/SimpleLinear";
import MultipleLinear from "@/app/board/doc/components/analysisComponent/MultipleLinear";
import { useFindHeaderQuery } from "@/store/features/ExploreData/ExploreData";
import Correlation from "@/app/board/doc/components/analysisComponent/Correlation";

const Page = ({ params }) => {
  let uuid = params.Fileuuid;
  let analysisUUID = params.analysisuuid;
  const { data: user } = useGetUserQuery();

  const { data: fileDetail, isLoading: detailLoading } = useGetFileDetailQuery({
    uuid: uuid,
    size: 100,
    page: 1,
  });

  const { data: fileOverview, isLoading: overviewLoading } = useGetFileOverviewQuery({ uuid: uuid, userId: user?.data.id });

  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const { data: analysisDetail } = useAnalysisDetailsQuery({
    analysisUUID: analysisUUID,
  });
  const { data: headers } = useFindHeaderQuery({
    filename: analysisDetail?.filename,
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
                uuid={uuid}
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
        <p className="text-xl mb-7 text-text-color  font-semibold">
          {analysisDetail?.model_name}
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
        ) : null}
      </div>
    </div>
  );
};

export default Page;
