import React from "react";
import {useScrappingUrlQuery} from "@/store/features/scrappingData/scrappingUrl";
import {
    Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow, useDisclosure
} from "@nextui-org/react";
import {Button} from "antd";

export default function PreviewTable({detail}) {

    const {data:fileDetail, isLoading} = useScrappingUrlQuery({filename: detail});
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
    return (
        <>
            <table className="min-w-full border border-gray-300 dark:text-white">
                <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                    {fileDetail?.headers?.map((item, index) => (
                        <th key={index} className="py-2 px-4 border-b">{item}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {fileDetail?.results?.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {fileDetail.headers?.map((item_header, colIndex) => (
                            <td key={colIndex} className="py-2 px-4 border-b">
                                {item && item[item_header] !== undefined ? item[item_header] : ''}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

        </>
    );
}
