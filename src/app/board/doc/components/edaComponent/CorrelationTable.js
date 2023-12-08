import React from 'react';
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

const CorrelationTable = ({ headers, correlationData }) => {
    if (!correlationData) {
        return null; // Return null or a placeholder if correlationData is not available
    }
    return (
        <div>
            <h4 className={'text-primary-color'}>Correlation Table</h4>
            <Table>
                <TableHeader>
                    {headers.map(header => (
                        <TableColumn key={header}>{header}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {Object.keys(correlationData).map(rowKey => (
                        <TableRow key={rowKey}>
                            {Object.keys(correlationData[rowKey]).map(cellKey => (
                                <TableCell key={cellKey}>{correlationData[rowKey][cellKey]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};

export default CorrelationTable;