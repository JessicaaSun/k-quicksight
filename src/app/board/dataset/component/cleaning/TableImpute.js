import React from 'react';
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

const TableImpute = ({item}) => {
    return (
        <div className={'flex justify-between items-center gap-3'}>
            <div className={'w-full'}>
                <p className={'text-primary-color font-semibold'}>Mean:</p>
                <table className="border w-full border-blue-500" aria-label="Example static collection table">
                    <thead>
                    <tr>
                        <th className="p-2 bg-blue-50 border border-blue-200">Headers</th>
                        <th className="p-2 bg-blue-50 border border-blue-200">Values</th>
                    </tr>
                    </thead>
                    <tbody>
                    {item?.mean &&
                        item?.headers_number?.map((header, headerIndex) => (
                            <tr key={headerIndex} className={(headerIndex % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
                                <td className="p-2 border border-blue-200">{header}</td>
                                <td className="p-2 border border-blue-200">
                                    <span className="text-text-color font-semibold">{item.mean[header]}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={'w-full'}>
                <p className={'text-primary-color font-semibold'}>Mode:</p>
                <table className="border w-full border-blue-500" aria-label="Example static collection table">
                    <thead>
                    <tr>
                        <th className="p-2 bg-blue-50 border border-blue-200">Headers</th>
                        <th className="p-2 bg-blue-50 border border-blue-200">Values</th>
                    </tr>
                    </thead>
                    <tbody>
                    {item?.mode &&
                        item?.headers_number?.map((header, headerIndex) => (
                            <tr key={headerIndex} className={(headerIndex % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
                                <td className="p-2 border border-blue-200">{header}</td>
                                <td className="p-2 border border-blue-200">
                                    <span className="text-text-color font-semibold">{item.mode[header]}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableImpute;