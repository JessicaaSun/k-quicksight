import React from 'react';
import Descriptive_statistic from "@/app/board/doc/components/analysisComponent/Descriptive_statistic";

const NonLinear = ({data, headers}) => {

    if (!data || typeof data !== 'object') {
        return <p className={'text-red-400'}>Please input valid columns or click perform button</p>;
    }
    const coefficientData = data?.conefficient_summary_table;

    return (
        <div className="overflow-x-scroll">
            <p className={'text-lg text-primary-color my-3'}>Descriptive table: </p>
            <table className="w-full border">
                <tbody>
                    <tr>
                        <td className="text-description-color border p-2">Predict_value:</td>
                        <td className="border p-2">{data?.predict_value}</td>
                    </tr>
                    <tr>
                        <td className="text-description-color border p-2">Coefficient:</td>
                        <td className="border p-2">{data?.coefficient}</td>
                    </tr>
                    <tr>
                        <td className="text-description-color border p-2">R2:</td>
                        <td className="border p-2">{data?.evaluate_model.R2}</td>
                    </tr>
                    <tr>
                        <td className="text-description-color border p-2">MSE:</td>
                        <td className="border p-2">{data?.evaluate_model.MSE}</td>
                    </tr>
                    <tr>
                        <td className="text-description-color border p-2">MAE:</td>
                        <td className="border p-2">{data?.evaluate_model.MAE}</td>
                    </tr>
                    <tr>
                        <td className="text-description-color border p-2">RMSE:</td>
                        <td className="border p-2">{data?.evaluate_model.RMSE}</td>
                    </tr>
                    <tr>
                        <td className="text-description-color border p-2">Intercept:</td>
                        <td className="border p-2">{data?.intercept}</td>
                    </tr>
                    <tr>
                        <td className="text-description-color border p-2">Kurtosis:</td>
                        <td className="border p-2">{data?.kurtosis}</td>
                    </tr>
                    <tr>
                        <td className="text-description-color border p-2">Skew:</td>
                        <td className="border p-2">{data?.skew}</td>
                    </tr>
                </tbody>
            </table>
            <p className={'text-lg my-3 text-primary-color'}>Evauluation model: </p>
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
                        <td class="border p-2">{data?.regression_statistics.standard_error}</td>
                    </tr>
                </tbody>
            </table>
            <p className={'text-lg my-4 text-primary-color'}>Describe statistic: </p>
            <Descriptive_statistic data={data?.descriptive_statstics} headers={headers} />
            <p className={'text-lg my-4 text-primary-color'}>Conefficient summary table: </p>
            <table className="w-full border" id="coefficientTable">
                <thead>
                <tr>
                    {coefficientData.header.map((header, index) => (
                        <th key={index} className="border p-2">{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {Object.keys(coefficientData).map((key, rowIndex) => {
                        if (key !== 'header') {
                            const rowData = coefficientData[key];
                            return (
                                <tr key={rowIndex}>
                                    <th className="border p-2">{rowData[0]}</th>
                                    {rowData.slice(1).map((value, columnIndex) => (
                                        <td key={columnIndex} className="border p-2">{value}</td>
                                    ))}
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default NonLinear;