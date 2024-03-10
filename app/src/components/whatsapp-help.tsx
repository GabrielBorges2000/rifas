import { WhatsappIcon } from '@/assets/whatsapp-svg'
import Link from 'next/link'
import colors from 'tailwindcss/colors'

export interface WhatsappHelpProps {}

export default function WhatsappHelp() {
  const PHONE_NUMBER = '+5548999738340' // fazer requisição da api com o número do celular
  const message = `Olá, poderia me ajudar com o Rodada da Sorte?`

  const whatsappURL = `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`

  return (
    <div
      className="fixed z-20 bottom-6 right-6"
      title="Clique aqui para pedir ajuda viu whatsapp"
    >
      <Link
        href={whatsappURL}
        target="_blank"
        className="flex flex-row items-center justify-center gap-6 bg-card-foreground rounded-full p-4"
      >
        <WhatsappIcon className="size-5" fill={colors.emerald['600']} />
      </Link>
    </div>
  )
}
