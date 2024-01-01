"use client";

import React, { useEffect, useState } from "react";
import {
  useAnalysisMutation,
  useCreateRecommendationMutation,
} from "@/store/features/analysis/analysisApiSlice";

import { Select } from "antd";
import { Button, Input, Spinner, Tooltip } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useFindHeaderQuery } from "@/store/features/ExploreData/ExploreData";
import Descriptive_statistic from "./analysisComponent/Descriptive_statistic";
import Correllation from "@/app/board/doc/components/analysisComponent/Correlation";
import SimpleLinear from "@/app/board/doc/components/analysisComponent/SimpleLinear";
import NonLinear from "@/app/board/doc/components/analysisComponent/NonLinear";
import MultipleLinear from "@/app/board/doc/components/analysisComponent/MultipleLinear";
import { toast } from "react-toastify";
import { FaRegQuestionCircle } from "react-icons/fa";
import RecommendCard from "../../components/cards/RecommendCard";

export const variableNotMoreThan2 = [
  "correlation",
  "covariance",
  "simple_linear_regression",
  "non_linear_regression",
];

const Analysis = () => {
  const { data: user } = useGetUserQuery();
  const [chosenModel, setModel] = useState("");
  const [random_number_generation, setRandomNumberGeneration] = useState("");
  const [independent_variable, setIndependentVariable] = useState("");
  const [independent_variables, setIndependentVariables] = useState([]);
  const [dependent_variable, setDependentVariable] = useState("");
  const [analysisPost] = useAnalysisMutation();
  const [body, setBody] = useState([]);
  const [getRecommend] = useCreateRecommendationMutation();
  const [recommendResult, setRecommendResult] = useState("");
  const filename = useSelector((state) => state.eda.filename);
  const { data: headers } = useFindHeaderQuery({ filename: filename });
  const [resultAnalysis, setResultAnalysis] = useState(null);
  const [loading, isLoading] = useState(false);

  const handleChange = (value) => {
    setModel(value);
  };

  const handleSubmitAnalysis = async () => {
    let body_json;
    isLoading(true);
    if (
      variableNotMoreThan2.some((model_mode) =>
        chosenModel.startsWith(model_mode)
      )
    ) {
      body_json = {
        model_name: chosenModel,
        independent_variable: independent_variable,
        dependent_variable: dependent_variable,
        filename: filename,
        user: user?.data.id,
      };
    } else {
      body_json = {
        model_name: chosenModel,
        independent_variables: independent_variables,
        dependent_variable: dependent_variable,
        filename: filename,
        user: user?.data.id,
      };
    }
    setBody(body_json);
    const responseAnalysis = await analysisPost({ data: body_json });
    const recommendation = await getRecommend({
      uuid: responseAnalysis?.data?.uuid,
    });
    setResultAnalysis(responseAnalysis?.data);
    setRecommendResult(recommendation?.data?.result);
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
  }, [resultAnalysis]);

  return (
    <div className={"grid gap-3"}>
      <h3 className={"text-primary-color dark:text-third-color"}>
        Prep the Data for Modelling
      </h3>
      <div className={"grid gap-2"}>
        {!chosenModel ? (
          <p
            className={
              "flex dark:text-third-color justify-start items-center gap-5 text-red-400 text-lg font-medium"
            }
          >
            Please, choose the model:
            <Tooltip
              showArrow
              size={"lg"}
              key={"48b5"}
              color={"danger"}
              content={
                "If you are not choose the model, you cannot perform analysis!"
              }
              className="capitalize"
            >
              <Button variant={"light"}>
                <FaRegQuestionCircle />
              </Button>
            </Tooltip>
          </p>
        ) : (
          ""
        )}
        <p className={"text-lg text-primary-color dark:text-third-color"}>
          Choosing model: <span className={"font-semibold"}>{chosenModel}</span>
        </p>
        <Select
          aria-label="Select"
          size={"large"}
          placeholder={"Selecting model"}
          style={{
            width: "40%",
          }}
          onChange={handleChange}
          options={[
          
            {
              value: "descriptive_statistic",
              label: "Descriptive Statistic",
            },
            {
              value: "correlation",
              label: "Correlation",
            },
            {
              value: "covariance",
              label: "Covariance",
            },
            {
              value: "simple_linear_regression",
              label: "Simple Linear Regression",
            },
            {
              value: "non_linear_regression",
              label: "Non Linear Regression",
            },
            {
              value: "multiple_linear_regression",
              label: "Multiple Linear Regression",
            },
            {
              value: "one_way_anova",
              label: "Anova: Single Factor",
            },
            {
              value: "two_way_anova",
              label: "Anova: Two Factor",
            },
            {
              value: "Exponential Smoothing",
              label: "exponential_smoothing",
            },
            {
              value: "t-Test: Paired Two Sample",
              label: "paired_t_test",
            },
            {
              value: "t-Test: One Samples",
              label: "one_sample_t_test",
            },
            {
              value: "t-Test: Two Sample",
              label: "two_sample_t_test",
            },
          ]}
        />
        <>
          {chosenModel && (
            <>
              {variableNotMoreThan2.some((model_mode) =>
                chosenModel.startsWith(model_mode)
              ) ? (
                <div className="grid gap-3">
                  <div>
                    <p className="text-description-color mb-3 mt-4 text-md">
                      Select Dependent variable
                    </p>
                    <Select
                      aria-label="Select"
                      size={"large"}
                      placeholder={"Selecting model"}
                      style={{
                        width: "40%",
                      }}
                      value={dependent_variable}
                      onChange={setDependentVariable}
                      options={headers?.header_label}
                    />
                  </div>
                  <div>
                    <p className="text-description-color mb-3 text-md">
                      Select Independent variable
                    </p>
                    <Select
                      aria-label="Select"
                      size={"large"}
                      placeholder={"Selecting model"}
                      style={{
                        width: "40%",
                      }}
                      value={independent_variable}
                      onChange={setIndependentVariable}
                      options={headers?.header_label}
                    />
                  </div>
                </div>
              ) : chosenModel.startsWith("descriptive") ? (
                <></>
              ) : (
                <div>
                  <p className="text-description-color mb-3 text-md">
                    Select Dependent variable
                  </p>
                  <div className="flex gap-5">
                    <Select
                      aria-label="Select"
                      size={"large"}
                      placeholder={"Selecting model"}
                      style={{
                        width: "40%",
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
                        width: "40%",
                      }}
                      options={headers?.header_label}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <Button
            disabled={!chosenModel}
            color="primary"
            onClick={handleSubmitAnalysis}
            size="md"
            className="w-fit font-medium my-3"
          >
            Perform analysis
          </Button>
        </>
      </div>
      {loading ? (
        <Spinner size={"md"} label={"Processing"} />
      ) : (
        <>
          {chosenModel === "descriptive_statistic" ? (
            <Descriptive_statistic
              data={resultAnalysis?.descriptive_statistic}
              headers={headers?.header_numeric}
            />
          ) : chosenModel === "correlation" || chosenModel === "covariance" ? (
            <Correllation
              data={resultAnalysis?.correlation || resultAnalysis?.covariance}
              dependentvariable={dependent_variable}
              indepentvariable={independent_variable}
            />
          ) : chosenModel === "simple_linear_regression" ? (
            <SimpleLinear data={resultAnalysis?.simple_linear_regression} />
          ) : chosenModel === "non_linear_regression" ? (
            <NonLinear
              data={resultAnalysis?.non_linear_regression}
              headers={headers?.header_numeric}
            />
          ) : chosenModel === "multiple_linear_regression" ? (
            <MultipleLinear
              data={resultAnalysis?.multiple_linear_regression}
              headers={headers?.header_numeric}
            />
          ) : (
            ""
          )}

          {resultAnalysis && (
            <RecommendCard recommendResult={recommendResult} />
          )}
        </>
      )}
    </div>
  );
};

export default Analysis;
