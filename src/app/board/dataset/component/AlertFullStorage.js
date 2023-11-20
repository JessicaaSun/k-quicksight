import React from 'react';
import { Button, message, Space } from 'antd';
const FullStorage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
        });
    };
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Your storage is fulled',
        });
    };
    return (
        <>
            {contextHolder}
            <Space>
                <Button onClick={warning} className={'h-[45px] px-5 text-sm rounded-xl bg-primary-color text-white font-semibold border-2 border-white shadow-lg'}>New Dataset</Button>
            </Space>
        </>
    );
};
export default FullStorage;