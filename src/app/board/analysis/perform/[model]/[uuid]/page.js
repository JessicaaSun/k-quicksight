"use client";

import { useFindHeaderQuery } from "@/store/features/ExploreData/ExploreData";
import {
  useAnalysisMutation,
  useCreateRecommendationMutation,
} from "@/store/features/analysis/analysisApiSlice";
import { FcIdea } from "react-icons/fc";
import { useGetFileDetailQuery } from "@/store/features/files/allFileByuserId";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import perform from "@assets/images/Project_66-03.jpg";
import { Button, Input, Spinner } from "@nextui-org/react";
import { Select, Tabs } from "antd";
import Descriptive_statistic from "@/app/board/doc/components/analysisComponent/Descriptive_statistic";
import Correllation from "@/app/board/doc/components/analysisComponent/Correlation";
import SimpleLinear from "@/app/board/doc/components/analysisComponent/SimpleLinear";
import NonLinear from "@/app/board/doc/components/analysisComponent/NonLinear";
import MultipleLinear from "@/app/board/doc/components/analysisComponent/MultipleLinear";
import { FaCheck } from "react-icons/fa";
import { MdDataThresholding } from "react-icons/md";
import { toast } from "react-toastify";
import Eda from "@/app/board/doc/components/Eda";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import SelectVisulize from "@/app/board/doc/components/edaComponent/selectVisulize";
import Visualization from "@/app/board/doc/components/edaComponent/visualization";
import { setEdaFilename } from "@/store/features/ExploreData/edaStore";
import RecommendCard from "@/app/board/components/cards/RecommendCard";
import ChoosingVariable from "@/app/board/doc/components/edaComponent/ChoosingVariable";
import { setFilename } from "@/store/features/clean/fileCleanedApiSlice";

