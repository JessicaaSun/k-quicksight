import React from 'react';
import Image from "next/image";
import {Community_navbar} from "@/components/navbar/Navbar";
import logoImage from "@assets/logos/logo-square.png"

const Confirmation = () => {
    return (
        <main>
            <Community_navbar />
            <div className="flex w-full flex-col lg:pt-5 lg:px-36 md:pt-10 md:px-5 pt-10 px-5">
                <div className={" w-full md:gap-20 md:flex "}>
                    <div className={"flex w-full md:w-[50%] lg: flex-col"}>
                        <div className={"flex flex-row"}>
                            <Image src={logoImage} alt={"logo"} className={"xl:w-48 xl:h-48 md:w-28 md:h-28 w-28 h-28"}/>
                            <h1 className={"flex-col xl:py-20 xl:text-4xl md:py-10 md:text-3xl text-3xl py-9 text-primary-color"}>k-Quick</h1>
                            <h1 className={"flex-col xl:py-20 xl:text-4xl md:py-10 md:text-3xl text-3xl py-9 text-third-color"}>Sight</h1>
                        </div>
                        <h3 className={"text-text-color pb-4"}>Instant K-QuickSight with your data for free.</h3>
                        <p className={"text-description-color pb-6"}>Catalyze your data journey with our powerful tools for discovery, analysis, and informed decision-making.</p>
                        <div>
                            <h3 className={"text-text-color"}>
                                No credit card required
                            </h3>
                            <h4 className={"text-text-color"}>
                                Try k-quicksight today, It’s total free.
                            </h4>
                            <div className={"flex flex-row gap-5 pt-4"}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg"  width="25" height="25" viewBox="0 0 448 512" style={{ color: '#5ed733' }}>
                                        <path fill="#5ed733" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                    </svg>
                                </div>
                                <p className={"text-description-color"}>
                                    Always-free developer
                                </p>
                            </div>
                            <div className={"flex flex-row gap-5 py-4"}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg"  width="25" height="25" viewBox="0 0 448 512" >
                                        <path fill="#5ed733" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                    </svg>
                                </div>
                                <p className={"text-description-color"}>
                                    Work with file (TXT, CSV, XSLX)
                                </p>
                            </div>
                        </div>
                    </div>
                    {/*image div*/}
                    <div className={'flex w-full md:w-[50%] lg: flex-col'}>
                        <div className={"flex flex-col "}>
                            <h1 className={"text-text-color xl:pt-20 md:pt-10 xl:text-4xl md:text-3xl text-2xl"}>Accept our term of service and privacy and policy </h1>
                            <p className={"text-description-color pt-10"}>Kindly adhere to the terms and policies governing the utilization of your data, which are necessary for the establishment of an account.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Confirmation;