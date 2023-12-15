import { data } from "../data";
import { DesignFrame } from "@lidojs/editor";

const EditorContent = ({ dashboardData }) => {
  return (
    <DesignFrame
      data={
        dashboardData?.json_data !== null
          ? JSON.parse(dashboardData?.json_data)
          : data
      }
    />
  );
};

export default EditorContent;
