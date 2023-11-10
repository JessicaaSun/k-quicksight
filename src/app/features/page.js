import Image from "next/image";
import {Button} from "@nextui-org/react";

export default function feature(){

    return(
        <>
            <section className="bg-center bg-no-repeat bg-[url('/assets/images/feature-bg.jpg')] bg-cover bg-gray-400 bg-blend-darken">
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56"
                     data-aos="fade-down"
                     data-aos-easing="linear"
                >
                    <h1 className="mb-4 text-3xl tracking-tight text-white md:text-4xl lg:text-5xl">K-QuickSight Features</h1>
                    <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                        Analyze your dataset, and visualize as a perfection.
                    </p>
                </div>
            </section>

            <div className="max-w-lg mx-auto text-center py-8 my-8 relative">
                <div className="w-32 border-2 border-blue-800/50 opacity-90 mx-auto absolute -translate-x-1/2 -translate-y-1/2 top-0 left-1/2"></div>
                <h1 className={"text-primary-color"}>
                    OUR FEATURE
                </h1>
            </div>

            <section className={"grid grid-cols-1 place-content-center mx-36"}>

                <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 ">
                    <div className="self-center" data-aos="zoom-out-right">
                        <Button size="sm" variant="flat" className={'text-primary-color mb-6 rounded-2xl'}>
                            Data Cleansing
                        </Button>
                        <h2 className="text-primary-color mb-3">Automated Data Cleansing</h2>
                        <p className={"sm:text-lg md:text-xl lg:text-xls"}>Say goodbye to tedious data cleansing tasks. Our platform automates the process, ensuring your data is clean and ready for analysis.</p>
                    </div>
                        <Image src={"/assets/images/f1.png"} unoptimized width={100} height={100} alt={"feature"} className={"w-3/4"} />
                </div>

                <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 ">
                        <Image src={"/assets/images/f2.png"} unoptimized width={100} height={100} alt={"feature"} className={"w-3/4"} />
                    <div className="self-center" data-aos="zoom-out-right">
                        <Button size="sm" variant="flat" className={'text-primary-color mb-6 rounded-2xl'}>
                            Data Cleansing
                        </Button>
                        <h2 className="text-primary-color mb-3">Automated Data Cleansing</h2>
                        <p className={"sm:text-lg md:text-xl lg:text-xls"}>Say goodbye to tedious data cleansing tasks. Our platform automates the process, ensuring your data is clean and ready for analysis.</p>
                    </div>
                </div>

                <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-10 ">
                    <div className="self-center" data-aos="zoom-out-right">
                        <Button size="sm" variant="flat" className={'text-primary-color mb-6 rounded-2xl'}>
                            Data Visualization
                        </Button>
                        <h2 className="text-primary-color mb-3">Data Visualization </h2>
                        <p className={"sm:text-lg md:text-xl lg:text-xls"}>K-QuickSight enables dynamic, user-friendly data visualization, promoting better decision-making through interactive dashboards.</p>
                    </div>
                        <Image src={"/assets/images/f3.png"} unoptimized width={100} height={100} alt={"feature"} className={"w-3/4"} />
                </div>
            </section>
        </>
    )
}