"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import EventCard from "./EventCard";

export default function FeaturedEventCarousel({ events }) {
  return (
    <div className="w-full py-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <EventCard event={event} className="h-100 flex-col" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
