import React from 'react';
import DetailTable from "@/lib/table/detailSampleDataset/DetailTable";

const ViewSampleDatasetDetail = ({params}) => {
    let uuid = params.uuid;

    return (
        <section className={'py-36 px-[10%]'}>
            <DetailTable />
        </section>
    );
};

export default ViewSampleDatasetDetail;