import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rodada da sorte',
  description:
    'Participe da emoção da sorte na Rodada da Sorte! Nosso site oferece uma plataforma segura e divertida para você entrar em diversos sorteios de rifas emocionantes. Explore uma variedade de prêmios incríveis e aumente suas chances de ganhar ao participar de várias rodadas. Com uma interface intuitiva e transparente, a Rodada da Sorte torna simples e emocionante a experiência de concorrer a prêmios incríveis. Junte-se à comunidade de sortudos hoje mesmo e descubra o seu próximo grande prêmio na Rodada da Sorte!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          storageKey="rifas-theme"
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
