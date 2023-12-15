import React from "react";
import { Button } from "@nextui-org/react";

const AddDashboard = ({ onOpen, isAnalysis }) => {
  return (
    <div className={"text-primary-color "}>
      <Button
        onPress={onOpen}
        className={"bg-primary-color text-background-color"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
            fill="white"
          />
        </svg>
        {isAnalysis ? "Create Analysis" : "Create Dashboard"}
      </Button>
    </div>
  );
};

export default AddDashboard;
