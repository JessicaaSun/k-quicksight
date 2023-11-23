import React from "react";
import { Button, Dropdown, Space } from "antd";
import DeleteButton from "@/app/board/dataset/component/DeleteButton";
import { useRouter } from "next/navigation";
import { FaEllipsis, FaEye, FaPen } from "react-icons/fa6";
import EditDataset from "@/lib/table/componentTable/editDataset";
import ShareMember from "@/app/board/dataset/component/shareMember";
import {IoCloudDownload} from "react-icons/io5";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const Dropdown_table = ({ uuid, filename, type, createAt, size, fileId, file }) => {
  const router = useRouter();
  const handleView = (uuid) => {
    router.push(`/board/dataset/${uuid}`);
  };
  const items = [
    {
      key: "1",
      label: (
        <EditDataset title_dataset={filename} uuid={uuid} />
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
    {
      key: "4",
      label: (
          <ShareMember filename={filename} fileId={fileId} list={true} />
      )
    },
    {
      key: "5",
      label: (
          <a href={`${process.env.NEXT_PUBLIC_BASE_URL}files/download/${file}/`} className={'hover:text-primary-color text-medium flex gap-3 justify-start items-center'}><IoCloudDownload /> Download</a>
      )
    }
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
