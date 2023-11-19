import React from "react";
import { Button, Dropdown, Space } from "antd";
import DeleteButton from "@/app/board/dataset/component/DeleteButton";
import { useRouter } from "next/navigation";
import { FaEllipsis, FaEye, FaPen } from "react-icons/fa6";

const Dropdown_table = ({ uuid, filename, type, createAt, size }) => {
  const router = useRouter();
  const handleView = (uuid) => {
    router.push(`/board/dataset/${uuid}`);
  };
  const items = [
    {
      key: "1",
      label: (
        <button
          className={
            "hover:text-secondary-color text-medium flex gap-3 justify-start items-center"
          }
        >
          <i>
            <FaPen />
          </i>{" "}
          Edit{" "}
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          className={
            "hover:text-primary-color text-medium flex gap-3 justify-start items-center"
          }
          onClick={() => handleView(uuid)}
        >
          <i>
            <FaEye />
          </i>
          Detail
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <DeleteButton
          uuid={uuid}
          filename={filename}
          type={type}
          createAt={createAt}
          size={size}
        />
      ),
    },
  ];
  return (
    <Space direction="vertical" className={"border-none"}>
      <Space wrap className={"border-none"}>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button>
            <i style={{ color: "#003899" }}>
              <FaEllipsis />
            </i>
          </Button>
        </Dropdown>
      </Space>
    </Space>
  );
};
export default Dropdown_table;
