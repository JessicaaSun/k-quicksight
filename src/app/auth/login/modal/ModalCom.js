"use client"
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ModalCom({closed}) {
    const [close, setClose] = useState(false)
    setClose(closed)
    return (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-black/20 flex justify-center items-center z-40`}>
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                    <p className='text-red-700 font-semibold text-2xl text-center w-full'>Error 404</p>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>You cannot register, sorry, please do it again</p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button onClick={() => setClose(true)} className='bg-primary-color text-white font-semibold'>Back again</Button>
                </CardFooter>
            </Card>

        </div>
    )
}
