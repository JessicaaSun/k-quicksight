"use client"
import React from "react";
import {useGetTutorialsQuery, useGetTutorialsUUIDQuery} from "@/store/features/tutorial/tutorialApiSlice";
export default function TutorialDetail({params}){
    const uuid = params.id
    const {
        data: tutorial,
        isLoading,
        isError,
        isSuccess,
    } = useGetTutorialsUUIDQuery({uuid:uuid});
    return (

        <div className={'py-44 px-[10%] dark:text-white'}>

            <div
                id="html-content"
                className="w-full md:w-2/3 mx-auto"
                dangerouslySetInnerHTML={{ __html: tutorial?.content }}
            />
        </div>
    )
}