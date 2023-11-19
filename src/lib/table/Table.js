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
    >
      <TableHeader>
        {headers.map((item, index) => (
          <TableColumn
            className={`bg-blue-50 text-lg text-medium ${
              item.header === "Actions" ? "text-center w-[200px]" : ""
            }`}
            key={index}
          >
            {item.header}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {!isSample
          ? file?.map((item, index) =>
              !isFileLoading ? (
                <TableRow key={item.id}>
                  <TableCell>{item.file}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    {getTrimIntoColumnOnlyDate(item.created_at)}
                  </TableCell>
                  <TableCell>{formatBytes(item.size)}</TableCell>
                  <TableCell className={"flex gap-5 justify-center"}>
                    {/*<Tooltip showArrow={true} content="Edit">*/}
                    {/*    <button><i class="fa-solid fa-file-pen" style={{color: '#b3008c'}}></i></button>*/}
                    {/*</Tooltip>*/}
                    {/*<Tooltip showArrow={true} content={'View'}>*/}
                    {/*    <button onClick={() => handleView(item.uuid)}><i class="fa-solid fa-eye" style={{color: '#0300b8'}}></i></button>*/}
                    {/*</Tooltip>*/}
                    {/*<Tooltip showArrow={true} content={'Delete'}>*/}
                    {/*    <DeleteButton uuid={item.uuid} filename={item.file} type={item.type} createAt={item.created_at} size={item.size} />*/}
                    {/*</Tooltip>*/}
                    <Dropdown_table
                      uuid={item.uuid}
                      filename={item.file}
                      type={item.type}
                      size={item.size}
                      createAt={item.created_at}
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
                </TableRow>
              )
            )
          : sample_dataset?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.title}</TableCell>
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
