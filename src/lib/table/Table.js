"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { getTrimIntoColumnOnlyDate } from "@/utils/getTrimDateTIme";
import { formatBytes } from "@/utils/convertByte";
import { useRouter } from "next/navigation";
import DeleteButton from "@/app/board/dataset/component/DeleteButton";
import Dropdown_table from "@/lib/table/componentTable/dropdown";
import { FaEye } from "react-icons/fa6";

export default function TableData({
  file,
  isSample,
  isFileLoading,
  sample_dataset,
  headers,
}) {
  const router = useRouter();
  const handleView = (uuid) => {
    router.push(`/board/dataset/${uuid}`);
  };
  return (
    <Table
        isHeaderSticky
        aria-label="Example table with client async pagination"
        className={'rounded-xl shadow-sm'}
    >
      <TableHeader>
        {headers.map((item, index) => (
          <TableColumn
            className={`bg-blue-50 text-lg ${
              item.header === "Actions" ? "text-center w-[200px]" : ""
            }`}
            key={index}
          >
            {item.header}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={'no data imported'}>
        {!isSample
          ? file?.map((item, index) =>
              !isFileLoading ? (
                <TableRow key={item.id}>
                  <TableCell>{item.file}</TableCell>
                  <TableCell>{!item.is_original ? <span>Cleaned</span> : <span>Orignal</span>}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    {getTrimIntoColumnOnlyDate(item.created_at)}
                  </TableCell>
                  <TableCell>{formatBytes(item.size)}</TableCell>
                  <TableCell className={"flex gap-5 justify-center"}>
                    <Dropdown_table
                      uuid={item.uuid}
                      filename={item.file}
                      type={item.type}
                      size={item.size}
                      createAt={item.created_at}
                      fileId = {item.id}
                      file={item.filename}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                // eslint-disable-next-line react/jsx-key
                <TableRow>
                  <TableCell>
                    <Spinner color="default" />
                  </TableCell>
                  <TableCell>
                    <Spinner color="default" />
                  </TableCell>
                  <TableCell>
                    <Spinner color="default" />
                  </TableCell>
                  <TableCell>
                    <Spinner color="default" />
                  </TableCell>
                  <TableCell>
                    <Spinner color="default" />
                  </TableCell>
                  <TableCell>
                    <Spinner color="default" />
                  </TableCell>
                </TableRow>
              )
            )
          : sample_dataset?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.fileType}</TableCell>
                <TableCell>Cleaned</TableCell>
                <TableCell>
                  {getTrimIntoColumnOnlyDate(item.createAt)}
                </TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell className={"flex gap-5 justify-center"}>
                  <Tooltip showArrow={true} content={"View"}>
                    <button onClick={() => handleView(item.uuid)}>
                      <i>
                        <FaEye />
                      </i>
                    </button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
