'use client'

import React, {useEffect, useState} from 'react';
import {useEdaFileMutation} from "@/store/features/ExploreData/ExploreData";
import {Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {getRandomColor} from "@/utils/util";
import {setDetail} from "@/store/features/ExploreData/edaStore";
import {useDispatch, useSelector} from "react-redux";
import DataTable from "@/app/board/doc/components/edaComponent/DataTable";
import CorrelationTable from "@/app/board/doc/components/edaComponent/CorrelationTable";
import ImageVisualization from "@/app/board/doc/components/edaComponent/ImageVisualization";
import {FaCheck} from "react-icons/fa";
import fastForward from "@duyank/icons/regular/FastForward";

export const numberHeaders = [
    "Unnamed: 0.1",
    "Unnamed: 0",
    "EmployeeID",
    "age",
    "length_of_service",
    "store_name",
    "STATUS_YEAR"
];

const Visualization = ({bodyEda}) => {
    const dispatch = useDispatch();
    const [edaFile] = useEdaFileMutation();
    const detailEDAResponse = useSelector(state => state.eda.detail);
    const [loading, isLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')

    const handleEda = async () => {
        const response = await edaFile({data: bodyEda})
        isLoading(true)
        setResponse(response?.data)
        dispatch(setDetail(response?.data))
    }

    useEffect(() => {
        if (response) {
            isLoading(false)
        } else if (response === undefined) {
            setTimeout(() => {
                isLoading(false)
                setError('Something when wrong')
            }, 3000)
        }
    }, [response]);

    return (
        <>
            <div>
                <span>You have chosen to perform EDA with </span>
                {
                    bodyEda?.visualizes.map((item, index) => (
                        <span className={'mx-3 p-2 rounded-xl'} key={index} style={{ backgroundColor: getRandomColor(), color: "white"}}>
                          {item}{' '}
                        </span>
                    ))
                }
                <p>{error}</p>
            </div>
            <Button isLoading={loading} onClick={handleEda} className={'my-5 text-md flex gap-4 font-medium text-white'} color={'success'} ><FaCheck /> Perform EDA</Button>
            {
                detailEDAResponse && (
                    <div className={'flex flex-col gap-3'}>
                        <div>
                            <p className={'text-lg font-medium mt-10'}>All Headers of dataset</p>
                            {
                                detailEDAResponse.headers?.map((item, index) => (
                                    <span key={index} className={'my-5 text-primary-color'}> {item},  </span>
                                ))
                            }
                        </div>
                        <DataTable header={detailEDAResponse?.number_headers} body={detailEDAResponse?.descriptive_stats} />
                        <CorrelationTable headers={detailEDAResponse?.number_headers} correlationData={detailEDAResponse?.correlation} />
                        <p className={'text-xl font-semibold text-primary-color'}>Visualization</p>
                        <ImageVisualization visualizationData={detailEDAResponse?.visualization} header={detailEDAResponse?.number_headers} />
                    </div>
                )
            }
        </>
    );
};

export default Visualization;