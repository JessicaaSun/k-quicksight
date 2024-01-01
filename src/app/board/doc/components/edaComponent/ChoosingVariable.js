import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useFindHeaderQuery } from "@/store/features/ExploreData/ExploreData";
import { useDispatch, useSelector } from "react-redux";
import {
  setDependentVariable,
  setInDependentVariable,
  setVariables,
} from "@/store/features/ExploreData/edaStore";

const ChoosingVariable = () => {
  const fileCleaned = useSelector((state) => state.cleanedFileUUID.filename);
  const eda = useSelector((state) => state.eda);
  const { data: headerLabel } = useFindHeaderQuery({ filename: fileCleaned });
  const [variable, setVariable] = useState({
    independent_variable: "",
    dependent_variable: "",
  });

  const handleChangeDependent = (value) => {
    setVariable((prev) => ({ ...prev, dependent_variable: value }));
  };

  const handleChangeInDependent = (value) => {
    setVariable((prev) => ({ ...prev, independent_variable: value }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInDependentVariable(variable.independent_variable));
    dispatch(setDependentVariable(variable.dependent_variable));
  }, [dispatch, variable, eda]);

  return (
    <div className={"mt-5"}>
      <div className={"mb-5"}>
        <p className={"text-primary-color font-semibold text-lg"}>
          Choose x-axis and y-axis for comparing when
          conducting exploratory data analysis (EDA).
        </p>
      </div>
      <div className={"flex gap-5 justify-between items-center"}>
        <Select
          aria-label={"Select"}
          size={"large"}
          placeholder={"Select x-axis"}
          style={{
            width: "50%",
          }}
          onChange={handleChangeDependent}
          options={headerLabel?.header_label}
        />
        <Select
          size={"large"}
          placeholder={"Select y-axis"}
          style={{
            width: "50%",
          }}
          onChange={handleChangeInDependent}
          options={headerLabel?.header_label}
        />
      </div>
    </div>
  );
};

export default ChoosingVariable;
