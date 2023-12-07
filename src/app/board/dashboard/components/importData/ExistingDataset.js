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
import { useRouter } from "next/navigation";
import SelectDataset from "./SelectDatasetVis";
import { useVisualizeFileContext } from "@/context/VisualizeFileContext";

const ExistingDatasetDashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const router = useRouter();
  const sizes = ["5xl"];
  const { selectedFile } = useVisualizeFileContext();

  const handleSelectDataset = () => {
    router.push(`/board/dashboard/ueiwdhwz`);
    console.log("file: ", selectedFile)
  };

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  return (
    <>
      <div className={"flex flex-col"}>
        {sizes.map((size) => (
          <Button
            key={size}
            onPress={() => handleOpen(size)}
            className={
              "flex flex-col justify-center p-4 items-center w-full h-full"
            }
          >
            <Image src={TableImage} alt={""} className={"w-28"} />
            <p className={" font-bold"}>Pick existing dataset</p>
          </Button>
        ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={size}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <SelectDataset />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleSelectDataset}>
                  Select
                </Button>
                <Button color="danger" onPress={onClose}>
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
