import React from "react";
import { FaFileImport, FaChartPie } from "react-icons/fa";
import { BsClipboard2CheckFill, BsStars } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";

const steps = [
    {
      name: "Import Data",
      description:
        "Start by importing data from various sources, including CSV, TXT, XLSM, JSON, or web scraping.",
      icon: <FaFileImport />,
    },
    {
      name: "Prepare & Clean Data",
      description:
        "Clean and transform your data effortlessly, ensuring it's ready for advanced analysis.",
      icon: <BsStars />,
    },
    {
      name: "Analyze Data",
      description:
        "Apply advanced machine learning algorithms to gain valuable insights and uncover patterns.",
      icon: <IoMdAnalytics />,
    },
    {
      name: "Visualize Data",
      description:
        "Create interactive dashboards with dynamic charts and graphs for easy data visualization.",
      icon: <FaChartPie />,
    },
    {
      name: "Result",
      description:
        "Receive comprehensive results in just a few simple steps!",
      icon: <BsClipboard2CheckFill />,
    },
  ];
  

const GettingStart = () => {
  return (
    <div id="wrap" className="wpb_wrapper">
      <div className="buy-process-wrap">
        <div className="buy-process-items">
          {steps.map((step, index) => (
            <div key={index} className="buy-process-item">
              <div className="text-wrap">
                <h4>
                  <strong className="dark:text-third-color">{step.name}</strong>
                </h4>
                <p className="dark:text-white">{step.description}</p>
              </div>
              <span>{index + 1}</span>
              <div className="icon-wrapper">
                <i className="flex justify-center items-center">{step.icon}</i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GettingStart;
