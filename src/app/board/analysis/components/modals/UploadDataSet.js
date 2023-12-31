"use client"
import React, {useEffect} from 'react';
import Image from "next/image";
import UploadData from "@assets/images/analysis/add-task.png";
import {Button, useDisclosure} from "@nextui-org/react";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {useDispatch, useSelector} from "react-redux";
import { useFileImportMutation } from "@/store/features/files/allFileByuserId";
import {useRouter} from "next/navigation";
import {useGetAllFilesQuery} from "@/store/features/files/allFileByuserId";
import {setCurrentUser} from "@/store/features/auth/authSlice";

const UploadDataSet = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: user } = useGetUserQuery();
    const dispatch = useDispatch();
    // const [fileInfo, setFileInfo] = useState({});
    const [importFile] = useFileImportMutation();
    const router = useRouter();
    const {data:allFiles, refetch: refetchAllFiles, isLoading: importLoading} = useGetAllFilesQuery({id:user?.data.id, filename: '', type: ''})

    useEffect(() => {
        dispatch(setCurrentUser(user));
    }, [user, dispatch]);

    const handleImportFile = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const response = await importFile({ file: formData, userId: user?.data.id });
        // Check if the import was successful and the analysisUuid is available
        if (response && response.data && response.data.analysisUuid) {
            const analysisUuid = response.data.analysisUuid;
            // Call showData to navigate to the new route
            showData();
        }
        onOpenChange(false)
        refetchAllFiles();
    };

    const stateUuid = useSelector((state) => state.analysisUuid.uuid);
    const showData = () => {
        router.push(`/board/analysis/${stateUuid}`);
    };
    return (
        <div>
            <Button className={"flex flex-col w-full h-full"}>
                <input
                    type="file"
                    accept=".csv, .xlsx, .txt, .json"
                    onChange={handleImportFile}
                    style={{ display: 'none' }}
                    id="uploadInput"
                />
                <label htmlFor="uploadInput">
                    <Image src={UploadData} alt={""} className={"w-40 "} />
                    <p className={"font-bold"}>Upload new dataset</p>
                </label>
            </Button>
        </div>
    );
};

export default UploadDataSet;