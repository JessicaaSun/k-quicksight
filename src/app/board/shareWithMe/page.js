'use client'
import React from 'react';
import { Tabs } from 'antd';
import ShareWithmeTap from "@/app/board/shareWithMe/component/shareWithme_tap";
import ShareToOther from "@/app/board/shareWithMe/component/ShareToOther";
const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Share with me',
        children: <ShareWithmeTap />,
    },
    {
        key: '2',
        label: 'Share to other',
        children: <ShareToOther />,
    },
];
const App = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default App;