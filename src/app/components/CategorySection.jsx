import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Autoplay } from "swiper/modules"
import EventCard from "./EventCard"

export default function CategorySection({ category, events }) {
  if (!events.length) return null

  // Determine if this is the "Miscellaneous" category
  const isMiscellaneous = category === "Miscellaneous"

  return (
    <section className={`mb-12 ${isMiscellaneous ? "order-last" : ""}`}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Popular {category} Events</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <EventCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}