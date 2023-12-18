'use client'
import { formatBytes } from '@/utils/convertByte'
import { Button, Spinner } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ListAllFiles({ file, isFileLoading }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const handleProcess = (uuid) => {
        setLoading(true)
        router.push(`/board/analysis/new/${uuid}`)
    }

    return (
        <div>
            {
                isFileLoading ? (
                    <div className={'flex justify-center items-center'}>
                        <Spinner color={'primary'} size={'lg'} />
                    </div>
                ) : (
                    <div className={'flex flex-col gap-3'}>
                        {
                            loading ? (
                                <div className='flex justify-center items-center min-h-full mt-10'>
                                    <Spinner size={'lg'} label='loading dataset' />
                                </div>
                            ) :
                                <>
                                    {
                                        file?.map((item, index) => (
                                            <Button onClick={() => handleProcess(item.uuid)} key={item.id} className={'hover:bg-primary-color text-left px-5 py-10 text-medium cursor-pointer hover:text-white transition-all flex items-center justify-between bg-white rounded-lg border-1 border-gray-200 shadow-sm'}>
                                                <div>
                                                    <p>{item.file}</p>
                                                    <p className={'text-sm'}>({item.type}) <span className={'font-medium'}>{!item.is_original ? <span>Cleaned</span> : <span>Original</span>}</span> with {formatBytes(item.size)}</p>
                                                </div>
                                            </Button>
                                        ))
                                    }
                                </>
                        }
                    </div>
                )
            }
        </div>
    )
}
