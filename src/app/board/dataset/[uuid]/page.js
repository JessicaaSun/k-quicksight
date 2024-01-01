import React from "react";
import DetailDatasetKQS from "./DetailDataSetKQS";

export async function generateMetadata({ params }) {
  const uuid = params?.uuid;
  const dataset = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}files/details/${uuid}/?size=0&p=1`
  ).then((res) => res.json());

  return {
    title: dataset?.file,
    description:
      "Explore your datasets on K-QuickSight. Power your data analysis with diverse datasets.",
    openGraph: {
      title: dataset?.file,
      description: "The React Framework for the Web",
      siteName: "K-QuickSight",
      locale: "en_US",
      type: "website",
    },
  };
}

const page = ({ params }) => {
  const uuid = params?.uuid;
  return <DetailDatasetKQS uuid={uuid} />;
};

export default page;
