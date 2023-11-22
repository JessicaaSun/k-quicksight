"use client"
import React, {useEffect, useState} from "react";
import ShareMember from "@/app/board/dataset/component/shareMember";
import AnalysisStep from "@/app/board/components/AnalysisStep";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {useGetFileDetailQuery, useGetFileOverviewQuery} from "@/store/features/files/allFileByuserId";
import {useDispatch} from "react-redux";
import {setFileAccurate} from "@/store/features/files/filesDetail";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, Table,
  TableBody, TableCell, TableColumn, TableHeader, TableRow,
  useDisclosure
} from "@nextui-org/react";

const Page = ({ params }) => {
  let uuid = params.uuid;
  const {data:user} = useGetUserQuery();
  const [headers, setHeader] = useState([]);
  const [data, setData] = useState([]);
  const {data:fileDetail, refetch: refetchDetail, isLoading} = useGetFileDetailQuery({uuid: uuid, size: 0})
  const {data:fileOverview, isLoading: overviewLoading, refetch: refetchOverview} = useGetFileOverviewQuery({uuid: uuid, userId: user?.data.id});
  const dispatch = useDispatch();
  const [overview_data, setOverview] = useState([])

  useEffect(() => {
    const fileOverview = async () => {
      const overview = await refetchOverview();
      setOverview(overview.data)
      dispatch(setFileAccurate(overview.data))
    }
    fileOverview()
  }, [refetchOverview]);

  useEffect(() => {
    setHeader(fileDetail?.header);
    setData(fileDetail?.data);
  }, [dispatch, fileDetail?.data, fileDetail?.header, refetchDetail, refetchOverview]);

  const totalSteps = 4;
  const steps = [1];
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState('opaque')
  const [size, setSize] = React.useState('3xl')
  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }
  const [selectedColor, setSelectedColor] = React.useState("success");
  return (
    <div>
      <div className={"flex flex-row pt-10 w-full justify-between"}>
        <div className={"flex flex-col"}>
          <h1 className={"text-primary-color pb-5"}>Analysis /Data</h1>
          <div className={"flex flex-row gap-5"}>
            <p className={"text-primary-color"}>
              Predict future courses
            </p>
            <ShareMember/>
          </div>
        </div>
        <div>
          <div className={"flex gap-5 px-10"}>
            {/*{sizes.map((size) => (*/}
              <Button onPress={onOpen} key={size} onClick={() => handleOpen(size)} className={"bg-primary-color text-background-color"}>
                Perform Analysis
              </Button>
              <Button className={"text-background-color bg-primary-color"}>
                Go to Board
              </Button>
            {/*))}*/}
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={size}>
            <ModalContent>
              {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 pt-10">
                      {steps.map(step => (
                          <AnalysisStep key={step} step={step}/>
                      ))}
                    </ModalHeader>
                    <ModalBody>
                      <p className={"font-bold text-primary-color text-2xl"}>Data Analysis</p>
                      <Table
                          color={selectedColor}
                             selectionMode="single"
                             defaultSelectedKeys={["2"]}
                             aria-label="Example static collection table"
                      >
                        <TableHeader>
                          <TableColumn className={"hidden"}>NAME</TableColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow key="1">
                            <TableCell>Moving Average</TableCell>
                          </TableRow>
                          <TableRow key="2">
                            <TableCell>Random Number Generation</TableCell>
                          </TableRow>
                          <TableRow key="3">
                            <TableCell>Rank and Percentile</TableCell>
                          </TableRow>
                          <TableRow key="4">
                            <TableCell>Simple Linear Regression</TableCell>
                          </TableRow>
                          <TableRow key="5">
                            <TableCell>Multiple Linear Regression</TableCell>
                          </TableRow>
                          <TableRow key="6">
                            <TableCell>Polynomial Regression</TableCell>
                          </TableRow>
                          <TableRow key="7">
                            <TableCell>Sampling</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={onClose}>
                        Select
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className={"pt-14"}>
        <p className={"py-3 text-2xl"}>Dataset</p>
        <FileDetail dataFile={data} uuid={uuid} headers={headers} isLoading={isLoading} size={30} />
      </div>
    </div>
  );
};

export default Page;
