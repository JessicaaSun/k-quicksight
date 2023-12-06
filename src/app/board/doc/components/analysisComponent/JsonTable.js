'use client'

import { useEffect, useState } from 'react';
import { variableNotMoreThan2 } from '../Analysis';
import DataTable from '../edaComponent/DataTable';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

export default function JsonTable({ jsonData, chosenModel, headers }) {
    console.log(headers)
    console.log(jsonData)

    return (
        <>
            {
                variableNotMoreThan2.some((model_mode) => chosenModel.startsWith(model_mode)) ? (
                    <>
                        {
                            chosenModel === 'descriptive_statistic' && (
                                <div>
                                    <p className={'text-primary-color text-lg font-medium'}>Descriptive Statistics Table</p>
                                    <Table>
                                        <TableHeader>
                                            <TableColumn>Statistic</TableColumn>
                                            {headers.map((header, index) => (
                                                <TableColumn key={index}><b>{header}</b></TableColumn>
                                            ))}
                                        </TableHeader>
                                        <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                                    </Table>
                                </div>
                            )
                        }
                    </>

                ) : null
            }
        </>
    )
}
