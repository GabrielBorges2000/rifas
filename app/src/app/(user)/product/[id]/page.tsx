import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { api } from '@/app/utils/api'
import Section from '@/components/section'
import CardWinner from '@/components/card-winner'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { ScanSearch, Ticket } from 'lucide-react'

interface ProductProps {
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

async function getProduct(id: string): Promise<ProductProps> {
  const response = await api(`/sweepktakes/${id}`, {
    next: {
      tags: ['cards-tag'],
    },
  })

  console.log(response)

  const products = await response.json()
  return products
}

export async function generateStaticParams() {
  const response = await api('/sweepktakes')
  const products: ProductProps[] = await response.json()

  return products.map((product) => {
    return { id: product.id }
  })
}

export default async function Product({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  async function getWinners(): Promise<CardWinnersProps[]> {
    try {
      const response = await api('/winners', {
        next: {
          tags: ['winners-tag'],
        },
      })

      const winnerJson = await response.json()

      const winner = winnerJson.slice(0, 3)
      return winner
    } catch (error) {
      console.error('Erro ao buscar cards:', error)
      return []
    }
  }
  const winners: CardWinnersProps[] = await getWinners()

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-card rounded-lg shadow-md">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <div>
            <Carousel className="w-full">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Card className="p-0">
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <Image
                          alt="Car Interior"
                          className="rounded-lg w-full h-full object-cover"
                          width={1000}
                          height={1000}
                          quality={100}
                          src={product.imageUrl}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <div className="lg:w-1/2 lg:pl-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mt-4 lg:mt-0">{product.title}</h2>
            <p className="text-sm my-2">Faça sua fezinha</p>
            <p className="text-lg font-semibold text-green-600">
              POR APENAS{' '}
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
            <div className="mt-4">
              <div className="flex items-center">
                <Ticket className="text-gray-500" />
                <span className="ml-2 text-sm">SORTEIO LOTERIA FEDERAL</span>
              </div>
              <p className="text-sm mt-2">
                Números aleatórios, o site gera os números pra você!
              </p>
              <p className="text-sm mt-2">
                Após pagamento, verifique suas cotas na tela, ou pesquise em
                MEUS NÚMEROS. com o seu contato de telefone colocado no cadastro
                da compra.
              </p>
              <p className="text-sm mt-2">
                Não precisa enviar comprovante de pagamento, a baixa é
                automática.
              </p>
              <p className="text-sm mt-2 font-semibold">
                EM CASO DE DÚVIDAS, FALAR COM O SUPORTE NO BOTÃO DE WHATSAPP
                FLUTUANTE
              </p>
            </div>
          </div>

          <Link className="w-full" href={'/my-sweepstakes'}>
            <Button
              variant={'secondary'}
              className="mt-4 w-full flex flex-row justify-center items-center gap-2"
            >
              <ScanSearch /> Ver meus números
            </Button>
          </Link>
        </div>
      </div>
      <Section title={winners.length > 1 ? 'Ganhadores' : 'Ganhador'}>
        {winners.map((winner) => (
          <CardWinner key={winner.id} {...winner} />
        ))}
      </Section>
    </div>
  )
}
