'use client';

import SelectVisulize from "@/app/board/doc/components/edaComponent/selectVisulize";
import React, {useEffect} from 'react';
import FileDetail from "@/app/board/dataset/component/FileDetail";
import {useDispatch, useSelector} from "react-redux";
import Visualization from "@/app/board/doc/components/edaComponent/visualization";
import {setEdaFilename} from "@/store/features/ExploreData/edaStore";
import ChoosingVariable from "@/app/board/doc/components/edaComponent/ChoosingVariable";
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
                showClean ? (
                    <>
                        <p className={'text-lg text-primary-color font-medium'}>Detail dataset</p>
                        <FileDetail showHeader={true} uuid={uuidFileCleaned} />
                        {/*Choosing independence variable and dependence variable*/}
                        <ChoosingVariable />
                        <SelectVisulize />
                        {/*Changing flow of eda*/}
                        <Visualization bodyEda={bodyEda} />
                    </>
                ) : (
                    <p className={'text-lg text-primary-color font-medium'}>Please clean your dataset first!</p>
                )
            }
        </div>
    );
};

export default Eda;