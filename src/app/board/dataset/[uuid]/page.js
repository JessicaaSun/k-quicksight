'use client'

import React, {useState} from 'react';
import ShareMember from "@/app/board/dataset/component/shareMember";
import {Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import CleanModal from "@/app/board/dataset/component/cleaning/CleanModal";

const DetailDataset = ({params}) => {

    const [tableData, setTableData] = useState([
        {
            "username": "JohnDoe",
            "age": 25,
            "salary": 50000
        },
        {
            "username": "JaneSmith",
            "age": 32,
            "salary": 75000
        },
        {
            "username": "MikeJohnson",
            "age": 40,
            "salary": 90000
        },
        {
            "username": "EmilyDavis",
            "age": 28,
            "salary": 60000
        },
        {
            "username": "DavidBrown",
            "age": 35,
            "salary": 80000
        },
        {
            "username": "SarahWilson",
            "age": 45,
            "salary": 100000
        },
        {
            "username": "RobertMiller",
            "age": 37,
            "salary": 85000
        },
        {
            "username": "JessicaTaylor",
            "age": 29,
            "salary": 65000
        },
        {
            "username": "DanielAnderson",
            "age": 33,
            "salary": 70000
        },
        {
            "username": "AmyThomas",
            "age": 31,
            "salary": 73000
        },
        {
            "username": "MichaelLee",
            "age": 42,
            "salary": 95000
        },
        {
            "username": "JenniferClark",
            "age": 27,
            "salary": 55000
        },
        {
            "username": "ChristopherLewis",
            "age": 38,
            "salary": 87000
        },
        {
            "username": "AmandaHarris",
            "age": 34,
            "salary": 72000
        },
        {
            "username": "JoshuaYoung",
            "age": 30,
            "salary": 68000
        },
        {
            "username": "StephanieWilson",
            "age": 39,
            "salary": 89000
        },
        {
            "username": "AndrewMartin",
            "age": 36,
            "salary": 82000
        },
        {
            "username": "MelissaHall",
            "age": 26,
            "salary": 57000
        },
        {
            "username": "KevinThompson",
            "age": 41,
            "salary": 93000
        },
        {
            "username": "RachelGonzalez",
            "age": 43,
            "salary": 97000
        }
    ]);

    return (
        <div className={'p-5'} >
            <p className={'text-3xl font-medium text-primary-color'}>Detail</p>
            <div className={'flex justify-start items-center gap-5 mt-3'}>
                <p className={'text-xl font-normal text-text-color'}>Survey</p>
                <ShareMember />
            </div>
            <div className={'flex justify-end items-center w-full gap-5 my-5'}>
                <Button className={'bg-primary-color text-md font-medium text-background-color'} >Overview</Button>
                <CleanModal />
            </div>

            <div className={'rounded-2xl shadow-lg h-[500px] overflow-y-scroll'}>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn className={'bg-blue-50'}>USERNAME</TableColumn>
                        <TableColumn className={'bg-blue-50'}>AGE</TableColumn>
                        <TableColumn className={'bg-blue-50'}>salary</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.username}>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.salary}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
};

export default DetailDataset;