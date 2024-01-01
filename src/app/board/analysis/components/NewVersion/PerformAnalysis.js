"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  Tooltip,
  SelectItem,
} from "@nextui-org/react";
import { MdDataExploration, MdNavigateNext } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const models = [
  {
    value: "descriptive_statistic",
    label: "Descriptive Statistic",
    description:
      "Descriptive Statistic: Analyzes and summarizes data to describe its main features without making inferences about the population.",
  },
  {
    value: "correlation",
    label: "Correlation",
    description:
      "Correlation: Measures the statistical relationship or association between two variables, indicating how one may predict the other.",
  },
  {
    value: "covariance",
    label: "Covariance",
    description:
      "Covariance: Indicates the direction of the linear relationship between two variables, showing if they tend to move in the same or opposite directions.",
  },
  {
    value: "simple_linear_regression",
    label: "Simple Linear Regression",
    description:
      "Simple Linear Regression: Assesses the linear relationship between two variables, using one as a predictor for the other.",
  },
  {
    value: "non_linear_regression",
    label: "Non-linear Regression",
    description:
      "Non-linear Regression: Fits a non-linear equation to data points, suitable for more complex relationships between variables.",
  },
  {
    value: "multiple_linear_regression",
    label: "Multiple Linear Regression",
    description:
      "Multiple Linear Regression: Uses multiple variables to predict the value of a dependent variable, assessing the strength of the relationships.",
  },
  {
    value: "one_way_anova",
    label: "ANOVA: Single Factor",
    description:
      "ANOVA: Single Factor: Compares means across multiple groups, testing if at least one group mean differs significantly.",
  },
  {
    value: "two_way_anova",
    label: "ANOVA: Two Factor",
    description:
      "ANOVA: Two Factor: Analyzes the influence of two different categorical independent variables on one dependent variable.",
  },
  {
    value: "exponential_smoothing",
    label: "Exponential Smoothing",
    description:
      "Exponential Smoothing: Forecasts time series data by averaging past observations, giving more weight to recent observations.",
  },
  {
    value: "paired_t_test",
    label: "t-Test: Paired Two Sample",
    description:
      "t-Test: Paired Two Sample: Compares the means of two related groups to determine if there is a significant difference between them.",
  },
  {
    value: "one_sample_t_test",
    label: "t-Test: One Sample",
    description:
      "t-Test: One Sample: Tests if the mean of a single group significantly differs from a known or hypothesized population mean.",
  },
  {
    value: "two_sample_t_test",
    label: "t-Test: Two Sample",
    description:
      "t-Test: Two Sample: Assesses if there are significant differences between the means of two independent groups.",
  },
];

export default function PerformAnalysisButton({ uuid }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = React.useState(new Set([]));
  const [disabled, setDisabled] = useState(true);
  const [selectedModel, setSelectedModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [hoveredModelDesc, setHoveredModelDesc] = useState("");
  const router = useRouter();
  const handleMouseEnter = (description) => {
    setHoveredModelDesc(description);
  };

  const handleMouseLeave = () => {
    setHoveredModelDesc("");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (value.currentKey) {
      setDisabled(false);
    }
  }, [value]);

  return (
    <>
      <Button className="bg-primary-color text-white" onPress={onOpen}>
        <MdDataExploration /> Perform analysis
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col dark:bg-white">
                Choosing model
              </ModalHeader>
              <ModalBody className={"dark:bg-white"}>
                {hoveredModelDesc && (
                  <div className="pb-2 m-0 text-description-color text-sm">
                   {hoveredModelDesc}
                  </div>
                )}
                <div className="flex w-full flex-col gap-2">
                  <Select
                    size="sm"
                    aria-label="Select"
                    variant="bordered"
                    placeholder="Select model"
                    selectedKeys={value}
                    className="w-full capitalize dark:bg-white"
                    onSelectionChange={(newValue) => {
                      const selectedValue = Array.from(newValue)[0];
                      const selectedModel = models.find(
                        (model) => model.value === selectedValue
                      );
                      if (selectedModel) {
                        setSelectedModel(selectedModel.label);
                      }
                      setValue(newValue);
                    }}
                  >
                    {models.map((item) => (
                      <SelectItem
                        className="dark:bg-white capitalize"
                        key={item.value}
                        value={item.value}
                        onMouseEnter={() => handleMouseEnter(item.description)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter className={"dark:bg-white"}>
                <Button
                  onClick={() => {
                    setLoading(true);
                    router.push(
                      `/board/analysis/perform/${value?.currentKey}/${uuid}`
                    );
                  }}
                  disabled={disabled}
                  isLoading={loading}
                  color="primary"
                >
                  {!disabled ? <>Next</> : <>Please choose the model</>}{" "}
                  <MdNavigateNext />
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
