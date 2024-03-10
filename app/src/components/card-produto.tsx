import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CardContent, Card } from '@/components/ui/card'
import Link from 'next/link'

export interface CardProductProps {
  id?: string | number
  title?: string
  imageUrl: string
  description?: string
  slug: string
  cotasNumber?: number
  state?: string
  price?: number
}

export default function CardProduct({
  id,
  imageUrl,
  title,
  description,
}: CardProductProps) {
  return (
    <Link href={`/product/${id}`}>
      <Card className="w-full md:w-44 rounded-lg overflow-hidden shadow-lg">
        <div className="relative">
          <Image
            alt="Caminhão produtos impo..."
            className="w-full h-[100px] object-cover"
            height={203}
            src={imageUrl}
            style={{
              aspectRatio: '456/203',
              objectFit: 'cover',
            }}
            quality={100}
            width={456}
          />
          <Button className="absolute top-2 right-2 bg-[#B7EF3F] text-black">
            Adquira já!
          </Button>
        </div>
        <CardContent className="p-4 bg-card">
          <h3 className="text-lg text-foreground font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
