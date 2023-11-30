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

const renderTableRow = (item, index, headers, isFileLoading) => {
  if (typeof item !== 'object') {
    console.error(`Invalid item type at index ${index}: ${typeof item}`);
    return null;
  }

  return (
      <TableRow key={item.id}>
        <TableCell>{item.title || item.file}</TableCell>
        <TableCell>
          {!item.is_original ? <span>Cleaned</span> : <span>Original</span>}
        </TableCell>
        <TableCell>{item.type || item.fileType}</TableCell>
        <TableCell>{getTrimIntoColumnOnlyDate(item.created_at || item.createAt)}</TableCell>
        <TableCell>{formatBytes(item.size)}</TableCell>
        <TableCell className="flex gap-5 justify-center">
          {!isFileLoading ? (
              <Dropdown_table
                  uuid={item.uuid}
                  filename={item.file || item.filename}
                  type={item.type}
                  size={item.size}
                  createAt={item.created_at || item.createAt}
                  fileId={item.id}
                  file={item.filename}
              />
          ) : (
              Array.from({ length: headers.length }).map((_, i) => (
                  <TableCell key={i}>
                    <Spinner color="default" />
                  </TableCell>
              ))
          )}
        </TableCell>
      </TableRow>
  );
};

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
        className={'rounded-xl'}
    >
      <TableHeader>
        {headers.map((item, index) => (
          <TableColumn
            className={`text-lg ${
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
                  renderTableRow(item, index, headers, isFileLoading)
              ) : (
                // eslint-disable-next-line react/jsx-key
                <TableRow>
                  {Array.from({ length: headers.length }, (_, i) => (
                      <TableCell key={`spinner-${i}`}>
                        <Spinner color="default" />
                      </TableCell>
                  ))}
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
