import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScanSearch } from 'lucide-react'

export interface MySweepstakesProps {}

export default function MySweepstakes() {
  return (
    <div className="max-w-md mx-auto my-10 p-6 rounded-lg shadow-md backdrop-filter backdrop-blur-lg bg-opacity-20">
      <div className="flex justify-center items-center mb-4">
        <ScanSearch className="text-blue-500 w-6 h-6" />
        <h2 className="text-lg font-semibold text-foreground ml-2">
          Buscar Pedidos
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Informe seu e-mail ou telefone para consultar informações sobre os seus
        pedidos.
      </p>
      <div className="flex gap-4 mb-4">
        <Button variant={'outline'} className="flex-1">
          Email
        </Button>
        <Button variant={'outline'} className="flex-1">
          Telefone
        </Button>
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-muted-foreground mb-2"
          htmlFor="email"
        >
          Digite seu E-Mail
        </label>
        <Input
          className="border-gray-300 focus:ring-ring focus:border-card"
          id="email"
          placeholder="exemplo@email.com"
          type="email"
        />
      </div>
      <Button variant={'secondary'} className="w-full ">
        Buscar
      </Button>
    </div>
  )
}
