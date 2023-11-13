import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-cards";
import "../../../app/globals.css";
import { EffectCards } from "swiper/modules";
import styles from "./DeckCard.module.css";
import { data } from "./mockdata";

export default function DeckCard() {
  return (
    <Swiper
      modules={[EffectCards]}
      grabCursor={true}
      className="md:w-[600px] max-sm:w-[370px] sm:w-[450px] h-auto" 
      effect="cards"
    >
      {data.map((feedback, index) => (
        <SwiperSlide key={index} className={styles.swiperSlide}>
          <div className="p-10 justify-center flex flex-col gap-10">
            <p className="md:text-[20px] sm:text-[18px] max-sm:text-[18px] font-normal">
              {feedback.feedback}
            </p>
            <div className="flex gap-5">
              <div className="rounded-full">
                <Image
                  src={feedback.profile}
                  className="rounded-full"
                  alt="profile"
                  width={78}
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
    </Swiper>
  );
}
