import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetTutorialsQuery } from "@/store/features/tutorial/tutorialApiSlice";
import { generateBashURL } from "@/utils/util";

const CardTutorial = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10000000);
  const router = useRouter();

  const {
    data: tutorials,
    isLoading,
    isError,
    isSuccess,
  } = useGetTutorialsQuery({ page, size, title: "" });
  const handleDetail = (id) => {
    router.push(`/tutorials/${id}`);
  };
  return (
    <div
      className={
        "flex md:justify-between max-sm:gap-0 sm:gap-0 max-sm:justify-center sm:justify-center items-center flex-wrap"
      }
    >
      {tutorials?.results.map((e, index) => (
        <div
          className="cursor-pointer md:pt-0 md:pb-10 sm:pb-5 max-sm:pb-5 md:w-[48%] lg:w-[31%] pt-5"
          key={index}
          onClick={() => router.push(`/tutorials/${e.uuid}`)}
        >
          <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl ">
            <div class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
              <Image
                width={100}
                height={100}
                className={"object-cover h-full w-full"}
                unoptimized={true}
                src={generateBashURL(e.thumbnail)}
                alt="card-image"
              />
            </div>
            <div class="p-6">
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {e.title}
              </h5>
              <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {e.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardTutorial;
