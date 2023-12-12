import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Dropdown, message, Space } from "antd";
import { AiFillEdit } from "react-icons/ai";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useDeleteDashboardMutation } from "@/store/features/visualization/visualizeApiSlice";

const CardDetailDropDown = ({ editAction, deleteAction, uuid, filename }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [deleteDashboard] = useDeleteDashboardMutation();

  const handleDelete = async () => {
    const response = await deleteDashboard({ uuid: uuid });
  };

  const items = [
    {
      key: "1",
      label: "Edit",
      icon: <AiFillEdit />,
    },
    {
      key: "2",
      label: "Delete",
      icon: <FaTrashCan />,
      danger: true,
    },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {filename}
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this dashboard? </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="danger" onPress={onClose}>
                  <FaTrashCan /> Delete
                </Button>
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
            <div
              className={"border-0 p-[6px] rounded-md hover:bg-slate-100"}
            >
              <IoEllipsisHorizontal className="cursor-pointer text-secondary-color hover:text-[##e33be3]" />
            </div>
          </Dropdown>
        </Space>
      </Space>
    </>
  );
};

export default CardDetailDropDown;
