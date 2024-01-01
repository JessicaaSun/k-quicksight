'use client'

import React from 'react';
import DetailTable from "@/lib/table/detailSampleDataset/DetailTable";
import JupiterDoc from "@/app/sample/components/JupiterDoc";
import {useGetJupyterByIdQuery} from "@/store/features/sample/Jupyter";

const ViewSampleDatasetDetail = ({params}) => {
    let id = params.id;
    const {data:getFileById} = useGetJupyterByIdQuery({fileId: id})

    return (
        <section className={'pt-36 bg-background-color px-[10%]'}>
            <JupiterDoc filename={getFileById?.filename}/>
        </section>
    );
};

export default ViewSampleDatasetDetail;