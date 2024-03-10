import CardProduct from '@/components/card-produto'
import { HeroCarousel } from '@/components/carousel/hero-carousel'
import Section from '@/components/section'
import { api } from '../utils/api'
import { Trophy, Zap } from 'lucide-react'
import theme from 'tailwindcss/colors'
import CardWinner from '@/components/card-winner'
import { Separator } from '@/components/ui/separator'

export interface CardProductProps {
  id: string | number
  title: string
  imageUrl: string
  description: string
  slug: string
  cotasNumber: number
  state: string
  price: number
}

export interface CardWinnersProps {
  id: number | string
  name: string
  description: string
  avatarUrl: string
  cota: string
}

export default async function HomeUser() {
  async function getCardProducts(): Promise<CardProductProps[]> {
    try {
      const response = await api('/sweepktakes', {
        next: {
          // revalidate: 60 * 60,
          tags: ['cards-tag'],
        },
      })

      const cards = await response.json()
      return cards
    } catch (error) {
      console.error('Erro ao buscar cards:', error)
      return []
    }
  }

  async function getWinners(): Promise<CardWinnersProps[]> {
    try {
      const response = await api('/winners', {
        next: {
          // revalidate: 60 * 60,
          tags: ['winners-tag'],
        },
      })

      const winner = await response.json()
      return winner
    } catch (error) {
      console.error('Erro ao buscar cards:', error)
      return []
    }
  }

  const cards: CardProductProps[] = await getCardProducts()
  const winners: CardWinnersProps[] = await getWinners()

  return (
    <div className="w-full p-4 md:px-10">
      <HeroCarousel />

      <Section
        title="Prêmio"
        description="Seu sonho sendo realizado"
        icon={
          <Zap fill={theme.orange[500]} strokeWidth={0} className="size-6" />
        }
      >
        {cards.map((card) => (
          <CardProduct {...card} key={card.id} />
        ))}
      </Section>

      <Separator orientation="horizontal" className="h-[2px] mt-5" />

      <Section
        title="Ganhadores"
        description="Seu sonho sendo realizado"
        icon={
          <Trophy fill={theme.yellow[500]} strokeWidth={0} className="size-6" />
        }
      >
        {winners.map((winner) => (
          <CardWinner key={winner.id} {...winner} />
        ))}
      </Section>
    </div>
  )
}
