import React from 'react';
import DetailTable from "@/lib/table/detailSampleDataset/DetailTable";
import JupiterDoc from "@/app/sample/components/JupiterDoc";

const ViewSampleDatasetDetail = ({params}) => {
    let uuid = params.uuid;

    return (
        <section className={'pt-36 px-[10%]'}>
            <JupiterDoc/>
        </section>
    );
};

export default ViewSampleDatasetDetail;