"use client"
import React from 'react';
import Image from "next/image";
import UploadData from "@assets/images/analysis/add-task.png";

const UploadDataSet = () => {
    const generateMockUUID = () => {
        // This is a simple function to generate a mock UUID
        return 'mock-' + Math.random().toString(36).substring(2, 15);
    };
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            // Generate a mock UUID
            const mockUUID = generateMockUUID();

            // Handle the file based on its type (CSV, XLSX, TXT, JSON)
            if (file.type === 'application/vnd.ms-excel' || file.type === 'text/csv') {
                // Handle CSV file
                console.log('CSV file selected:', file, 'Mock UUID:', mockUUID);
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                // Handle XLSX file
                console.log('XLSX file selected:', file, 'Mock UUID:', mockUUID);
            } else if (file.type === 'text/plain') {
                // Handle TXT file
                console.log('TXT file selected:', file, 'Mock UUID:', mockUUID);
            } else if (file.type === 'application/json') {
                // Handle JSON file
                console.log('JSON file selected:', file, 'Mock UUID:', mockUUID);
            } else {
                // Unsupported file type
                console.error('Unsupported file type:', file.type);
            }
        }
    };
    return (
        <div>
            <div className={"flex flex-col"}>
                <input
                    type="file"
                    accept=".csv, .xlsx, .txt, .json"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="uploadInput"
                />
                <label htmlFor="uploadInput">
                    <Image src={UploadData} alt={""} className={"w-40 "} />
                    <p>Upload new dataset</p>
                </label>
            </div>
        </div>
    );
};

export default UploadDataSet;