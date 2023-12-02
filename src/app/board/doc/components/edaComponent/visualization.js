import React from 'react';
import {useEdaFileMutation} from "@/store/features/ExploreData/ExploreData";
import {Button, Spinner} from "@nextui-org/react";
import {getRandomColor} from "@/utils/util";
import {setDetail} from "@/store/features/ExploreData/edaStore";
import {useDispatch, useSelector} from "react-redux";

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
                <span>You chosen to perform EDA of </span>
                {
                    bodyEda?.visualizes.map((item, index) => (
                        <span className={'mx-3 p-2 rounded-xl'} key={index} style={{ backgroundColor: getRandomColor(), color: "white"}}>
                          {item}{' '}
                        </span>
                    ))
                }
            </div>
            <Button onClick={handleEda} >Perform EDA</Button>
            {
                detailEDAResponse && (
                    <>
                        <p className={'text-lg font-medium'}>All Headers of dataset</p>
                        {
                            detailEDAResponse.headers?.map((item, index) => (
                                <span key={index} className={'my-5 text-primary-color'}> {item},  </span>
                            ))
                        }
                        <p className={'text-lg font-medium'}>Summarize statistic</p>
                        <table>
                            <thead>
                            <tr>
                                <th>Statistic</th>
                                {numberHeaders.map(header => (
                                    <th key={header}><b>{header}</b></th>
                                ))}
                            </tr>
                            </thead>
                        </table>
                    </>
                )
            }
        </div>
    );
};

export default Visualization;