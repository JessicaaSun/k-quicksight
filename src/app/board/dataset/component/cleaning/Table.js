import React from "react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

export default function TableMissingValue({item}) {
    return (
        (
            <table aria-label="Example static collection table">
                <tr>
                    {
                        item?.headers?.map((item) => (
                            <th className={'bg-blue-50'} key={item}>{item}</th>
                        ))
                    }
                </tr>
                <tbody>
                    {
                        item?.missing_cell?.map((rowItem, rowIndex) => (
                            <tr key={rowIndex}>
                                {
                                    item?.headers?.map((header, colIndex) => (
                                        <td key={colIndex}>
                                            {
                                                rowItem[header] || <span className={'text-red-500 font-medium'}>null</span>
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    );
}
