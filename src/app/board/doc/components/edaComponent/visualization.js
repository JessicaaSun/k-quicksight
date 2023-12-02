import React from 'react';
import {useEdaFileMutation} from "@/store/features/ExploreData/ExploreData";
import {Button, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {getRandomColor} from "@/utils/util";
import {setDetail} from "@/store/features/ExploreData/edaStore";
import {useDispatch, useSelector} from "react-redux";
import DataTable from "@/app/board/doc/components/edaComponent/DataTable";
import CorrelationTable from "@/app/board/doc/components/edaComponent/CorrelationTable";
import ImageVisualization from "@/app/board/doc/components/edaComponent/ImageVisualization";
import {FaCheck} from "react-icons/fa";

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
    const detailEDAResponse = useSelector(state => state.eda.detail)

    const handleEda = async () => {
        const response = await edaFile({data: bodyEda})
        dispatch(setDetail(response?.data))
    }
    console.log(detailEDAResponse)

    return (
        <div>

            <div>
                <span>You have chosen to perform EDA with </span>
                {
                    bodyEda?.visualizes.map((item, index) => (
                        <span className={'mx-3 p-2 rounded-xl'} key={index} style={{ backgroundColor: getRandomColor(), color: "white"}}>
                          {item}{' '}
                        </span>
                    ))
                }
            </div>
            <Button onClick={handleEda} className={'my-5 text-md flex gap-4 font-medium text-white'} color={'success'} ><FaCheck /> Perform EDA</Button>
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
        </div>
    );
};

export default Visualization;