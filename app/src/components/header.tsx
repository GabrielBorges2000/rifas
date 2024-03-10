import Link from 'next/link'
import { ToggleTheme } from './theme/toogle-theme'
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet'
import { Logo } from '@/assets/logo'
import Icon from '@/assets/Icons'

const linksRoutes = [
  { id: 1, page: 'Inicio', route: '/', icon: <Icon name="home" size={24} /> },
  {
    id: 2,
    page: 'Ganhadores',
    route: '/winners',
    icon: <Icon name="trophy" size={24} />,
  },
  {
    id: 3,
    page: 'Sorteios',
    route: '/sweepstakes',
    icon: <Icon name="badge-dollar-sign" size={24} />,
  },
  {
    id: 4,
    page: 'Meus Sorteios',
    route: '/my-sweepstakes',
    icon: <Icon name="book-marked" size={24} />,
  },
  {
    id: 5,
    page: 'Ajuda',
    route: '/help',
    icon: <Icon name="message-circle-question" size={24} />,
  },
]

export interface HeaderProps {}

export function Header() {
  return (
    <div className="h-16 w-full border-b-2 flex flex-row justify-between px-8 md:px-0 md:justify-evenly items-center shadow-sm fixed top-0 z-50 bg-white dark:bg-black bg-opacity-80 rounded-md">
      <div className="flex flex-row gap-2 items-center">
        <Logo className="size-8" />
        <h1 className="font-bold text-foreground text-lg">Rifas</h1>
      </div>

      <div className="hidden md:flex flex-row justify-between items-center gap-4">
        <nav className="flex flex-row gap-4">
          {linksRoutes.map(({ id, page, route }) => (
            <Link key={id} href={route}>
              {page}
            </Link>
          ))}
        </nav>

        {/* Buttom toggle Theme Light and Dark */}
        <ToggleTheme />
      </div>

      <Sheet>
        <SheetTrigger className="md:hidden">
          <Icon name="menu" />
        </SheetTrigger>
        <SheetContent className="p-8">
          <div className="flex flex-col justify-between items-start gap-8">
            <nav className="flex flex-col gap-6">
              {linksRoutes.map(({ id, page, route, icon }) => (
                <Link
                  key={id}
                  href={route}
                  className="flex flex-row gap-2 text-md"
                >
                  {icon} {page}
                </Link>
              ))}
            </nav>

            <ToggleTheme />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
