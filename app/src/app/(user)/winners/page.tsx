import Section from '@/components/section'
import { Trophy } from 'lucide-react'
import theme from 'tailwindcss/colors'
import CardWinner from '@/components/card-winner'
import { api } from '@/app/utils/api'

export interface CardWinnersProps {
  id: number | string
  name: string
  description: string
  avatarUrl: string
  cota: string
}

export default async function HomeUser() {
  async function getWinners(): Promise<CardWinnersProps[]> {
    try {
      const response = await api('/winners', {
        next: {
          revalidate: 60 * 60,
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
  const winners: CardWinnersProps[] = await getWinners()

  return (
    <div className="w-full p-4 md:px-10">
      <Section
        title="Últimos Ganhadores"
        icon={
          <Trophy fill={theme.yellow[500]} strokeWidth={0} className="size-6" />
        }
      >
        {winners.map((winner) => (
          <CardWinner key={winner.id} {...winner} />
        ))}
        {winners.map((winner) => (
          <CardWinner key={winner.id} {...winner} />
        ))}
        {winners.map((winner) => (
          <CardWinner key={winner.id} {...winner} />
        ))}
        {winners.map((winner) => (
          <CardWinner key={winner.id} {...winner} />
        ))}
      </Section>
    </div>
  )
}
