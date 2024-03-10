'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import 'swiper/css/bundle'
import { useWindowWidth } from '@/app/utils/is-mobile'

interface SwiperCarouselProps {
  id: number
  url: string
  urlMobile: string
}

export function SwiperCarousel({ slides }: { slides: SwiperCarouselProps[] }) {
  const { isMobile } = useWindowWidth()

  return (
    <div className="">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="rounded-sm shadow"
        loop={true}
      >
        {slides.map((slide: SwiperCarouselProps) => (
          <SwiperSlide key={slide.id}>
            {
              <Image
                src={!isMobile ? slide.url : slide.urlMobile}
                quality={100}
                width={1920}
                height={1080}
                alt="slider"
                priority
                className="w-full h-full object-cover"
              />
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
