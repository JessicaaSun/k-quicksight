"use client"
import React, { useEffect, useState } from "react";
import ShareMember from "@/app/board/dataset/component/shareMember";
import AnalysisStep from "@/app/board/components/AnalysisStep";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useGetFileDetailQuery, useGetFileOverviewQuery } from "@/store/features/files/allFileByuserId";
import { useDispatch, useSelector } from "react-redux";
import { setFileAccurate } from "@/store/features/files/filesDetail";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader, Spinner, Table,
  TableBody, TableCell, TableColumn, TableHeader, TableRow,
  useDisclosure
} from "@nextui-org/react";
import ModelMachineLearning from "@/app/board/analysis/components/ModelMachineLearning";
import AnalysisStep3 from "@/app/board/analysis/components/AnalysisStep3";
import AnalysisStep4 from "@/app/board/analysis/components/AnalysisStep4";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  let uuid = params.uuid;
  const { data: user } = useGetUserQuery();
  const [headers, setHeader] = useState([]);
  const [data, setData] = useState([]);
  const { data: fileDetail, refetch: refetchDetail, isLoading } = useGetFileDetailQuery({ uuid: uuid, size: 100, page: 1 })
  const { data: fileOverview, isLoading: overviewLoading, refetch: refetchOverview } = useGetFileOverviewQuery({ uuid: uuid, userId: user?.data.id });
  const dispatch = useDispatch();
  const [overview_data, setOverview] = useState([])
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const handleSelectDataset = () => {
    setCurrentStep(0)
    onClose();
  };
  const handleSelectBoard = () => {
    setCurrentStep(3)
  };

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
  const [size, setSize] = React.useState('4xl')

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const handleSelect = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3)
    }
  };

  const handleOpen = (size) => {
    setCurrentStep(1);
    setSize(size)
    onOpen();
  }
  const [selectedColor, setSelectedColor] = React.useState("primary");
  return (
    <div>
      <div className={"flex flex-row pt-10 w-full justify-between"}>
        <div className={"flex flex-col px-10"}>
          <div className={"flex flex-row"}>
            <h1 className={"text-primary-color pb-5"}>Analysis</h1>
            {currentStep !== 3 && (
              <h1 className={"text-primary-color pb-5"}>/Data</h1>
            )}
          </div>
          <div className={"flex flex-row gap-5"}>
            {currentStep !== 3 && (
              <p className={"text-primary-color"}>
                Predict future courses
              </p>
            )}
            {currentStep === 3 && (
              <p className={"text-primary-color text-xl"}>
                Income
              </p>
            )}
            <ShareMember />
          </div>
        </div>
        <div>
          <div className={"flex gap-5 px-10 flex-col"}>
            <div className={"px-4 pt-4"}>
              <AnalysisStep step={currentStep} />
            </div>
            {currentStep === 3 && (
              <div className={"flex justify-end px-4"}>
                <Button className={"text-background-color bg-primary-color w-32"} onClick={handleSelectDataset}>
                  Go to Data
                </Button>
              </div>
            )}
            {currentStep !== 3 && (
              <div className={"flex flex-row justify-end gap-5"}>
                <Button onPress={onOpen} key={size} onClick={() => handleOpen(size)} className={"bg-primary-color text-background-color"}>
                  Perform Analysis
                </Button>
                <Button className={"text-background-color bg-primary-color"} onClick={handleSelectBoard}>
                  Go to Board
                </Button>
              </div>
            )}
          </div>
          {currentStep !== 3 && (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} size={size}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 pt-10">
                      {currentStep === 1 && <AnalysisStep step={1} />}
                      {currentStep === 2 && <AnalysisStep step={2} />}
                    </ModalHeader>
                    <ModalBody>
                      <p className={"font-bold text-primary-color text-2xl"}>Data Analysis</p>
                      <Table
                        color={selectedColor}
                        selectionMode="single"
                        defaultSelectedKeys={["Moving Average"]}
                        aria-label="Example static collection table"
                      >
                        <TableHeader>
                          <TableColumn className={"hidden"}>NAME</TableColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow key="Moving Average">
                            <TableCell>Moving Average</TableCell>
                          </TableRow>
                          <TableRow key="Random Number Generation">
                            <TableCell>Random Number Generation</TableCell>
                          </TableRow>
                          <TableRow key="Rank and Percentile">
                            <TableCell>Rank and Percentile</TableCell>
                          </TableRow>
                          <TableRow key="Simple Linear Regression">
                            <TableCell>Simple Linear Regression</TableCell>
                          </TableRow>
                          <TableRow key="Multiple Linear Regression">
                            <TableCell>Multiple Linear Regression</TableCell>
                          </TableRow>
                          <TableRow key="Polynomial Regression">
                            <TableCell>Polynomial Regression</TableCell>
                          </TableRow>
                          <TableRow key="Sampling">
                            <TableCell>Sampling</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={handleSelect}>
                        Proceed
                      </Button>
                      <Button color="danger" variant={'flat'} onPress={onClose}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          )}
        </div>
      </div>
      {currentStep !== 3 && (
        <div className={"pt-14"}>
          <p className={"py-3 text-2xl"}>Dataset</p>
          {
            isLoading ? (
              <Spinner size={'md'} />
            ) : (
              <FileDetail dataFile={fileDetail?.results} uuid={uuid} headers={fileDetail?.headers} isLoading={isLoading} size={30} />
            )
          }
        </div>
      )}
      {currentStep === 3 && (
        <AnalysisStep4 />
      )}
    </div>
  );
};

export default Page;
