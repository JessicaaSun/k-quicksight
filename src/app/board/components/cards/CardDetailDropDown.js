"use client";
import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Dropdown, message, Space, Button } from "antd";
import { toast } from "react-toastify";
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
import { useUploadSingleMutation } from "@/store/features/user/uploadAccountImage";
import SelectButton from "@/components/buttons/SelectButton";
import DeleteButtonComponent from "@/components/buttons/DeleteButton";
import UploadImageZone from "@/components/forms/UploadImageZone";
import {
  useAnalysisMutation,
  useDeleteAnalysisFileMutation,
  useUpdateAnalysisFileMutation,
} from "@/store/features/analysis/analysisApiSlice";
import "react-toastify/dist/ReactToastify.css";
import { useDeleteDashboardMutation, useUpdateDashboardMutation } from "@/store/features/dashboard/dashboardApiSlice";

const CardDetailDropDown = ({
  isAnalysis,
  uuid,
  datasetId,
  filename,
  thumbnailUrl,
}) => {
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

  const [analysisName, setAnalysisName] = useState(filename);
  const [previewImage, setPreviewImage] = useState(thumbnailUrl);
  const [dashboardTitle, setDashboardTitle] = useState(filename);

  const [uploadThumbnail] = useUploadSingleMutation();
  const [updateDashboard] = useUpdateDashboardMutation();
  const [deleteDashboard] = useDeleteDashboardMutation();
  const [updateAnalysis] = useUpdateAnalysisFileMutation();
  const [deleteAnalysisFile] = useDeleteAnalysisFileMutation();

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    const response = await uploadThumbnail({ data: file });
    setPreviewImage(response?.data?.filename);
  };

  const handleDeleteAnalysis = async () => {
    const response = await deleteAnalysisFile({ uuid: uuid });
    onDeleteClose();
  };

  const handleUpdateAnalysis = async () => {
    let body = {
      title: analysisName,
      thumbnail: previewImage,
    };
    const response = await updateAnalysis({ data: body, uuid: uuid });
    toast.success('🦄 Successfully updated analysis', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      onEditOpenChange(false);
    }, 2000);
  };

  const handleUpdateDashboard = async () => {
    try {
      let body = {
        title: dashboardTitle,
        thumbnail: previewImage,
      };
      const response = await updateDashboard({ data: body, uuid: uuid });
      if (response) {
        toast.success('🦄 Successfully updated dashboard!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          onEditOpenChange(false);
        }, 2000);
      }
    } catch {
      toast.error("Updated fail");
    }
  };

  const handleDeleteDashboard = async () => {
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
              <ModalHeader className="flex text-text-color pt-4 pb-0 flex-col bg-white">
                Update {filename}
              </ModalHeader>
              <ModalBody className={'bg-white'}>
                <label className="font-semibold">Title</label>
                <Input
                  size="sm"
                  placeholder={
                    isAnalysis ? "Analysis Title" : "Dashboard Title"
                  }
                  value={isAnalysis ? analysisName : dashboardTitle}
                  onValueChange={
                    isAnalysis ? setAnalysisName : setDashboardTitle
                  }
                />
                <label className="font-semibold">Thumbnail</label>
                <UploadImageZone
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                  thumbnailUrl={thumbnailUrl}
                  handleUpload={handleUploadImage}
                />
              </ModalBody>
              <ModalFooter className="grid grid-cols-2 dark:bg-white">
                <DeleteButtonComponent
                  rounded={"xl"}
                  color={"danger"}
                  paddingX={6}
                  text={"Cancel"}
                  hover={"#D40E53"}
                  clickAction={
                  onEditClose
                  }
                />
                <SelectButton
                  rounded={"xl"}
                  color={"primary-color"}
                  text={"Update"}
                  hover={"hover-primary"}
                  clickAction={
                    isAnalysis ? handleUpdateAnalysis : handleUpdateDashboard
                  }
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
              <ModalHeader className="flex flex-col gap-1 bg-white">
                {filename}
              </ModalHeader>
              <ModalBody className={'bg-white'}>
                <p>
                  Are you sure you want to delete this{" "}
                  {isAnalysis ? "analysis" : "dashboard"}?
                </p>
              </ModalBody>
              <ModalFooter className="grid grid-cols-2 gap-5 bg-white">
                <SelectButton
                  rounded={"xl"}
                  color={"primary-color"}
                  height="36px"
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
                  clickAction={isAnalysis ? handleDeleteAnalysis : handleDeleteDashboard}
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
