import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-cards";
import "../../../app/globals.css";
import { Autoplay, EffectCards, Navigation } from "swiper/modules";
import styles from "./DeckCard.module.css";
import { data } from "./mockdata";
import { useRef, useState } from "react";

export default function DeckCard() {
  // const swiperRef = useRef();
  // const [active,setActive] = useState(0)
  // const paginates = []
  // for (let i=0;i<data.length;i++){
  //   paginates.push(<li key={i} onClick={() => swiperRef.current.slideTo(i)} className={"h-2 w-2 md:h-3 md:w-3 rounded-full hover:cursor-pointer " + (active===i?"bg-green-400 dark:bg-green-500":"bg-blue-800 dark:bg-blue-600")}></li>)
  // }
  return (
    <Swiper
      // onSwiper={(swiper) => {
      //   swiperRef.current = swiper;
      // }}
      // effect={"cards"}
      // grabCursor={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      // loop={true}
      // modules={[EffectCards,Navigation,Autoplay]}
      modules={[EffectCards]}
      grabCursor={true}
      className="md:w-[600px] max-sm:w-[290px] sm:w-[400px] h-auto"
      effect="cards"
      // onSlideChange={(swiper) => {
      //   setActive(swiper.activeIndex)
      // }}
    >
      {data.map((feedback, index) => (
        <SwiperSlide key={index} className={styles.swiperSlide}>
          <div className="p-10 md:h-[260px] sm:h-auto max-sm:h-auto max-sm:p-6 sm:p-6 justify-center flex flex-col gap-10">
            <p className="md:text-[20px] sm:text-[18px] max-sm:text-[18px] font-normal">
              {feedback.feedback}
            </p>
            <div className="flex gap-5">
              <div className="rounded-full">
                <Image
                  src={feedback.profile}
                  className="rounded-full w-[78px] h-[78px] object-cover"
                  alt="profile"
                  width={78}
                  objectFit="cover"
                  height={78}
                />
              </div>
              <div className="flex justify-center flex-col gap-2">
                <p className="text-[20px] sm:text-[18px] max-sm:text-[18px] font-semibold">
                  {feedback.username}
                </p>
                <p className="text-[14px] font-normal">{feedback.occupation}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      {/*<div className="flex items-center justify-center mt-3">*/}
      {/*  <div>*/}
      {/*    <ul className={"flex gap-3"}>*/}
      {/*      {paginates}*/}
      {/*    </ul>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </Swiper>
  );
}
