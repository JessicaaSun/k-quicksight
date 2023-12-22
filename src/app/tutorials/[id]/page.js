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
        <div className={'sm:pt-52 max-sm:pt-44 md:py-36 lg:pt-32 lg:pb-20 px-3'}>
            <div
                id="html-content"
                className="w-full md:w-2/3 mx-auto"
                dangerouslySetInnerHTML={{ __html: tutorial?.content }}
            />
        </div>
    )
}