import DashboardDetailKQS from "./DashboardDetail";

export async function generateMetadata({ params }) {
  let uuid = params?.uuid;
  
  const dashboard = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}dashboards/detail_by_uuid/${uuid}/`
  ).then((res) => res.json());

  return {
    title: dashboard?.title,
    description:
      "View and create data dashboard projects on K-QuickSight. Uncover insights from your data.",
    thumbnail: `${process.env.NEXT_PUBLIC_BASE_URL}files/${dashboard?.thumbnail}/`,
    openGraph: {
      images: `${process.env.NEXT_PUBLIC_BASE_URL}files/${dashboard?.thumbnail}/`,
      title: dashboard?.title,
      description:
        "View and create data dashboard projects on K-QuickSight. Uncover insights from your data.",
      siteName: "K-QuickSight",
      locale: "en_US",
      type: "website",
    },
  };
}

const Page = ({ params }) => {
  let uuid = params.uuid;

  return <DashboardDetailKQS uuid={uuid} />;
};

export default Page;
