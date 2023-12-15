'use client'

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useDeleteAnalysisFileMutation } from "@/store/features/analysis/analysisApiSlice";
import { MdDelete } from "react-icons/md";

export default function DeleteAnalysisFile({uuid, filename}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [deleteAnalysisFile] = useDeleteAnalysisFileMutation();

  const handleDelete = async () => {
    const response = await deleteAnalysisFile({uuid: uuid});
  }

  return (
    <>
      <Button radius="full" onPress={onOpen} variant="ghost" size="sm" color="danger">Delete</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{filename}</ModalHeader>
              <ModalBody>
                <p>Are you sure to delete this analysis? </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="danger" onPress={onClose}>
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
