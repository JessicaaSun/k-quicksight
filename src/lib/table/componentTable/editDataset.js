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
  Input,
} from "@nextui-org/react";
import { MdEditDocument } from "react-icons/md";
import {
  useGetAllFilesQuery,
  useUpdateFileNameMutation,
} from "@/store/features/files/allFileByuserId";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { toast } from "react-toastify";

export default function EditDataset({ title_dataset, uuid }) {
  const { data: user } = useGetUserQuery();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState(title_dataset);
  const [updateFileName] = useUpdateFileNameMutation();
  const { data: allFile, refetch: refecthFiles } = useGetAllFilesQuery({
    id: user?.data.id,
    filename: "",
    page:1,
    size:1000,
    type: "",
  });

  const handleUpdate = async () => {
    const body = {
      file: title ? title : "",
    };
    const response = await updateFileName({ uuid: uuid, data: body });
    refecthFiles();
    toast.success("update Success!");
    setTimeout(() => {
      onOpenChange(false);
    }, 2000);
  };

  return (
    <>
      <div
        onClick={onOpen}
        className={"text-medium flex gap-3 justify-start items-center"}
      >
        <MdEditDocument className={"text-gray-500"}/>
        Rename
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit dataset information
              </ModalHeader>
              <ModalBody>
                <Input
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                  label="Dataset title"
                  onValueChange={setTitle}
                  value={title}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleUpdate}>
                  Rename
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
