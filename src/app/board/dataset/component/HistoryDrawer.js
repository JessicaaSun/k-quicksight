import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const HistoryDrawer = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button className={'text-description-color border-0 font-medium bg-none min-w-fit min-h-fit hover:bg-none'} onClick={showDrawer}>
                Show version history
            </Button>
            <Drawer title="Version history" placement="right" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
};
export default HistoryDrawer;