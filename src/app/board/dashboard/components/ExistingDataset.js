"use client";
import React from "react";
import Image from "next/image";
import TableImage from "@assets/images/analysis/table.png";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import AnalysisStep from "@/app/board/components/AnalysisStep";
import Dataset from "@/app/board/dataset/page";
import SelectDataSet from "@/app/board/analysis/components/SelectDataSet";
import { useRouter } from "next/navigation";

const ExistingDatasetDashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const router = useRouter();
  const sizes = ["5xl"];

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const handleSelect = async () => {
    try {
      // Fetch the UUID from your API
      const response = await fetch("your-api-endpoint");
      const data = await response.json();

      const datasetUUID = data.uuid;

      setSelectedDataset(datasetUUID);
      console.log("Selected Dataset UUID:", datasetUUID);
      goToStep(1);
    } catch (error) {
      console.error("Error fetching dataset UUID:", error);
    } finally {
      onClose(); // Close the modal regardless of success or failure
    }
  };

  return (
    <>
      <div className={"flex flex-col"}>
        {sizes.map((size) => (
          <Button
            key={size}
            onPress={() => handleOpen(size)}
            className={"flex flex-col w-full h-full"}
          >
            <Image src={TableImage} alt={""} className={"w-40 pt-2"} />
            <p className={"py-3 font-bold"}>Pick existing dataset</p>
          </Button>
        ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={size}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <AnalysisStep step={0} />
              </ModalHeader>
              <ModalBody>
                <SelectDataSet />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose, router.push("/board/dashboard/editor");
                  }}
                >
                  Select
                </Button>
                <Button color="primary" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExistingDatasetDashboard;
