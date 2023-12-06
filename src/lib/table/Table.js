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
import {BsDot} from "react-icons/bs";

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
    <div >
        {
            isFileLoading ? (
                <div className={'flex justify-center items-center'}>
                    <Spinner color={'primary'} size={'lg'} label="Loading dataset" />
                </div>
            ) : (
                <div className={'flex flex-col gap-3'}>
                    {
                        file?.map((item, index) => (
                            <div key={item.id} className={'hover:bg-primary-color cursor-pointer hover:text-white transition-all px-3 py-3 flex items-center justify-between bg-white rounded-lg border-1 border-gray-200 shadow-sm'}>
                                <div>
                                    <p className={'text-lg font-medium flex gap-3 justify-center items-center flex-wrap'}>{item.file} <BsDot /> <span className={'text-sm'}>{getTrimIntoColumnOnlyDate(item.created_at || item.createAt)}</span> </p>
                                    <p className={'text-sm'}>({item.type}) <span className={'font-medium'}>{!item.is_original ? <span>Cleaned</span> : <span>Original</span>}</span> with {formatBytes(item.size)}</p>
                                </div>
                                <Dropdown_table
                                    uuid={item.uuid}
                                    filename={item.file || item.filename}
                                    type={item.type}
                                    size={item.size}
                                    createAt={item.created_at || item.createAt}
                                    fileId={item.id}
                                    file={item.filename}
                                />
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  );
}
