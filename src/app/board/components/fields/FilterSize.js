import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const FilterSize = ({ handleChange }) => {
  return (
    <Select
      aria-label={"Size Filter"}
      size={"sm"}
      color={"primary"}
      shadow={false}
      defaultSelectedKeys={["10"]}
      className={
        "md:w-[100px] max-sm:w-[30%] sm:w-[30%] dark:text-white shadow-none"
      }
      onChange={handleChange}
      variant={"bordered"}
    >
      <SelectItem className="dark:text-white" key={5} value={5}>
        5
      </SelectItem>
      <SelectItem className="dark:text-white" key={10} value={10}>
        10
      </SelectItem>
      <SelectItem className="dark:text-white" key={20} value={20}>
        20
      </SelectItem>
      <SelectItem className="dark:text-white" key={50} value={50}>
        50
      </SelectItem>
      <SelectItem className="dark:text-white" key={100} value={100}>
        100
      </SelectItem>
      <SelectItem className="dark:text-white" key={"all"} value={1000000}>
        All
      </SelectItem>
    </Select>
  );
};

export default FilterSize;
