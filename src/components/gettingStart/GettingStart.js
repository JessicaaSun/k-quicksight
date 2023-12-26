import React from 'react';
import { Steps } from 'antd';
const description = 'This is a description.';
const GettingStart = () => (
    <Steps
        className={'font-semibold dark:text-white'}
        current={6}
        items={
            [
                {"title": "Import Data", "description": "Initiate analysis by importing datasets into K-QuickSight."},
                {"title": "Prepare & Clean", "description": "Ensure data reliability with K-QuickSight's preprocessing tools."},
                {"title": "Analyze Data", "description": "Uncover insights using powerful analysis tools in K-QuickSight."},
                {"title": "Visualize Data", "description": "Transform analysis into visuals with K-QuickSight's diverse options."},
                {"title": "Results", "description": "Summarize key findings and empower stakeholders with K-QuickSight."}
            ]

        }
    />
);
export default GettingStart;