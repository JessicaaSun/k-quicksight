import React from 'react';
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

const ModelMachineLearning = () => {
    const [selectedColor, setSelectedColor] = React.useState("success");
    return (
        <div>
            <Table
                color={selectedColor}
                selectionMode="single"
                defaultSelectedKeys={["2"]}
                aria-label="Example static collection table"
            >
                <TableHeader>
                    <TableColumn className={"hidden"}>NAME</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>Moving Average</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Random Number Generation</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Rank and Percentile</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell>Simple Linear Regression</TableCell>
                    </TableRow>
                    <TableRow key="5">
                        <TableCell>Multiple Linear Regression</TableCell>
                    </TableRow>
                    <TableRow key="6">
                        <TableCell>Polynomial Regression</TableCell>
                    </TableRow>
                    <TableRow key="7">
                        <TableCell>Sampling</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default ModelMachineLearning;