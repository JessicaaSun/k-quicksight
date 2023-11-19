import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  useDeleteFileByIdMutation,
  useGetAllFilesQuery,
} from "@/store/features/files/allFileByuserId";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useDispatch } from "react-redux";
import { setFiles } from "@/store/features/files/fileSlice";
import { headers } from "@/app/board/dataset/page";
import { getTrimIntoColumnOnlyDate } from "@/utils/getTrimDateTIme";
import { formatBytes } from "@/utils/convertByte";
import { FaTrash } from "react-icons/fa";

export default function DeleteButton({ uuid, filename, type, createAt, size }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteFileById] = useDeleteFileByIdMutation();
  const { data: user } = useGetUserQuery();
  const dispatch = useDispatch();
  const { data: allFiles, refetch: refetchAllFiles } = useGetAllFilesQuery({
    id: user?.data.id,
    filename: "",
    type: "",
  });
  const handleDeleteFile = async (uuid) => {
    await deleteFileById({ uuid: uuid, id: user?.data.id });
    const updatedFiles = allFiles.filter((file) => file.uuid !== uuid);
    dispatch(setFiles(updatedFiles));
    refetchAllFiles();
  };

  return (
    <>
      <Button onPress={onOpen} className={"p-0 min-w-fit bg-white"}>
        <i>
          <FaTrash />
        </i>
      </Button>
      <Modal
        size={"2xl"}
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p className={"text-center text-text-color font-normal mt-10"}>
                  Are you sure to delete{" "}
                  <span className={"text-lg font-semibold text-red-500"}>
                    {filename}
                  </span>{" "}
                  ?
                </p>
                <Table aria-label="Example static collection table">
                  <TableHeader>
                    {headers.slice(0, 4).map((item, index) => (
                      <TableColumn key={index}>{item.header}</TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>{filename}</TableCell>
                      <TableCell>{type}</TableCell>
                      <TableCell>
                        {getTrimIntoColumnOnlyDate(createAt)}
                      </TableCell>
                      <TableCell>{formatBytes(size)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={() => handleDeleteFile(uuid)}
                  color="primary"
                  onPress={onClose}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
