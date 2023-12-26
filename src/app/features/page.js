import Image from "next/image";
import {Button} from "@nextui-org/react";

export default function Feature(){

    const feature = [
        {
            image: "/assets/images/f1.png",
            bagde: "Efficiency",
            title: "Efficiency at its Best",
            description: "K-QuickSight is designed to streamline your data analysis process. Save time, reduce complexity, and achieve results faster."
        },
        {
            image: "/assets/images/f2.png",
            bagde: "Data Cleansing",
            title: "Automated Data Cleansing",
            description: "Say goodbye to tedious data cleansing tasks. Our platform automates the process, ensuring your data is clean and ready for analysis."
        },
        {
            image: "/assets/images/f3.png",
            bagde: "Data Visualization ",
            title: "Data Visualization with Interactive Dashboard",
            description: "K-QuickSight enables dynamic, user-friendly data visualization, promoting better decision-making through interactive dashboards."
        },
        {
            image: "/assets/images/f4.png",
            bagde: "Data Analysis",
            title: "Data Analysis",
            description: "Analyze data and unlock deeper insights and gain a competitive edge with our built-in machine learning libraries. Let data-driven decisions become the norm."
        },
        {
            image: "/assets/images/f5.png",
            bagde: "Data Governance",
            title: "Data Governance",
            description: "Ensure data quality and governance with our built-in tools. Keep your data compliant and trustworthy."
        },
        {
            image: "/assets/images/f6.png",
            bagde: "Efficiency",
            title: "Efficiency at its Best",
            description: "K-QuickSight is designed to streamline your data analysis process. Save time, reduce complexity, and achieve results faster."
        },
        {
            image: "/assets/images/f7.png",
            bagde: "Tutorials",
            title: "Tutorials - Learn with Ease",
            description: "Access a wealth of educational resources, including comprehensive documents and instructional videos, to master the use of our platform. Explore step-by-step guides and expert insights for a seamless experience."
        },
    ]


    return(
        <>
            <section className="bg-center bg-no-repeat bg-[url('/assets/images/4.png')] bg-cover bg-gray-400 bg-blend-multiply">
                <div className="md:px-4 mx-auto max-w-screen-xl text-center sm:h-full pt-56 pb-[250px] "
                     data-aos="fade-down"
                     data-aos-easing="linear"
                >
                    <h1 className="mb-8 text-white md:text-4xl lg:text-5xl">K-QuickSight Features</h1>
                    <p className="md:mb-8 sm:mb-0 max-sm:mb-0 text-background-color text-xl">
                        Analyze your dataset, and visualize as a perfection.
                    </p>
                </div>
            </section>

            <div className="max-w-lg  mx-auto text-center py-8 my-8 relative">
                <div className="w-32 border-2 dark:border-third-color/50 rounded-full border-blue-800/50 opacity-90 mx-auto absolute -translate-x-1/2 -translate-y-1/2 top-0 left-1/2"/>
                <h2 className={"text-primary-color mt-10 dark:text-third-color"}>
                    OUR FEATURE
                </h2>
            </div>

            <section className={"place-content-center flex flex-col gap-20 md:mb-24 max-sm:mb-10 sm:mb-10 lg:px-[10%] md:px-5 sm:px-8 max-sm:px-8"}>
                {
                    feature.map((data,index)=>(
                        <div key={index} className={`lg:flex md:flex justify-center items-center ${index %2 === 1 ? "flex-row-reverse" : ''} md:gap-10 max-sm:gap-6 sm:gap-6`}>
                            <div className="lg:w-2/3 md:1/2 w-full"  data-aos={index % 2 === 0 ? "zoom-out-right" : "zoom-in-left"}>
                                <Button size="sm" variant="flat" className={'text-primary-color dark:text-third-color dark:bg-third-color/10 bg-primary-color/10 mb-6 font-medium rounded-xl'}>
                                    {data.bagde}
                                </Button>
                                <h2 className="text-primary-color mb-3 dark:text-third-color">{data.title}</h2>
                                <p className={"sm:text-lg text-description-color md:text-xl lg:text-xls dark:text-white/80"}>{data.description}</p>
                            </div>
                            <Image src={data.image} unoptimized width={100} height={100} alt={"feature"}  data-aos={index % 2 === 0 ? "zoom-in-left" : "zoom-out-right"} className={"lg:w-1/3 md:w-1/2 w-full"} />
                        </div>
                    ))
                }
            </section>
        </>
    )
}