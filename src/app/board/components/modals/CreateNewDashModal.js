"use client";
import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import ExistingDatasetTable from "../importData/ExistingDatasetTable";
import UploadDataSetDashboard from "../importData/UploadDataSet";

const CreateNewDashModal = ({ isOpen, onOpenChange, onClose, size, isAnalysis }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      size={size}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h4>Import Dataset</h4>
            </ModalHeader>

            <ModalBody>
              <div
                className={
                  "flex flex-row mb-12 mt-8 justify-center items-center gap-10"
                }
              >
                <UploadDataSetDashboard isAnalysis={isAnalysis}/>
                <ExistingDatasetTable isAnalysis={isAnalysis}/>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateNewDashModal;