const variableNotMoreThan2 = [
  "correlation",
  "covariance",
  "simple_linear_regression",
  "non_linear_regression",
];
export default function Perform({ params }) {
  const { model } = params;
  const { uuid } = params;

  const { data: user } = useGetUserQuery();
  const [independent_variable, setIndependentVariable] = useState("");
  const [independent_variables, setIndependentVariables] = useState([]);
  const [dependent_variable, setDependentVariable] = useState("");
  const [analysisPost] = useAnalysisMutation();
  const [getRecommend] = useCreateRecommendationMutation();
  const [disable, setDisabled] = useState(true);
  const [recommendResult, setRecommendResult] = useState("");
  const { data: fileDetail, isLoading: fileLoading } = useGetFileDetailQuery({
    uuid: uuid,
    size: 1,
    page: 1,
  });
  const { data: headers, isLoading: headerLoading } = useFindHeaderQuery({
    filename: fileDetail?.filename,
  });

  const bodyEda = useSelector((state) => state.eda);
  const visualization = useSelector(state => state.eda.visualizes)

  const router = useRouter();
  const dispatch = useDispatch();

  const [resultAnalysis, setResultAnalysis] = useState(null);
  const [loading, isLoading] = useState(false);

  const handleSubmitAnalysis = async () => {
    let body_json;
    if (
      variableNotMoreThan2.some((model_mode) => model.startsWith(model_mode))
    ) {
      body_json = {
        model_name: model,
        independent_variable: independent_variable,
        dependent_variable: dependent_variable,
        filename: fileDetail?.filename,
        user: user?.data.id,
      };
    } else {
      body_json = {
        model_name: model,
        independent_variables: independent_variables,
        dependent_variable: dependent_variable,
        filename: fileDetail?.filename,
        user: user?.data.id,
      };
    }
    setDisabled(false);
    try {
      isLoading(true); // Set loading to true at the start of the operation
      const responseAnalysis = await analysisPost({ data: body_json });
      const recommendation = await getRecommend({
        uuid: responseAnalysis?.data?.uuid,
      });
      setResultAnalysis(responseAnalysis?.data);
      setRecommendResult(recommendation?.data?.result);
    } catch (error) {
      console.error("Error in analysis:", error);
      toast.error("Something went wrong please try again!");
    } finally {
      isLoading(false); // Set loading to false after the operation is completed
    }
  };

  useEffect(() => {
    if (resultAnalysis) {
      isLoading(false);
    } else if (resultAnalysis === undefined) {
      setTimeout(() => {
        isLoading(false);
        toast.error("Something went wrong please try again!");
      }, 5000);
    }
    dispatch(setEdaFilename(fileDetail?.filename));
    dispatch(setFilename(fileDetail?.filename)); 
  }, [resultAnalysis, fileDetail, dispatch]);

  return (
    <div className="py-3 px-7 grid grid-cols-1">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Performing",
            children: (
              <div>
                <div>
                  <div className={"flex flex-col gap-3"}>
                    <p
                      className={
                        "text-xl mt-3 text-secondary-color dark:text-white font-medium"
                      }
                    >
                      Perform Exploratory Data Analysis
                    </p>
                    <div className="w-1/3 my-3">
                      <SelectVisulize />
                    </div>
                    {
                      visualization.length > 0 ? (
                        <ChoosingVariable />
                      ) : null
                    }
                    <Visualization bodyEda={bodyEda} />
                  </div>
                  <p className=" dark:text-white mb-4 text-xl font-medium text-secondary-color mt-10">
                    Performing Analysis with{" "}
                    <span className="capitalize">
                      {model.replace(/_/g, " ")}
                    </span>
                  </p>
                  {variableNotMoreThan2.some((model_mode) =>
                    model.startsWith(model_mode)
                  ) ? (
                    <div className="grid gap-4">
                      <div>
                        <p className="text-description-color mb-3 dar:text-white/90 text-md">
                          Select Dependent variable
                        </p>
                        <Select
                          aria-label="Select"
                          size={"large"}
                          placeholder={"Selecting model"}
                          style={{
                            width: "100%",
                          }}
                          value={dependent_variable}
                          onChange={setDependentVariable}
                          options={headers?.header_label}
                        />
                      </div>
                      <div>
                        <p className="text-description-color mb-3 dar:text-white/90 text-md">
                          Select Independent variable
                        </p>
                        <Select
                          size={"large"}
                          aria-label="Select"
                          placeholder={"Selecting model"}
                          style={{
                            width: "100%",
                          }}
                          value={independent_variable}
                          onChange={setIndependentVariable}
                          options={headers?.header_label}
                        />
                      </div>
                    </div>
                  ) : variableNotMoreThan2.some((model_mode) =>
                    model.startsWith("descriptive_statistic")
                  ) ? (
                    <></>
                  ) : (
                    <div className={"w-full"}>
                      <p className="text-description-color mb-3 text-md dark:text-white">
                        Select Dependent variable
                      </p>
                      {fileLoading || headerLoading ? (
                        <Spinner size={"md"} label={"loading - variables"} />
                      ) : (
                        <div className="flex gap-5 w-full">
                          <Select
                            aria-label="Select"
                            size={"large"}
                            placeholder={"Selecting model"}
                            style={{
                              width: "100%",
                            }}
                            value={dependent_variable}
                            onChange={setDependentVariable}
                            options={headers?.header_label}
                          />
                          <Select
                            aria-label="Select"
                            size={"large"}
                            mode="multiple"
                            placeholder="Independent variable"
                            value={independent_variables}
                            onChange={setIndependentVariables}
                            style={{
                              width: "100%",
                            }}
                            options={headers?.header_label}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex mt-4 mb-4 justify-between items-center">
                  <Button
                    color="primary"
                    onClick={handleSubmitAnalysis}
                    size="md"
                    className="w-fit font-medium my-3"
                  >
                    <MdDataThresholding />
                    Perform Analysis
                  </Button>
                  <Button
                    disabled={disable}
                    color="primary"
                    size="md"
                    className="w-fit"
                    onClick={() => router.push("/board/analysis")}
                  >
                    <FaCheck />
                    Done analysis
                  </Button>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center">
                    <Spinner size={"md"} label={"Processing"} />
                  </div>
                ) : (
                  <>
                    {resultAnalysis && (
                      <>
                        {model === "descriptive_statistic" ? (
                          <Descriptive_statistic
                            data={resultAnalysis?.descriptive_statistic}
                            headers={headers?.header_numeric}
                          />
                        ) : model === "correlation" ||
                          model === "covariance" ? (
                          <Correllation
                            data={
                              resultAnalysis?.correlation ||
                              resultAnalysis?.covariance
                            }
                            dependentvariable={dependent_variable}
                            indepentvariable={independent_variable}
                          />
                        ) : model === "simple_linear_regression" ? (
                          <SimpleLinear
                            data={resultAnalysis?.simple_linear_regression}
                          />
                        ) : model === "non_linear_regression" ? (
                          <NonLinear
                            data={resultAnalysis?.non_linear_regression}
                            headers={headers?.header_numeric}
                          />
                        ) : model === "multiple_linear_regression" ? (
                          <MultipleLinear
                            data={resultAnalysis?.multiple_linear_regression}
                            headers={headers?.header_numeric}
                          />
                        ) : (
                          ""
                        )}
                        <RecommendCard recommendResult={recommendResult} />
                      </>
                    )}
                  </>
                )}
              </div>
            ),
          },
          {
            key: "2",
            label: "Dataset",
            children: (
              <div id={"perform eda grid gap-3"}>
                <div className={"grid gap-3"}>
                  <FileDetail uuid={uuid} showHeader={true} />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
