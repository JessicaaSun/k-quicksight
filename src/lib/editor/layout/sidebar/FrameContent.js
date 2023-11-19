'use client'

import React, { useState } from 'react';
import { useAsync } from 'react-use';
import axios from 'axios';
import XIcon from '@duyank/icons/regular/X';
import { isMobile } from 'react-device-detect';
import { useEditor } from '@lidojs/editor';
import Image from 'next/image';

const FrameContent = ({ onClose }) => {
    const [frames, setFrames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { actions } = useEditor();

    useAsync(async () => {
        const response = await axios.get('/frames');
        setFrames(response.data);
        setIsLoading(false);
    }, []);

    const addFrame = async (data) => {
        actions.addFrameLayer(data, data.clipPath);
        if (isMobile) {
            onClose();
        }
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                overflowY: 'auto',
                display: 'flex',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    height: 48,
                    borderBottom: '1px solid rgba(57,76,96,.15)',
                    padding: '0 20px',
                }}
            >
                <p
                    style={{
                        lineHeight: '48px',
                        fontWeight: 600,
                        color: '#181C32',
                        flexGrow: 1,
                    }}
                >
                    Frames
                </p>
                <div
                    style={{
                        fontSize: 20,
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={onClose}
                >
                    <XIcon />
                </div>
            </div>
            <div style={{ flexDirection: 'column', overflowY: 'auto', display: 'flex' }}>
                <div
                    style={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
                        gridGap: 8,
                        padding: '16px',
                    }}
                >
                    {isLoading && <div>Loading...</div>}
                    {frames.map((item, index) => (
                        <div
                            key={index}
                            style={{ cursor: 'pointer', position: 'relative' }}
                            onClick={() => addFrame(item)}
                        >
                            <div style={{ paddingBottom: '100%' }} />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    src={item.img}
                                    style={{
                                        maxHeight: '100%',
                                        maxWidth: '100%',
                                    }}
                                    width={100}
                                    height={100}
                                    alt="Frame"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FrameContent;
