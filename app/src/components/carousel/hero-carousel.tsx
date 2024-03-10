import { SwiperCarousel } from './swiper'

interface HeroCarouselProps {
  id: number
  url: string
  urlMobile: string
}

export async function HeroCarousel() {
  async function getSlides(): Promise<HeroCarouselProps[]> {
    try {
      const response = await fetch('http://localhost:3333/carousel', {
        next: {
          revalidate: 60 * 60,
          tags: ['carousel-tag'],
        },
      })

      const slides = await response.json()
      return slides
    } catch (error) {
      console.error('Erro ao buscar slides:', error)
      return []
    }
  }

  const slides = await getSlides()

  return (
    <div className="md:px-4">
      <SwiperCarousel slides={slides} />
    </div>
  )
}
