"use client";
import React, { useEffect, useState } from "react";
import ShareMember from "@/app/board/dataset/component/shareMember";
import AnalysisStep from "@/app/board/components/AnalysisStep";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import {
  useGetFileDetailQuery,
  useGetFileOverviewQuery,
} from "@/store/features/files/allFileByuserId";
import { useDispatch, useSelector } from "react-redux";
import { setFileAccurate } from "@/store/features/files/filesDetail";
import FileDetail from "@/app/board/dataset/component/FileDetail";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import AnalysisStep4 from "@/app/board/analysis/components/steps/AnalysisStep4";
import { useRouter } from "next/navigation";
import SelectVisualize from "@/app/board/analysis/components/Eda/SelectVisualize";
import AnalysisStep3 from "@/app/board/analysis/components/steps/AnalysisStep3";
import selectVisulize from "@/app/board/doc/components/edaComponent/selectVisulize";
import SelectVisulize from "@/app/board/doc/components/edaComponent/selectVisulize";
// import AnalysisStep2 from "@/app/board/analysis/components/steps/AnalysisStep2";
import HeaderAnalysis from "@/app/board/analysis/components/steps/HeaderAnalysis";
import analysis, { useAnalysisDetailsQuery } from "@/store/features/analysis/Analysis";
import SimpleLinear from "@/app/board/doc/components/analysisComponent/SimpleLinear";
import MultipleLinear from "@/app/board/doc/components/analysisComponent/MultipleLinear";
import { useFindHeaderQuery } from "@/store/features/ExploreData/ExploreData";
import CorrelationTable from "@/app/board/doc/components/edaComponent/CorrelationTable";
import Correllation from "@/app/board/doc/components/analysisComponent/Correllaltion";
import UpdateInfo from "../../components/UpdateInfo";

const Page = ({ params }) => {
  let uuid = params.Fileuuid;
  let analysisUUID = params.analysisuuid;
  const { data: user } = useGetUserQuery();

  const {
    data: fileDetail,
    isLoading: detailLoading,
  } = useGetFileDetailQuery({ uuid: uuid, size: 100, page: 1 });

  const {
    data: fileOverview,
    isLoading: overviewLoading,
  } = useGetFileOverviewQuery({ uuid: uuid, userId: user?.data.id });

  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const handleSelectGotoData = () => {
    setCurrentStep(0);
    onClose();
  };

  const [size, setSize] = useState("4xl");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleSelect = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4)
    }
  };

  const handleOpen = (size) => {
    setCurrentStep(1);
    setSize(size);
    onOpen();
  };



  const { data: analysisDetail } = useAnalysisDetailsQuery({ analysisUUID: analysisUUID });
  const { data: headers } = useFindHeaderQuery({ filename: analysisDetail?.filename });

  return (
    <div className="p-10">
      <div className={"flex flex-row w-full justify-between"}>
        <div className={"flex flex-col"}>
          <div className={"flex flex-row"}>
            <h1 className={"text-primary-color pb-5"}>Analysis</h1>
          </div>
          <div className={"flex flex-row gap-5"}>
            <p className={"text-primary-color font-medium"}>{analysisDetail?.title || 'Analysis'}</p>
            {/* <ShareMember /> */}
          </div>
        </div>
        <UpdateInfo filename={analysisDetail?.title} uuid={analysisUUID} thumbnailUrl={analysisDetail?.thumbnail} />
      </div>
      {currentStep !== 3 && (
        <div className={"pt-14"}>
          {detailLoading ? (
            <div className="flex justify-center items-center">
              <Spinner size={"md"} />
            </div>
          ) : (
            <>
              {
                fileDetail ? (
                  <FileDetail
                    dataFile={fileDetail?.results}
                    uuid={uuid}
                    headers={fileDetail?.headers}
                    isLoading={detailLoading}
                    size={30}
                  />
                ) : (
                  <div>
                    <p className="text-red-400 text-xl text-center font-medium">Dataset might be deleted</p>
                  </div>
                )
              }
            </>
          )}
        </div>
      )}
      {currentStep === 3 && <AnalysisStep3 />}

      <div className="mt-10">
        <p className="text-xl text-primary-color font-semibold">Analysis detail of {analysisDetail?.model_name}</p>

        {
          analysisDetail?.model_name.includes('simple_linear_regression') ? (
            <SimpleLinear data={analysisDetail?.analysis_data} />
          ) : analysisDetail?.model_name.includes('multiple_linear_regression') ? (
            <MultipleLinear data={analysisDetail?.analysis_data} headers={headers?.header_numeric} />
          ) : analysisDetail?.model_name.includes('covariance') || analysisDetail?.model_name.includes('correlation') ? (
            <Correllation data={analysisDetail?.analysis_data} />
          ) : null
        }
      </div>
    </div>
  );
};

export default Page;
