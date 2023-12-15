'use client'
import React from 'react';
import { Tabs } from 'antd';
import ShareWithmeTap from "@/app/board/share-with-me/component/shareWithme_tap";
import ShareToOther from "@/app/board/share-with-me/component/ShareToOther";
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
const App = () => <div className='pt-5 px-7'><Tabs defaultActiveKey="1" items={items} onChange={onChange} /></div>;
export default App;