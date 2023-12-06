import React from 'react';
import DetailTable from "@/lib/table/detailSampleDataset/DetailTable";
import JupiterDoc from "@/app/sample/components/JupiterDoc";

const ViewSampleDatasetDetail = ({params}) => {
    let uuid = params.uuid;

    return (
        <section className={'py-36 px-[10%]'}>
            <DetailTable />
            <JupiterDoc/>
        </section>
    );
};

export default ViewSampleDatasetDetail;