import { api } from '@/app/utils/api'
import CardProduct from '@/components/card-produto'
import Section from '@/components/section'
import { Zap } from 'lucide-react'
import theme from 'tailwindcss/colors'
export interface CardProductProps {
  id: string
  titulo: string
  imagem: string
  descricao: string
  slug: string
  numerodeCotas: number
  status: string
}

export default async function Sweepstakes() {
  async function getCardProducts(): Promise<CardProductProps[]> {
    try {
      const response = await api('/api/rifas')

      const cards = await response.json()
      return cards
    } catch (error) {
      console.error('Erro ao buscar cards:', error)
      return []
    }
  }
  const cards: CardProductProps[] = await getCardProducts()

  console.log(cards)

  return (
    <div className="w-full p-4 md:px-10">
      <Section
        title="Prêmio"
        description="Seu sonho sendo realizado"
        icon={
          <Zap fill={theme.orange[500]} strokeWidth={0} className="size-6" />
        }
      >
        {cards.map((card) => (
          <CardProduct key={card.id} {...card} />
        ))}
      </Section>
    </div>
  )
}
