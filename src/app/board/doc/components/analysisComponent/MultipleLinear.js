import React from 'react';
import Descriptive_statistic from "@/app/board/doc/components/analysisComponent/Descriptive_statistic";
import {generateBashURL} from "@/utils/util";

const MultipleLinear = ({data, headers}) => {
    if (!data || typeof data !== 'object') {
        return <p className={'text-red-400'}>Please input valid columns or click perform button</p>;
    }
    console.log(data)
    // else if (!data?.coefficient_summary_table || data?.coefficient_summary_table !== 'object') {
    //     return <p className={'text-red-400'}>Please input valid columns or click perform button</p>;
    // }
    const coefficientData = data?.coefficient_summary_table;
    return (
        <div className="overflow-x-scroll">
            <div className="p-4">
                <p className={'text-lg text-primary-color my-3'}>Descriptive statistic: </p>
                <Descriptive_statistic headers={headers} data={data?.descriptive_statistics} />
                <p className={'text-lg text-primary-color my-3'}>Regression statistics: </p>
                <div className="overflow-x-auto">
                    <table className="w-full border">
                        <tbody>
                        <tr>
                            <td className="text-description-color border p-2">Multiple_r:</td>
                            <td className="border p-2">{data?.regression_statistics.multiple_r}</td>
                        </tr>
                        <tr>
                            <td className="text-description-color border p-2">Adjusted_r_squared:</td>
                            <td className="border p-2">{data?.regression_statistics.adjusted_r_squared}</td>
                        </tr>
                        <tr>
                            <td className="text-description-color border p-2">F_statistic:</td>
                            <td className="border p-2">{data?.regression_statistics.f_statistic}</td>
                        </tr>
                        <tr>
                            <td className="text-description-color border p-2">P_value:</td>
                            <td className="border p-2">{data?.regression_statistics.p_value}</td>
                        </tr>
                        <tr>
                            <td className="text-description-color border p-2">Observations:</td>
                            <td className="border p-2">{data?.regression_statistics.observations}</td>
                        </tr>
                        <tr>
                            <td className="text-description-color border p-2">Standard_error:</td>
                            <td className="border p-2">{data?.regression_statistics.standard_error}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className={'grid grid-cols-2'}>
                    {
                        data?.visualizes?.map((item, index) => (
                            // eslint-disable-next-line react/jsx-key
                            <img src={generateBashURL(item)} alt={'visualize image'} />
                        ))
                    }
                </div>

                {/*<p className={'text-lg text-primary-color my-3'}>Coefficient summary table: </p>*/}
                {/*<div className="overflow-x-auto">*/}
                {/*    <table className="w-full border" id="coefficientTable">*/}
                {/*        <thead>*/}
                {/*        <tr>*/}
                {/*            {coefficientData?.header?.map((header, index) => (*/}
                {/*                <th key={index} className="border p-2">{header}</th>*/}
                {/*            ))}*/}
                {/*        </tr>*/}
                {/*        </thead>*/}
                {/*        <tbody>*/}
                {/*        {Object.keys(coefficientData).map((key, rowIndex) => {*/}
                {/*            if (key !== 'header') {*/}
                {/*                const rowData = coefficientData[key];*/}
                {/*                return (*/}
                {/*                    <tr key={rowIndex}>*/}
                {/*                        <th className="border p-2">{rowData[0]}</th>*/}
                {/*                        {rowData.slice(1).map((value, columnIndex) => (*/}
                {/*                            <td key={columnIndex} className="border p-2">{value}</td>*/}
                {/*                        ))}*/}
                {/*                    </tr>*/}
                {/*                );*/}
                {/*            }*/}
                {/*            return null;*/}
                {/*        })}*/}
                {/*        </tbody>*/}
                {/*    </table>*/}
                {/*</div>*/}
            </div>

        </div>
    );
};

export default MultipleLinear;