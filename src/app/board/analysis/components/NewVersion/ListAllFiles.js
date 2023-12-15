import { formatBytes } from '@/utils/convertByte'
import { Spinner } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

export default function ListAllFiles({ file, isFileLoading }) {
    return (
        <div>
            {
                isFileLoading ? (
                    <div className={'flex justify-center items-center'}>
                        <Spinner color={'primary'} size={'lg'} label="Loading dataset" />
                    </div>
                ) : (
                    <div className={'flex flex-col gap-3'}>
                        {
                            file?.map((item, index) => (
                                <Link href={`/board/analysis/new/${item.uuid}`} key={item.id} className={'hover:bg-primary-color cursor-pointer hover:text-white transition-all px-3 py-3 flex items-center justify-between bg-white rounded-lg border-1 border-gray-200 shadow-sm'}>
                                    <div>
                                        <p>{item.file}</p>
                                        <p className={'text-sm'}>({item.type}) <span className={'font-medium'}>{!item.is_original ? <span>Cleaned</span> : <span>Original</span>}</span> with {formatBytes(item.size)}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
