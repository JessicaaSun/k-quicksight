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
  SelectItem,
} from "@nextui-org/react";
import { MdDataExploration, MdNavigateNext } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setRecentData } from "@/store/features/recentData/recentData";

const models = [
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
    label: "Non-linear Regression",
  },
  {
    value: "multiple_linear_regression",
    label: "Multiple linear regression",
  },
];

export default function PerformAnalysisButton({ uuid }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = React.useState(new Set([]));
  const [disabled, setDisabled] = useState(true);
  const [selectedModel, setSelectedModel] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
              <ModalHeader className="flex flex-col gap-1 dark:bg-white">
                Choosing model
              </ModalHeader>
              <ModalBody className={"dark:bg-white"}>
                <div className="flex w-full flex-col gap-2">
                  <p className="text-small text-default-500 capitalize">
                    {" "}
                    Model selected:{" "}
                    {Array.from(value).join(", ").replace(/_/g, " ")}
                  </p>
                  <Select
                    size="sm"
                    aria-label="Select"
                    variant="bordered"
                    placeholder="Select model"
                    selectedKeys={value}
                    className="w-full capitalize dark:bg-white"
                    onSelectionChange={(newValue) => {
                      setSelectedModel(
                        Array.from(newValue).join(", ").replace(/_/g, " ")
                      );
                      setValue(newValue);
                    }}
                  >
                    {models.map((item, index) => (
                      <SelectItem
                        className={"dark:bg-white capitalize"}
                        key={item.value}
                        value={item.value}
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
