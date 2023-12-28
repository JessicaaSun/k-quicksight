import React from "react";
import { FcIdea } from "react-icons/fc";

const RecommendCard = ({ recommendResult }) => {
  return (
    <div className="mt-7 p-5 dark:bg-dark-bg dark:border-1 dark:border-white bg-white shadow-md rounded-xl">
      <p className="flex items-center mb-4">
        <span className="me-3">
          <FcIdea size={40} />
        </span>
        <span className="text-2xl text-secondary-color dark:text-white font-medium">
          Recommendation and Suggestion
        </span>
      </p>
      <div className="text-lg dark:text-white font-medium">
        {recommendResult}
      </div>
    </div>
  );
};

export default RecommendCard;
