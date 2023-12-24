"use client"
import React, {useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import {useGetTutorialsQuery} from "@/store/features/tutorial/tutorialApiSlice";
import {generateBashURL} from "@/utils/util";
import {useRouter} from "next/navigation";

export default function TutorialCard() {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10000000);
    const router = useRouter()

    const {
        data: tutorials,
        isLoading,
        isError,
        isSuccess,
    } = useGetTutorialsQuery({page, size, title:""});
    const handleDetail = (id) => {
        router.push(`/tutorials/${id}`)
    }
    return (
        <div className={"md:grid md:gap-5 lg:gap-8 grid-cols-2 "}>
            {
                tutorials?.results.map((e, index) => (
                    <div className="cursor-pointer md:pt-0 pt-5" key={index} onClick={()=>router.push(`/tutorials/${e.uuid}`)}>
                        <Card isFooterBlurred
                              className="w-full h-[400px]  sm:col-span-7"

                        >
                            <Image
                                removeWrapper
                                alt="Relaxing app background"
                                className="z-0 w-full h-full object-cover"
                                src={generateBashURL(e.thumbnail)}
                            />
                            <CardFooter
                                className="absolute flex gap-5 bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                                <div className="flex flex-grow gap-2 items-center">
                                    <Image
                                        alt="Breathing app icon"
                                        className="rounded-full w-10 h-10 bg-black object-cover"
                                        src="assets/logos/logo.png"
                                    />
                                    <div className="flex flex-col h-auto">
                                        <h4 className="text-tiny text-white/60">{e.title}</h4>
                                        <p className="text-tiny text-white/60">{e.description}</p>
                                    </div>
                                </div>
                                <Button onClick={() => handleDetail(e.uuid)} radius="full" size="sm" className={'px-5 dark:bg-third-color dark:text-black'}>View details</Button>
                            </CardFooter>
                        </Card>

                    </div>
                ))
            }

        </div>
    )
}