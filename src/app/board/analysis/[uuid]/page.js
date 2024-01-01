import AnalysisDetailKQS from "./DetailAnalysisKQS";

export async function generateMetadata({ params }) {
  let uuid = params?.uuid;
  
  const analysis = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}analysis/detail/${uuid}/`
  ).then((res) => res.json());

  return {
    title: analysis?.title,
    description:
      "View and create data analysis projects on K-QuickSight. Uncover insights from your data.",
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_URL}files/${analysis?.thumbnail}/`,
    openGraph: {
      images: `${process.env.NEXT_PUBLIC_BASE_URL}files/${analysis?.thumbnail}/`,
      title: analysis?.title,
      description:
        "View and create data analysis projects on K-QuickSight. Uncover insights from your data.",
      siteName: "K-QuickSight",
      locale: "en_US",
      type: "website",
    },
  };
}

const Page = ({ params }) => {
  let uuid = params.uuid;

  return <AnalysisDetailKQS uuid={uuid} />;
};

export default Page;
