import React, { useState } from "react";
import { Button, Dropdown, Space } from "antd";
import DeleteButton from "@/app/board/dataset/component/DeleteButton";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  FaEllipsis,
  FaEye,
  FaMagnifyingGlassChart,
  FaPen,
} from "react-icons/fa6";
import EditDataset from "@/lib/table/componentTable/editDataset";
import ShareMember from "@/app/board/dataset/component/shareMember";
import { IoCloudDownload } from "react-icons/io5";
import { DiGoogleAnalytics } from "react-icons/di";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useCreateDashboardMutation } from "@/store/features/dashboard/dashboardApiSlice";

const Dropdown_table = ({
  uuid,
  filename,
  type,
  createAt,
  size,
  fileId,
  file,
}) => {
  const router = useRouter();
  const handleView = (uuid) => {
    router.push(`/board/dataset/${uuid}`);
  };
  const [loading, isLoading] = useState(false);
  const { data: user } = useGetUserQuery();
  const [createDashboard] = useCreateDashboardMutation();

  const handleDashboardVisualize = async (uuid) => {
    try {
      let body = {
        created_by: user?.data?.id,
        file_uuid: uuid,
      };
      const responseDashboard = await createDashboard({ data: body });

      isLoading(true);
      router.push(`/board/dashboard/${responseDashboard?.data?.uuid}`);
    } catch (error) {
      if (!error.response) {
        console.log("error creating dashboard: ", error);
        toast.error("An error occurred while creating the dashboard.");
      }
    }
  };

  const items = [
    {
      key: "1",
      label: <EditDataset title_dataset={filename} uuid={uuid} />,
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
            <i className="text-gray-500 hover:text-primary-color">
            <FaEye  />
          </i>
          Detail
        </button>
      ),
    },

    {
      key: "3",
      label: <ShareMember filename={filename} fileId={fileId} list={true} />,
    },
    {
      key: "4",
      label: (
        <a
          href={`${process.env.NEXT_PUBLIC_BASE_URL}files/download/${file}/`}
          className={
            "hover:text-primary-color text-medium flex gap-3 justify-start items-center"
          }
        >
         
          <i className="text-gray-500 hover:text-primary-color">
            <IoCloudDownload  />
          </i>
          Download
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a
          href={`/board/analysis/new/${uuid}`}
          className={
            "hover:text-primary-color text-medium flex gap-3 justify-start items-center"
          }
        >
          <i className="text-gray-500 hover:text-primary-color">
            <DiGoogleAnalytics />
          </i>
          Analyze
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <button
          className={
            "hover:text-primary-color text-medium flex gap-3 justify-start items-center"
          }
          onClick={() => handleDashboardVisualize(uuid)}
        >
          <i className="text-gray-500 hover:text-primary-color">
            <FaMagnifyingGlassChart />
          </i>
          Visualize
        </button>
      ),
    },
    {
      key: "7",
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
          <Button className={"border-0 hover:text-white dark:text-white"}>
            <i>
              <FaEllipsis />
            </i>
          </Button>
        </Dropdown>
      </Space>
    </Space>
  );
};
export default Dropdown_table;
