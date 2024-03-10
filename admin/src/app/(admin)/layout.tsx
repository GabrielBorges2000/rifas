import { Header } from '@/components/header'
import { ReactNode } from 'react'

export interface Props {}

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen relative pt-16">
      <Header />
      {children}
    </div>
  )
}
