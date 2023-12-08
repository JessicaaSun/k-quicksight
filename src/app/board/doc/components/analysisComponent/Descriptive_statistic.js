// components/DataTable.js
import React from 'react';
import {generateBashURL} from "@/utils/util";

const Descriptive_statistic = ({ data, headers }) => {
    if (!data || typeof data !== 'object') {
        return <p className={'text-red-400'}>Please input valid columns or click perform button</p>;
    }

    return (
        <div className="overflow-x-scroll">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th>Statistic</th>
                    {headers?.map((columnName) => (
                        <th
                            key={columnName}
                            className="py-2 px-4 border-b font-semibold text-sm"
                        >
                            {columnName}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((stat) => (
                        <tr key={stat}>
                            <td className="py-2 px-4 border-b font-semibold text-sm">{stat}</td>
                            {headers?.map((columnName) => (
                                <td key={columnName} className="py-2 px-4 border-b text-sm">
                                    {data[stat][columnName] !== undefined ? data[stat][columnName] : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Descriptive_statistic;
