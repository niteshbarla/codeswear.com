"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";

const InfiniteOneWaySwiper = () => {
  const swiperRef = useRef(null);
  const autoplayRunning = useRef(true);

  const handleMouseEnter = () => {
    if (swiperRef.current && autoplayRunning.current) {
      swiperRef.current.swiper.autoplay.stop();
      autoplayRunning.current = false;
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && !autoplayRunning.current) {
      swiperRef.current.swiper.autoplay.start();
      autoplayRunning.current = true;
    }
  };

  return (
    <div className="w-full relative">
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        speed={800}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        className="mySwiper"
        preloadImages={false}
        lazy={true}
      >
        <SwiperSlide>
          <div
            className="h-64 md:h-96 flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="w-full h-full object-cover"
              src="/banners/banner_1.png"
              alt="Banner 1"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-64 md:h-96 flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="w-full h-full object-cover"
              src="/banners/banner_1.png"
              alt="Banner 2"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-64 md:h-96 flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="w-full h-full object-cover"
              src="/banners/banner_1.png"
              alt="Banner 3"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom navigation styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #ffffff;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.5);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default InfiniteOneWaySwiper;
