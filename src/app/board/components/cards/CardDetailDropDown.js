"use client";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Dropdown, message, Space, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import {
  useDeleteDashboardMutation,
  useUpdateDashboardMutation,
} from "@/store/features/visualization/visualizeApiSlice";
import { useUploadSingleMutation } from "@/store/features/user/uploadAccountImage";
import { generateBashURL } from "@/utils/util";
import SelectButton from "@/components/buttons/SelectButton";
import DeleteButtonComponent from "@/components/buttons/DeleteButton";
import UploadImageZone from "@/components/forms/UploadImageZone";

const CardDetailDropDown = ({ uuid, datasetId, filename, thumbnailUrl }) => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [deleteDashboard] = useDeleteDashboardMutation();
  const [previewImage, setPreviewImage] = useState("");

  const [dashboardTitle, setDashboardTitle] = useState(filename);

  const [uploadThumbnail] = useUploadSingleMutation();
  const [updateDashboard] = useUpdateDashboardMutation();

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const response = await uploadThumbnail({ data: file });
    setPreviewImage(response?.data?.filename);
  };

  const handleUpdate = async () => {
    try {
      let body = {
        title: dashboardTitle,
        thumbnail: previewImage,
        file: datasetId,
      };
      const response = await updateDashboard({ data: body, uuid: uuid });
      if (response) {
        // toast.success("Successfully updated");
        setTimeout(() => {
          onEditOpenChange(false);
        }, 2000);
      }
    } catch {
      toast.error("Updated fail");
    }
  };

  const handleDelete = async () => {
    const response = await deleteDashboard({ uuid: uuid });
    onDeleteClose();
  };

  const items = [
    {
      key: "1",
      label: "Edit",
      icon: <AiFillEdit />,
      onClick: onEditOpen,
    },
    {
      key: "2",
      label: "Delete",
      icon: <FaTrashCan />,
      danger: true,
      onClick: onDeleteOpen,
    },
  ];

  return (
    <>
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
        <ModalContent>
          {(onEditClose) => (
            <>
              <ModalHeader className="flex text-text-color pt-4 pb-0 flex-col">
                Update {dashboardTitle || filename}
              </ModalHeader>
              <ModalBody>
                <label className="font-semibold">Title</label>
                <Input
                  size="sm"
                  placeholder="Dashboard title"
                  value={dashboardTitle}
                  onValueChange={setDashboardTitle}
                />
                <label className="font-semibold">Thumbnail</label>
                <UploadImageZone
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                  thumbnailUrl={thumbnailUrl}
                  handleUpload={handleUploadImage}
                />
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <DeleteButtonComponent
                  rounded={"xl"}
                  color={"danger"}
                  paddingX={6}
                  text={"Cancel"}
                  hover={"#D40E53"}
                  clickAction={handleDelete}
                />
                <SelectButton
                  rounded={"xl"}
                  color={"primary-color"}
                  text={"Update"}
                  hover={"hover-primary"}
                  clickAction={handleUpdate}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <ModalContent>
          {(onDeleteClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {filename}
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this dashboard? </p>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <SelectButton
                  rounded={"xl"}
                  color={"primary-color"}
                  text={"Cancel"}
                  hover={"hover-primary"}
                  clickAction={onDeleteClose}
                />
                <DeleteButtonComponent
                  rounded={"xl"}
                  color={"danger"}
                  paddingX={5}
                  text={"Delete"}
                  icon={<FaTrashCan size={12} />}
                  clickAction={handleDelete}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Space direction="vertical" className={"border-none"}>
        <Space wrap className={"border-none"}>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
          >
            <div className={"border-0 p-[6px] rounded-md hover:bg-slate-100"}>
              <IoEllipsisHorizontal className="cursor-pointer text-secondary-color hover:text-[##e33be3]" />
            </div>
          </Dropdown>
        </Space>
      </Space>
    </>
  );
};

export default CardDetailDropDown;
