import React from 'react';
import Image from "next/image";
import {Input,Button} from "@nextui-org/react";
import contactus from "@assets/images/contact-us/contact_us.png"
import FormContactUs from "@/components/contact-us/FormContactUs";

const Page = () => {

    return (
        <main className="flex lg:min-h-screen w-full flex-col lg:px-52 md:px-40 items-center justify-center lg:max-h-screen">

            <div className={" w-full gap-20 items-center flex"}>
                <div className={"flex w-[40%] flex-col"}>
                    <h1 className={"text-primary-color pb-4"}>Contact Us</h1>
                    <p className={"text-descriptive-color pb-6"}>Got any issue?  Want to send feedback about the beta feature? need detail about our business plan? Let us know.</p>
                    <FormContactUs/>
                    <Button  className="bg-primary-color text-white h-[46px] font-semibold w-40">
                        Send Message
                    </Button>
                </div>

                {/*image div*/}
                <div className={'w-1/2 flex items-center'}>
                    <Image src={contactus} alt={"authentication"} className={'w-full'}/>
                </div>
            </div>
        </main>

    );
};

export default Page;