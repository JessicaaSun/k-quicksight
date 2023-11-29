'use client'

import React from 'react';
import {useSelector} from "react-redux";

const FileScrap = () => {

    const filenames = useSelector(state => state.allFiles.fileScrap)
    console.log(filenames)

    return (
        <div>

        </div>
    );
};

export default FileScrap;