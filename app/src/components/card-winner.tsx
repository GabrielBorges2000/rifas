import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
} from '@/components/ui/card'

export interface CardWinnersProps {
  name: string
  description: string
  avatarUrl: string
  cota: string
}

export default function Component({
  name,
  description,
  avatarUrl,
  cota,
}: CardWinnersProps) {
  return (
    <Card>
      <CardHeader className="flex items-start">
        <div className="flex items-center space-x-10 md:space-x-4">
          <Avatar className="size-16">
            <AvatarImage className="border-2" src={avatarUrl} />
            <AvatarFallback className="border-2">JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <div className="flex items-center ml-auto relative">
              <h3 className="font-semibold absolute right-0 text-sm">
                cota: {cota}
              </h3>
            </div>
            <CardTitle className="text-sm">{name}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
