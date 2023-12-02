'use client';

import SelectVisulize from "@/app/board/doc/components/edaComponent/selectVisulize";
import React, {useEffect} from 'react';
import FileDetail from "@/app/board/dataset/component/FileDetail";
import {useDispatch, useSelector} from "react-redux";
import {useGetEdaQuery} from "@/store/features/ExploreData/ExploreData";
import Visualization from "@/app/board/doc/components/edaComponent/visualization";
import {setEdaFilename} from "@/store/features/ExploreData/edaStore";
const Eda = () => {
    const dispatch = useDispatch();
    const uuidFileCleaned = useSelector(state => state.cleanedFileUUID.uuid)
    const fileCleaned = useSelector(state => state.cleanedFileUUID.filename)
    const showClean = useSelector(state => state.cleanedFileUUID.showDetailDataClean)
    const bodyEda = useSelector(state => state.eda)

    useEffect(() => {
        dispatch(setEdaFilename(fileCleaned))
    }, [dispatch, fileCleaned]);

    return (
        <div className={'flex flex-col gap-5'}>
            {
                showClean && (
                    <>
                        <p className={'text-lg text-primary-color font-medium'}>Detail dataset</p>
                        <FileDetail uuid={uuidFileCleaned} />
                    </>
                )
            }
            <SelectVisulize />
            <Visualization bodyEda={bodyEda} />
        </div>
    );
};

export default Eda;