"use client"

import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "@nextui-org/react";

const Tutorial = () => {
    return (
        <section className={'py-44 px-[10%]'}>
            <h1 className={'text-bold text-primary-color pb-10'}>Tutorials</h1>
            <div className={'flex flex-col justify-center flex-wrap gap-5 items-center'}>
                <div className={'lg:flex md:flex gap-5 w-full'}>
                    <iframe className={'lg:min-h-[437px] md:min-h-[300px] min-h-fit rounded-2xl  w-full'} width="560" height="315" src="https://www.youtube.com/embed/yZvFH7B6gKI?si=OPDoCSwUfF7jrx7q" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    <iframe className={'lg:min-h-[437px] md:min-h-[300px] min-h-fit rounded-2xl lg:mt-0 md:mt-0 mt-10 w-full'} width="560" height="315" src="https://www.youtube.com/embed/CaqJ65CIoMw?si=tpm4JFOdnBTcHcGX" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className={'lg:flex md:flex gap-5 w-full'}>
                    <iframe className={'lg:min-h-[437px] md:min-h-[300px] min-h-fit rounded-2xl w-full'} width="560" height="315" src="https://www.youtube.com/embed/lgCNTuLBMK4?si=s989UmLbuJujDI17&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    <iframe className={'lg:min-h-[437px] md:min-h-[300px] min-h-fit rounded-2xl lg:mt-0 md:mt-0 mt-10 w-full'} width="560" height="315" src="https://www.youtube.com/embed/v2oNWja7M2E?si=ikX9-y8beh_qzG2-&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </div>
            <div>
                <h2 className={'text-primary-color font-bold mt-40'}>
                    Request Tutorials
                </h2>
                <Formik
                    initialValues={
                        {
                            subject: '',
                            message: ''
                        }
                    }
                    validate={(values) => {
                        const errors = {}
                        if (!values.subject) {
                            errors.subject = 'We need you subject!'
                        }
                        if (!values.message){
                            errors.message = 'Message required'
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log(`hello ${values.subject} you have send ${values.message}`);
                        setSubmitting(false);
                    }}>
                    {({ isSubmitting }) => (
                        <Form className={'py-10 flex flex-col gap-10 relative'}>
                            <div>
                                <p className={'text-lg text-text-color font-semibold'}>Subject</p>
                                <Field className={'w-full px-5 py-2 my-3 bg-gray-50 rounded-xl border-2 border-gray-400'} type={'text'} name={'subject'} placeholder={'eg. How can I share my report to other?'} />
                                <ErrorMessage
                                    className={'text-red-500'}
                                    name={"subject"}
                                    component={"div"}
                                />
                            </div>
                            <div>
                                <p className={'text-lg text-text-color font-semibold'}>Message</p>
                                <Field as={'textarea'} className={'w-full h-[200px] overflow-y-scroll resize-y px-5 py-5 my-3 bg-gray-50 rounded-xl border-2 border-gray-400'} type={'text'} name={'message'} placeholder={'Example: I recommend you explain me step by step about this subject and give me the sample with the real data..  '} />
                                <ErrorMessage
                                    className={'text-red-500'}
                                    name={"message"}
                                    component={"div"}
                                />
                            </div>
                            <Button type={"submit"} disabled={isSubmitting} className={'font-bold text-white bg-primary-color absolute right-0 -bottom-5 rounded-xl w-fit py-2 px-12'}>Send</Button>
                        </Form>
                    )}
                </Formik>

            </div>
        </section>
    );
};

export default Tutorial;