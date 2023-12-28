"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDeleteAnalysisFileMutation } from "@/store/features/analysis/analysisApiSlice";
import { MdDelete } from "react-icons/md";

export default function DeleteAnalysisFile({ uuid, filename }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [deleteAnalysisFile] = useDeleteAnalysisFileMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteAnalysisFile({ uuid: uuid });

      if (response.data) {
        // Close the modal using onClose
        onClose();
      }
    } catch (error) {
      // Handle any errors that occur during the delete operation
      console.error("Error deleting analysis file:", error);
    }
  };
  return (
    <>
      <Button
        radius="full"
        onPress={onOpen}
        variant="ghost"
        size="sm"
        color="danger"
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
        <ModalContent>
          {(onCloseModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {filename}
              </ModalHeader>
              <ModalBody>
                <p>Are you sure to delete this analysis? </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onCloseModal}>
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="danger" onPress={onCloseModal}>
                  <MdDelete /> Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
